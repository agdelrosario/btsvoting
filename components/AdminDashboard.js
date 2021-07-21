
import { useState } from "react";
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
  { field: 'slug', headerName: 'Slug', width: 130 },
  // {
  //   field: 'categories',
  //   headerName: 'Categories',
  //   // description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 120,
      
  // },
];

const AdminDashboard = ({ host, teams, apps }) => {
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [appsData] = useState(apps.map((app, index) => {
    return {
      id: index + 1,
      name: app.name,
      slug: app.slug,
      // categories: app.categories.reduce((previous, current, index) => {
      //   if (index == 0) {
      //     return current;
      //   } else {
      //     return `${previous}, ${current}`;
      //   }
      // }, "")
    }
  })) 

  const computeStatisticsPerTeam = async () => {
    const res = await fetch(`${host}/api/statistics/aggregate-team?key=bptw`);
    const json = await res.json();

    console.log("json", json)
  }

  const triggerCollation = async () => {
    console.log("Compiling statistics", moment().format())

    teams.forEach(team => {
      computeStatisticsPerTeam()
    })
  }

  const openAddApp = () => {
    setAddAppModalOpen(true);
  }

  const addApp = ({name, categoryType, slug, key}) => {
    console.log("add app name", name)
    console.log("add app categoryType", categoryType)
    console.log("add app slug", slug)
    console.log("add app key", key)
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
            apps.map((app) => {
            if (app.key == 'fannstar') {
              return (
                <Grid item>
                  <MultiStatisticsCard
                    title="Fan n Star"
                    isEnableMultiple
                    pointsArray={[
                      {
                        "pointsValue": 2,
                        "pointsType": "Black"
                      },
                      {
                        "pointsValue": 3,
                        "pointsType": "Gold"
                      },
                      {
                        "pointsValue": 7,
                        "pointsType": "Silver"
                      },
                      {
                        "pointsValue": 19,
                        "pointsType": "Bronze"
                      },
                      {
                        "pointsValue": 25,
                        "pointsType": "Mint"
                      },
                    ]}
                  />
                </Grid>
              )

            } else {
              return (
                <Grid item>
                  <StatisticsCard
                    title="Choeaedol"
                    pointsValue="45,062,779"
                    pointsType="Ever Hearts"
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
                <h1>Apps</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddApp} className="button">
                  Add App
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={appsData} columns={columns} pageSize={5} />
            </div>
          </Grid>
          {/* <Grid item xs>
            <h1>Apps</h1>
          </Grid> */}
        </Grid>
      </div>
      <AddApp open={addAppModalOpen} setOpen={setAddAppModalOpen} submit={addApp} />
    </div>
  )
};

export default AdminDashboard;