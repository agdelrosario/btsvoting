
import { useState, useEffect } from "react";
import StatisticsCard from './StatisticsCard';
import MultiStatisticsCard from './MultiStatisticsCard';
import AddApp from './AddApp';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'tickets', headerName: 'Tickets', width: 200 },
  // {
  //   field: 'categories',
  //   headerName: 'Categories',
  //   // description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 120,
      
  // },
];

const AdminDashboard = ({ host, teams, apps, email }) => {
  const [appsContainer, setAppsContainer] = useState(apps)
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [appsData, setAppsData] = useState(apps.map((app, index) => {
    return {
      id: index + 1,
      name: app.name,
      tickets: app.tickets,
      // categories: app.categories.reduce((previous, current, index) => {
      //   if (index == 0) {
      //     return current;
      //   } else {
      //     return `${previous}, ${current}`;
      //   }
      // }, "")
    }
  }))
  const [editAppData, setEditAppData] = useState(null);

  // useEffect(() => {
  //   // Reset Edit App Data every time modal is closed.
  //   console.log("addAppModalOpen", addAppModalOpen)

  // }, [addAppModalOpen])

  const computeStatisticsPerTeam = async (key) => {
    const res = await fetch(`${host}/api/statistics/aggregate-team?key=${key}`);
    const json = await res.json();

    return json
  }

  const computeStatisticsPerApp = async (app) => {
    const res = await fetch(`${host}/api/statistics/aggregate-apps?key=${app.key}`);
    const json = await res.json();

    return json
  }

  const triggerCollationPerTeam = async () => {
    console.log("Compiling statistics", moment().format())

    Promise.all(teams.map(team => {
      return computeStatisticsPerApp()
    })).then((something) => {
      console.log("triggerCollation", something)
    })
  }

  const triggerCollation = async () => {
    console.log("Compiling statistics", moment().format())

    Promise.all(apps.map(app => {
      return computeStatisticsPerApp(app)
    })).then((something) => {
      console.log("triggerCollation", something)
    })
  }

  const openAddApp = () => {
    // setEditAppData(null);
    setAddAppModalOpen(true);
  }

  const openEditApp = (data, event) => {
    const index = parseInt(data.id) - 1
    console.log("setting app data", apps[index])
    // console.log("setting app data", apps[index])
    setEditAppData(index)
    setAddAppModalOpen(true);
  }

  const addApp = async ({name, categoryType, slug, key, tickets, ticketType, allowCollection, levels, edit}) => {
    if (edit) {
      const res = await fetch(`/api/apps/edit?email=${email}`,
      {
        body: JSON.stringify({
          name,
          categoryType,
          slug,
          key,
          tickets,
          ticketType,
          allowCollection,
          levels,
          _id: apps[editAppData]._id,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
  
        const appsRes = await fetch(`/api/apps`);
        const appsJson = await appsRes.json();
        setAppsContainer(appsJson)
        setAppsData(appsJson.map((app, index) => {
          return {
            id: index + 1,
            name: app.name,
            tickets: app.tickets,
          }
        }))
      }
    } else {
      // Add
      const res = await fetch(`/api/apps/new?email=${email}`,
      {
        body: JSON.stringify({
          name,
          categoryType,
          slug,
          key,
          tickets,
          ticketType,
          allowCollection,
          levels,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
  
        const appsRes = await fetch(`/api/apps`);
        const appsJson = await appsRes.json();
        setAppsContainer(appsJson)
        setAppsData(appsJson.map((app, index) => {
          return {
            id: index + 1,
            name: app.name,
            tickets: app.tickets,
          }
        }))
      }
    }
  }



  return (
    <div className="dashboard">
      <div className="notice">
        <h3>Notice</h3>
        <p>Welcome, admin. Have a nice day!</p>
      </div>
      <Grid container>
        <Grid container item xs>
          <h1>App Stats</h1>
        </Grid>
        <Grid item xs align="right">
          <Button variant="contained" color="secondary" onClick={triggerCollation} className="button">
            Trigger statistics collation
          </Button>
        </Grid>
      </Grid>
      <Grid container className="statistics" spacing={2}>
        {
          // teams && teams.appStatistics && teams.appStatistics.map((app) => {
            appsContainer.map((app) => {
            if (app.ticketType == 'levels') {
              let levelArray = []

              if (app.levels && app.levels.length > 0) {
                levelArray = app.levels.map((level) => {
                  return {
                    pointsValue: 0,
                    pointsType: level,
                  }
                })
              }

              return (
                <Grid item>
                  <MultiStatisticsCard
                    title="Fan n Star"
                    isEnableMultiple
                    pointsArray={levelArray}
                  />
                </Grid>
              )

            } else {
              return (
                <Grid item>
                  <StatisticsCard
                    title={app.name}
                    pointsValue="45,062,779"
                    pointsType={app.tickets}
                  />
                </Grid>
              )
            }
          })
        }
      </Grid>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container xs>
              <Grid item xs>
                <h1>Votings</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddApp} className="button">
                  Add Voting
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={[]} columns={columns} pageSize={5} />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container xs>
              <Grid item xs>
                <h1>Apps / Websites</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddApp} className="button">
                  Add App / Website
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={appsData} columns={columns} pageSize={5} onRowClick={openEditApp} />
            </div>
          </Grid>
          {/* <Grid item xs>
            <h1>Apps</h1>
          </Grid> */}
        </Grid>
      </div>
      <AddApp open={addAppModalOpen} setOpen={setAddAppModalOpen} submit={addApp} loadedData={editAppData !== null && editAppData !== undefined ? appsContainer[editAppData] : null} />
    </div>
  )
};

export default AdminDashboard;