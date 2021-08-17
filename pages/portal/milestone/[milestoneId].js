import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import AddMilestone from '../../../components/AddMilestone';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'team', headerName: 'Team', width: 200 },
  { field: 'value', headerName: 'Value', width: 200 },
  // { field: 'appId', headerName: 'App', width: 200 },
  // { field: 'thresholdValue', headerName: 'Value', width: 200 },
  // { field: 'role', headerName: 'Role', width: 200 },
];

export default function Milestone({session, profile, host, apps, admin}) {
  const [milestones, setMilestones] = useState(null);
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [achievers, setAchievers] = useState([]);
  const [newAchievers, setNewAchievers] = useState([]);
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

  const fetchAllAchievers = async () => {
    const achieversRes = await fetch(`/api/achievers?app=${milestones.appId}&milestoneId=${router.query.milestoneId}&value=${milestones.thresholdValue}`);
    const achieversJson = await achieversRes.json();

    if (achieversJson) {

      console.log("fetchAllAchievers", achieversJson)
      setAchievers(achieversJson.map((achiever, index) => {
        const userProfile = achiever.userProfile.find((profile) => {
          return !!profile.team
        })

        return {
          id: achiever.orderNo,
          // id: index + 1,
          username: userProfile.username,
          team: userProfile.team,
          value: achiever.value,
        }
      }))

    }
  }

  const fetchNewAchievers = async () => {
    // console.log("milestones", milestones)
    const achieversRes = await fetch(`/api/achievers/collate?app=${milestones.appId}&value=${milestones.thresholdValue}`);
    const achieversJson = await achieversRes.json();

    if (achieversJson) {

      // console.log("achieversJson", achieversJson)
      setNewAchievers(achieversJson.achievers.map((achiever, index) => {
        const userProfile = achiever.userProfile.find((profile) => {
          return !!profile.team
        })

        return {
          id: index + 1,
          username: userProfile.username,
          team: userProfile.team,
          value: achiever.value,
        }
      }))

    }

    setLoading(false)
    /*
,
      {
        body: JSON.stringify({
          id: router.query.milestoneId
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    */
  }

  // const fetchNewAchievers = async () => {

  // }

  useEffect(() => {
    if (!admin.email) {
      router.push('/portal')
    }

    fetchMilestones().then(() => {
    })


    // fetchRequests().then(() => {
    //   setRequestsLoading(false) 
    // })

  }, []);

  useEffect(() => {
    // console.log("milestones", milestones)

    if (milestones && milestones.appId) {
      fetchAllAchievers()
      fetchNewAchievers()
    }
  }, [milestones])

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

  const goBackToHome = () => {

    router.push('/portal/milestones')
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
            
            <Grid container style={{marginBottom: 20}}>
              <Grid item>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                  <Link color="inherit" href="#" onClick={goBackToHome}>
                    Milestones
                  </Link>
                  <Typography color="textPrimary">{milestones.name}</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid container spacing={3}>

              <Grid
                container
                item
                className="users"
                direction="column"
                xs={6}
              >
                <Grid item container>
                  <Grid item xs><h1>New Millionaires</h1></Grid>
                  {/* <Grid item xs align="right"><Button color="secondary" variant="contained" onClick={collateAchievers}>Collate Achievers</Button></Grid> */}
                </Grid>
                
                <Grid item style={{minHeight: 400}}>
                  <DataGrid rows={newAchievers} columns={columns} pageSize={10} disableColumnSelector />
                </Grid>
              </Grid>
              <Grid
                container
                item
                className="users"
                direction="column"
                xs={6}
              >
                <Grid item container>
                  <Grid item xs><h1>{milestones.name}</h1></Grid>
                  {/* <Grid item xs align="right"><Button color="secondary" variant="contained" onClick={collateAchievers}>Collate Achievers</Button></Grid> */}
                </Grid>
                
                <Grid item style={{minHeight: 400}}>
                  <DataGrid rows={achievers} columns={columns} pageSize={10} disableColumnSelector />
                </Grid>
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
