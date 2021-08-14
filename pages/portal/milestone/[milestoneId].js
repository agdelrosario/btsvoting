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
  // { field: 'role', headerName: 'Role', width: 200 },
];

export default function Milestone({session, profile, host, apps, admin}) {
  const [milestones, setMilestones] = useState(null);
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const fetchMilestones = async () => {
    const milestonesRes = await fetch(`/api/milestones/single?id=${router.query.milestoneId}`);
    const milestonesJson = await milestonesRes.json();

    if (milestonesJson) {
      // console.log('milestones', milestonesJson)
      setMilestones(milestonesJson)
    } else {
      setMilestones(null)
    }
  }

  const fetchAchievers = async () => {

  }

  useEffect(() => {
    console.log("admin", admin, !admin.email)
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

  const collateAchievers = async () => {
    // const achieversRes = await fetch(`/api/achievers/collate`,
    // {
    //   body: JSON.stringify({
    //     id: router.query.milestoneId
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST'
    // });
    // const achieversJson = await achieversRes.json();

    // console.log("achieversJson", achieversJson)
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
        !loading && !!admin.email && (
          <Grid  container style={{marginBottom: 20}}>
            <Grid
              container
              item
              className="users"
              direction="column"
            >
              <Grid item container>
                <Grid item xs><h1>{milestones.name}</h1></Grid>
                <Grid item xs align="right"><Button color="secondary" variant="contained" onClick={collateAchievers}>Collate Achievers</Button></Grid>
              </Grid>
              
              <Grid item style={{minHeight: 400}}>
                {/* <DataGrid rows={milestones} columns={columns} pageSize={10} disableColumnSelector /> */}
              </Grid>
            </Grid>
          </Grid>
        )
      }
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
