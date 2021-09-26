import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import moment from "moment";

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 50 },
  { field: 'username', headerName: 'Username', width: 250 },
  { field: 'team', headerName: 'Team', width: 200 },
  { field: 'collected', headerName: 'This month', width: 200 },
  { field: 'prevMonthTickets', headerName: 'Previous month', width: 200 },
  { field: 'currentMonthTickets', headerName: 'Total', width: 200 },
];

const columnsTop20 = [
  { field: 'id', headerName: 'ID', type: 'number', width: 50 },
  { field: 'username', headerName: 'Username', width: 250 },
  { field: 'team', headerName: 'Team', width: 200 },
];

const teamsColumns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 50 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'collected', headerName: 'This month', width: 200 },
];

const teamsColumnsTop5 = [
  { field: 'id', headerName: 'ID', type: 'number', width: 50 },
  { field: 'name', headerName: 'Name', width: 200 },
];

export default function Users({session, profile, host, apps, admin}) {
  const [profiles, setProfiles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true)
  const [teamsLoading, setTeamsLoading] = useState(true)
  const [mode, setMode] = useState("table")
  const [profilesTop20, setProfilesTop20] = useState([])
  const [teamsTop5, setTeamsTop5] = useState([])

  const fetchUsers = async () => {
    const profilesRes = await fetch(`/api/statistics/monthly-individual?month=${9}`);
    const profilesJson = await profilesRes.json();

    if (profilesJson) {
      const profilesMap = profilesJson.map((profile, index) => {
        return {
          id: index + 1,
          username: profile.profile.username,
          provider: profile.profile.provider,
          team: profile.teamInfo.name,
          prevMonthTickets: profile.prevMonthTickets,
          collected: profile.collected,
          currentMonthTickets: profile.currentMonthTickets,
        }
      })

      setProfiles(profilesMap)

      setProfilesTop20(profilesMap.slice(0, 20))
    } else {
      setProfiles([])
    }
  }

  const fetchTeams = async () => {
    const profilesRes = await fetch(`/api/statistics/monthly-team`);
    const teamsJson = await profilesRes.json();

    if (teamsJson) {
      const teamsMap = teamsJson.map((profile, index) => {
        return {
          id: index + 1,
          name: profile.name,
          collected: profile.collected,
        }
      })
      setTeams(teamsMap)

      setTeamsTop5(teamsMap.slice(0,5))
    } else {
      setTeams([])
    }
  }

  useEffect(() => {
    if (!admin.email) {
      router.push('/portal')
    }

    fetchUsers().then(() => {
      setLoading(false)
    })

    fetchTeams().then(() => {
      setTeamsLoading(false)
    })

  }, []);

  const backupData = async () => {
    const res = await fetch(`/api/upload/backup-member-statistics-monthly?month=9&&year=2021`,
    {
      body: JSON.stringify({
        text: "something"
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const resJson = await res.json()
    console.log("september data", resJson)
  }

  const activatePresentationMode = async () => {
    setMode("presentation")
  }

  const deactivatePresentationMode = async () => {
    setMode("table")
  }




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
      mode == "presentation" && (
        <Grid container>
          <Grid item xs={12} align="right">
            <Button color="secondary" variant="contained" onClick={deactivatePresentationMode}>Deactivate Presentation Mode</Button>
          </Grid>
          
          <Grid item xs={3}>
            <h1 style={{"marginBottom": "5px"}}>SEPTEMBER 2021</h1>
          </Grid>
          <Grid item xs={4} style={{"display": "flex", "alignItems": "flex-end", "justifyContent": "flex-end", "padding": "0 10px 5px 0"}}>
            Results as of October 1, 2021
          </Grid>
          <Grid item xs={5}>

          </Grid>

          <Grid container spacing={3}>
          {
            teamsLoading && (
              <Loading />
            )
          }

          {
            !teamsLoading && !!admin.email && (
              <Grid  container item xs={3}  style={{marginBottom: 20}}>
                <Grid
                  container
                  item
                  className="users"
                  direction="column"
                >
                  <Grid item container>
                    <Grid item xs><h3>Top Performing Teams</h3></Grid>
                    {/* <Grid item xs align="right">September 2021</Grid> */}
                  </Grid>
                  
                  <Grid item style={{minHeight: 170}}>
                    <DataGrid
                      rows={teamsTop5}
                      columns={teamsColumnsTop5}
                      pageSize={5}
                      hideFooter
                      disableColumnSelector
                      rowHeight={25}
                      headerHeight={30}
                    />
                  </Grid>


                  <Grid item style={{marginTop: 20, fontSize: '13px'}}>
                    Congratulations! <br /><br />

                    Results are from September 2021 collection of Choeaedol Ever Hearts. Keep collecting and update your collections in the website regularly.
                  </Grid>
                </Grid>
              </Grid>
            )
          }
          {
            loading && (
              <Loading />
            )
          }
          {
            !loading && !!admin.email && (
              <Grid  container item xs={4} style={{marginBottom: 20}}>
                <Grid
                  container
                  item
                  className="users"
                  direction="column"
                >
                  <Grid item container>
                    <Grid item xs><h3>Top 20 EH Collectors</h3></Grid>
                  </Grid>
                  
                  <Grid item style={{minHeight: 550}}>
                    <DataGrid rows={profilesTop20} columns={columnsTop20} pageSize={20} hideFooter disableColumnSelector rowHeight={25} headerHeight={30} />
                  </Grid>
                </Grid>
              </Grid>
            )
          }
          </Grid>
        </Grid>
      )
    }
      {
        mode == "table" && (
          <Grid container>
                    
            <Grid container item xs justify="flex-end" style={{"marginBottom": "20px"}} spacing={2}>
              <Grid item><Button color="secondary" variant="contained" onClick={activatePresentationMode}>Activate Presentation Mode</Button></Grid>
              <Grid item><Button color="secondary" variant="contained" onClick={backupData}>Backup September Data</Button></Grid>
            </Grid>
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
                      <Grid item xs><h1>Monthly Stats</h1></Grid>
                      <Grid item xs align="right">
                        <span>September 2021</span>

                      </Grid>
                    </Grid>
                    
                    <Grid item style={{minHeight: 480}}>
                      <DataGrid rows={profiles} columns={columns} pageSize={10} disableColumnSelector rowHeight={35} />
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
            {
              teamsLoading && (
                <Loading />
              )
            }
            {
              !teamsLoading && !!admin.email && (
                <Grid  container style={{marginBottom: 20}}>
                  <Grid
                    container
                    item
                    className="users"
                    direction="column"
                  >
                    <Grid item container>
                      <Grid item xs><h1>Team Stats</h1></Grid>
                      {/* <Grid item xs align="right">September 2021</Grid> */}
                    </Grid>
                    
                    <Grid item style={{minHeight: 400}}>
                      <DataGrid rows={teams} columns={teamsColumns} pageSize={10} disableColumnSelector rowHeight={35} />
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        )
      }
      
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
