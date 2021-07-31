import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import PortalLayout from '../../../components/PortalLayout';
import Loading from '../../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'team', headerName: 'Team', width: 200 },
  { field: 'provider', headerName: 'Provider', width: 200 },
  { field: 'role', headerName: 'Role', width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableClickEventBubbling: true,
    width: 200,
    renderCell: (params) => {
      const onClick = () => {
        // const api: GridApi = params.api;
        // const fields = api
        //   .getAllColumns()
        //   .map((c) => c.field)
        //   .filter((c) => c !== "__check__" && !!c);
        // const thisRow = {};

        // fields.forEach((f) => {
        //   thisRow[f] = params.getValue(f);
        // });

        // return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    }
  }
  // {
  //   field: 'categories',
  //   headerName: 'Categories',
  //   // description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 120,
      
  // },
];

export default function Users({session, profile, host, apps, admin}) {
  const [profiles, setProfiles] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const profilesRes = await fetch(`/api/profiles`);
      const profiles = await profilesRes.json();

      if (profiles) {
        console.log('profiles', profiles)
        setProfiles(profiles.map((profile, index) => {
          return {
            id: index + 1,
            username: profile.username,
            provider: profile.provider,
            team: profile.teamInfo.name,
            role: profile.role,
            actions: ['allowAdmin']
          }
        }))
      }
    }

    fetchUsers().then(() => {
      setLoading(false)
    })

  }, []);

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
        <Grid 
          container
          className="users"
        >
          <DataGrid rows={profiles} columns={columns} pageSize={5} disableColumnSelector />
        </Grid>
      )}
    </PortalLayout>
  );
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const profileRes = await fetch(`${process.env.HOST}/api/profiles/single?email=${session.user.email}`);
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
