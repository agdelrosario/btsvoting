import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import moment from "moment";

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'username', headerName: 'Username', width: 300 },
  { field: 'team', headerName: 'Team', width: 200 },
  { field: 'collected', headerName: 'This month', width: 200 },
  { field: 'tickets', headerName: 'Previous month', width: 200 },
  { field: 'totalChoeaedolTickets', headerName: 'Total', width: 200 },
];

const teamsColumns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'collected', headerName: 'This month', width: 200 },
];

export default function Users({session, profile, host, apps, admin}) {
  const [profiles, setProfiles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true)
  const [teamsLoading, setTeamsLoading] = useState(true)

  const fetchUsers = async () => {
    const profilesRes = await fetch(`/api/statistics/monthly-individual`);
    const profilesJson = await profilesRes.json();

    if (profilesJson) {
      setProfiles(profilesJson.map((profile, index) => {
        return {
          id: index + 1,
          username: profile.profile.username,
          provider: profile.profile.provider,
          team: profile.teamInfo.name,
          tickets: profile.tickets,
          collected: profile.collected,
          totalChoeaedolTickets: profile.totalChoeaedolTickets,
        }
      }))
    } else {
      setProfiles([])
    }
  }

  const fetchTeams = async () => {
    const profilesRes = await fetch(`/api/statistics/monthly-team`);
    const profilesJson = await profilesRes.json();

    if (profilesJson) {
      setTeams(profilesJson.map((profile, index) => {
        return {
          id: index + 1,
          name: profile.name,
          collected: profile.collected,
        }
      }))
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

  const uploadData = async () => {
    const res = await fetch(`/api/upload`,
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
                <Grid item xs align="right">August 2021</Grid>
              </Grid>
              
              <Grid item
              style={{minHeight: 600}}><DataGrid rows={profiles} columns={columns} pageSize={10} disableColumnSelector /></Grid>
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
                {/* <Grid item xs align="right">August 2021</Grid> */}
              </Grid>
              
              <Grid item
              style={{minHeight: 600}}><DataGrid rows={teams} columns={teamsColumns} pageSize={10} disableColumnSelector /></Grid>
            </Grid>
          </Grid>
        )
      }
      {/* <div onClick={uploadData}>Click here to upload data</div> */}
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
