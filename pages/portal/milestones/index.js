import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import AddMilestone from '../../../components/AddMilestone';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'appId', headerName: 'App', width: 200 },
  { field: 'thresholdValue', headerName: 'Value', width: 200 },
  { field: 'active', headerName: 'Active', width: 200 },
];

export default function Milestones({session, profile, host, apps, admin}) {
  const [milestones, setMilestones] = useState([]);
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [requestColumns, setRequestColumns] = useState([
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'provider', headerName: 'Provider', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 }
  ])
  const router = useRouter();

  const fetchMilestones = async () => {
    const milestonesRes = await fetch(`/api/milestones`);
    const milestonesJson = await milestonesRes.json();

    if (milestonesJson) {
      // console.log('milestones', milestonesJson)
      setMilestones(milestonesJson.map((milestone, index) => {
        return {
          _id: milestone._id,
          id: index + 1,
          congratulatoryText: milestone.congratulatoryText,
          appId: milestone.appId,
          thresholdValue: milestone.thresholdValue,
          name: milestone.name,
          active: milestone.active,
        }
      }))
    } else {
      setMilestones([])
    }
  }

  const fetchRequests = async () => {
    const requestsRes = await fetch(`/api/milestones/requests`);
    const requestsJson = await requestsRes.json();

    if (requestsJson && requestsJson.length > 0) {
      // console.log('requests', requestsJson)
      setRequests(requestsJson.map((profile, index) => {
        return {
          id: index + 1,
          username: profile.username,
          provider: profile.provider,
          role: profile.role,
          actions: ['accept', 'decline']
        }
      }))

      setRequestColumns([
          { field: 'id', headerName: 'ID', width: 40 },
          { field: 'username', headerName: 'Username', width: 200 },
          { field: 'provider', headerName: 'Provider', width: 200 },
          { field: 'role', headerName: 'Role', width: 200 },
        ])
    } else {
      setRequests([])
      setRequestColumns([
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'provider', headerName: 'Provider', width: 200 },
        { field: 'role', headerName: 'Role', width: 200 }
      ])
    }
  }

  useEffect(() => {
    if (!admin.email) {
      router.push('/portal')
    }

    fetchMilestones().then(() => {
      setLoading(false)
    })

    // fetchRequests().then(() => {
    //   setRequestsLoading(false) 
    // })

  }, []);

  const addMilestone = async ({
    name,
    congratulatoryText,
    thresholdValue,
    appId,
    active,
  }) => {
    // if (edit) {
    //   const res = await fetch(`/api/apps/edit?email=${email}`,
    //   {
    //     body: JSON.stringify({
    //       name,
    //       categoryType,
    //       slug,
    //       key,
    //       tickets,
    //       ticketType,
    //       allowCollection,
    //       levels,
    //       _id: apps[editAppData]._id,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST'
    //   });
  
      
    //   const json = await res.json();
  
    //   if (json) {
    //     // fetch apps again
  
    //     const appsRes = await fetch(`/api/apps`);
    //     const appsJson = await appsRes.json();
    //     setAppsContainer(appsJson)
    //     setAppsData(appsJson.map((app, index) => {
    //       return {
    //         id: index + 1,
    //         name: app.name,
    //         tickets: app.tickets,
    //       }
    //     }))
    //   }
    // } else {
    //   // Add
    const res = await fetch(`/api/milestones/new`,
    {
      body: JSON.stringify({
        name,
        congratulatoryText,
        thresholdValue,
        appId,
        active,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    
    const json = await res.json();

    if (json) {
      fetchMilestones()
    }
    // }
  }

  const closeAppModal = () => {
    // setEditAppData(null)
    setAddAppModalOpen(false)
  }

  const openAddMilestone = () => {
    setAddAppModalOpen(true)
  }

  const openMilestonePage = (milestone) => {
    console.log("openMilestonePage", milestone.row)
    router.push(`/portal/milestone/${milestone.row._id}`)
  }


  // console.log("requests", requests)
  // console.log("requestColumns", requestColumns)

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }

  return (
    <PortalLayout profile={profile} session={session} admin={!!admin.email}>
      {
        loading && (
          <Loading />
        )
      }
      {
        !loading && (
          <Grid  container style={{marginBottom: 20}}>
            <Grid
              container
              item
              className="users"
              direction="column"
            >
              <Grid item container>
                <Grid item xs><h1>Milestones</h1></Grid>
                <Grid item xs align="right"><Button color="secondary" variant="contained" onClick={openAddMilestone}>Add Milestone</Button></Grid>
              </Grid>
              
              <Grid item
              style={{minHeight: 400}}>
                <DataGrid rows={milestones} columns={columns} pageSize={10} disableColumnSelector onRowClick={openMilestonePage} />
              </Grid>
            </Grid>
          </Grid>
        )
      }
      {/* {
        requestsLoading && (
          <Loading />
        )
      } */}
      {/* {
        !requestsLoading && (
          <Grid  container spacing={4}>
            <Grid
              container
              item
              className="users"
              style={{minHeight: 400}}
              direction="column"
            >
              <Grid item><h1>Requests</h1></Grid>
              <Grid item
              style={{minHeight: 400}}><DataGrid rows={requests} columns={requestColumns} pageSize={10} disableColumnSelector /></Grid>
            </Grid>
          </Grid>
        )
      } */}
      {/* <div onClick={uploadData}>Click here to upload data</div> */}

{/* App  loadedData={editAppData !== null && editAppData !== undefined ? appsContainer[editAppData] : null} */}
      <AddMilestone open={addAppModalOpen} submit={addMilestone} closeModal={closeAppModal} apps={apps} />
    </PortalLayout>
  );
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const profileRes = await fetch(`${process.env.HOST}/api/profiles/single?userId=${session.id}`);
  const profile = await profileRes.json();

  const appsRes = await fetch(`${process.env.HOST}/api/apps`);
  const apps = await appsRes.json();

  const adminRes = await fetch(`${process.env.HOST}/api/admin?email=${session.user.email}`);
  const admin = await adminRes.json();


  return {
    props: {
      session,
      profile,
      host: process.env.HOST,
      apps,
      admin,
    }
  }
}
