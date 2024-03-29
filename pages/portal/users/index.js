import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';


export default function Users({session, profile, host, apps, admin}) {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [requestColumns, setRequestColumns] = useState([
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'provider', headerName: 'Provider', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 }
  ])
  const [columns] = useState([
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'username', headerName: 'Username', width: 300 },
    { field: 'team', headerName: 'Team', width: 200 },
    { field: 'provider', headerName: 'Provider', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      disableClickEventBubbling: true,
      width: 400,
      renderCell: (params) => {
        const onClick = async () => {
          router.push(`/portal/user/${params.row.userId}`)
        };
  
        return (
          <Grid container spacing={1}>
            <Grid item><Button color="secondary" variant="contained" onClick={onClick}>View User Profile</Button></Grid>
          </Grid>
        )
      }
    }
  ]);

  const fetchUsers = async () => {
    const profilesRes = await fetch(`/api/profiles`);
    const profilesJson = await profilesRes.json();

    if (profilesJson) {
      setProfiles(profilesJson.map((profile, index) => {
        return {
          id: index + 1,
          username: profile.username,
          provider: profile.provider,
          team: profile.teamInfo.name,
          role: profile.role,
          userId: profile.userId,
          // actions: ['allowAdmin']
        }
      }))
    } else {
      setProfiles([])
    }
  }

  const fetchRequests = async () => {
    const requestsRes = await fetch(`/api/profiles/requests`);
    const requestsJson = await requestsRes.json();

    if (requestsJson && requestsJson.length > 0) {
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
          { field: 'id', headerName: 'ID', width: 50 },
          { field: 'username', headerName: 'Username', width: 200 },
          { field: 'provider', headerName: 'Provider', width: 200 },
          { field: 'role', headerName: 'Role', width: 200 },
          {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            disableClickEventBubbling: true,
            width: 400,
            renderCell: (params) => {
              return (
                <Grid container spacing={1}>
                  {
                    params.value.map((param) => {
                      if (param == "accept") {
                        const onClick = async () => {
                          const res = await fetch(`/api/whitelist/accept`,
                          {
                            body: JSON.stringify({
                              username: params.row.username,
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            method: 'POST'
                          });
      
                          const resJson = await res.json()
      
                          if (resJson) {
                            fetchRequests()
                            // fetchUsers()
                          }
                        };
                  
                        return <Grid item key={`accept-${params.row.userId}`}><Button color="secondary" variant="contained" onClick={onClick}>Accept Member</Button></Grid>;
                        
                      } else if (param == "decline") {
                        const onClick = async () => {
                          const res = await fetch(`/api/whitelist/decline`,
                          {
                            body: JSON.stringify({
                              username: params.row.username,
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            method: 'POST'
                          });
      
                          const resJson = await res.json()
      
                          if (resJson) {
                            fetchRequests()
                          }
                        };
                  
                        return <Grid item key={`decline-${params.row.userId}`}><Button color="secondary" variant="contained" onClick={onClick}>Decline Member</Button></Grid>;
                        
                      } else {
                        return <Button>Click</Button>;
                      }
                    })
                  }
                </Grid>
              )
            }
          }
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

    fetchUsers().then(() => {
      setLoading(false)
    })

    fetchRequests().then(() => {
      setRequestsLoading(false) 
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
              <Grid item><h1>Existing Users</h1></Grid>
              
              <Grid item
              style={{minHeight: 600}}><DataGrid rows={profiles} columns={columns} pageSize={10} disableColumnSelector /></Grid>
            </Grid>
          </Grid>
        )
      }
      {
        requestsLoading && (
          <Loading />
        )
      }
      {
        !requestsLoading && !!admin.email && (
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
