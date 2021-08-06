
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
  { field: 'name', headerName: 'Name', width: 200 },
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
  const [overallAppStatistics, setOverAllAppStatistics] = useState(null);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [teamStatsColumns, setTeamStatsColumns] = useState([
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'name', headerName: 'Name', width: 250 },
  ])

  useEffect(() => {
    // Get statistics
    const fetchOverallStatistics = async () => {
      const res = await fetch(`/api/statistics/overall-app`);
      const json = await res.json();

      if (json) {
        setOverAllAppStatistics(json.statistics);
      }
    };

    const fetchAppsForTeamStatistics = async () => {
      const appColumns = apps.reduce((columns, app) => {
        if (app.ticketType == "levels") {
          return columns.concat(app.levels.map((level) => {
            return {
              field: `${app.key}-${level}`,
              headerName: `${app.name} ${level}`,
              width: 200,
            }
          }))
        } else {
          return columns.concat([{
            field: app.key,
            headerName: app.name,
            width: 180,
          }])
        }
      }, [])

      console.log("teamStatsColumns", teamStatsColumns)

      setTeamStatsColumns([
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'name', headerName: 'Name', width: 250 },
      ].concat(appColumns))
      
    }

    const fetchTeamStatistics = async () => {
      const res = await fetch(`/api/statistics/teams`);
      const json = await res.json();

      if (json) {
        // console.log("teamStatistics", json)
        let mapped = []
        if (json && json.length > 0) {

          mapped = json.map((team, index) => {
            const currentTeam = teams.find((currentTeam) => {
              return currentTeam.slug == team.key
            })
  
            let params = {
              id: index + 1,
              name: currentTeam ? currentTeam.name : team.key,
            }

            let appParams = {}

            // console.log("team.total", team.total)

            if (team.total && team.total[team.total.length - 1].statistics) {
              appParams = team.total[team.total.length - 1].statistics.reduce((appParams, appTotal) => {
                // console.log("appTotal", appTotal)
                if (Array.isArray(appTotal.total)) {
                  const levelParams = appTotal.total.reduce((levelParams, level) => {
                    return {
                      ...levelParams,
                      [`${appTotal.key}-${level.key}`]: level.total
                    }
                  }, {})
  
                  return {
                    ...appParams,
                    ...levelParams,
                  }
                } else {
                  return {
                    ...appParams,
                    [appTotal.key]: appTotal.total
                  }
                }
              }, {})
            }
    
            return {
              ...params,
              ...appParams
            }
          })

          // console.log('mapped', mapped)
        }
        
        setTeamStatistics(mapped);
      }
    };

    fetchAppsForTeamStatistics()
    fetchOverallStatistics()
    fetchTeamStatistics()
  }, [])

  const computeStatisticsPerTeam = async (key) => {
    const res = await fetch(`/api/statistics/aggregate-team?key=${key}`);
    const json = await res.json();

    return json
  }

  const triggerCollationPerTeam = async () => {
    console.log("Compiling statistics", moment().format())

    Promise.all(teams.map(team => {
      return computeStatisticsPerTeam(team.slug)
    })).then((something) => {
      console.log("team collation", something)
      // setTeamStatistics(something)

      let mapped = []

      if (something && something.length > 0) {
        // To be replaced
        mapped = something.map((team, index) => {
          const currentTeam = teams.find((currentTeam) => {
            return currentTeam.slug == team.key
          })

          let params = {
            id: index + 1,
            name: currentTeam ? currentTeam.name : team.key,
          }

          const appParams = total.reduce((appTotal) => {
            if (appTotal.ticketType == "levels") {
              
            } else {
              return 
            }
          }, [])
  
          return {
            ...params,
            appParams
          }
        })
      }
    
      setTeamStatistics(mapped);
    })
  }

  const triggerCollationPerApp = async () => {
    const res = await fetch(`${host}/api/statistics/aggregate-apps`);
    const json = await res.json();

    if (json) {
      setOverAllAppStatistics(json);
    }
  }

  const triggerCollation = async () => {
    await triggerCollationPerApp();
    // await triggerCollationPerTeam();
  }

  const openAddApp = () => {
    // setEditAppData(null);
    setAddAppModalOpen(true);
  }

  const openEditApp = (data, event) => {
    const index = parseInt(data.id) - 1
    // console.log("setting app data", apps[index])
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

  const closeAppModal = () => {
    setEditAppData(null)
    setAddAppModalOpen(false)
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
            Compute
          </Button>
        </Grid>
      </Grid>
      <Grid container className="section">
        {
          overallAppStatistics && (
            <Grid item className="statistics-date">
              Overall Statistics last updated at { moment(overallAppStatistics.date).format("MMMM Do YYYY, h:mm:ss a") }
            </Grid>
          )
        }
      </Grid>
      <Grid container className="statistics" spacing={2}>
        {
          // teams && teams.appStatistics && teams.appStatistics.map((app) => {
          appsContainer.map((app) => {

            if (overallAppStatistics) {
              const statisticsIndex = overallAppStatistics.statistics.findIndex((appStatistic) => {
                return appStatistic.key == app.key
              })


              if (statisticsIndex > -1) {
                if (app.ticketType == 'levels') {
                  let levelArray = []

                  if (app.levels && app.levels.length > 0) {
                    levelArray = app.levels.map((level) => {
                      let count = 0


                      const levelIndex = overallAppStatistics.statistics[statisticsIndex].total.findIndex((totalPerLevel) => {
                        return totalPerLevel.key == level
                      })

                      if (levelIndex > -1) {
                        count = overallAppStatistics.statistics[statisticsIndex].total[levelIndex].total || 0
                      }

                      return {
                        pointsValue: count,
                        pointsType: level,
                      }
                    })

                    return (
                      <Grid item>
                        <MultiStatisticsCard
                          title="Fan n Star"
                          isEnableMultiple
                          pointsArray={levelArray}
                        />
                      </Grid>
                    )
                  }

                } else {
                  let points = overallAppStatistics.statistics[statisticsIndex].total || 0

                  return (
                    <Grid item>
                      <StatisticsCard
                        title={app.name}
                        pointsValue={points}
                        pointsType={app.tickets}
                      />
                    </Grid>
                  )

                }
              }
            }
          })
        }
      </Grid>
      {/* <div>
        <Grid container spacing={3}>
          <Grid item xs>
            <Grid container xs>
              <Grid item xs>
                <h1>Team Statistics</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddApp} className="button">
                  Publish to Teams
                </Button>
              </Grid>
            </Grid>
            <Grid container className="section">
              {
                overallAppStatistics && (
                  <Grid item className="statistics-date">
                    Team Statistics last published at { moment(overallAppStatistics.date).format("MMMM Do YYYY, h:mm:ss a") }
                  </Grid>
                )
              }
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={teamStatistics} columns={teamStatsColumns} pageSize={10} />
            </div>
          </Grid>
        </Grid>
      </div> */}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container xs>
              <Grid item xs>
                <h1>Votings</h1>
              </Grid>
              {/* <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddApp} className="button">
                  Add Voting
                </Button>
              </Grid> */}
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
      <AddApp open={addAppModalOpen} submit={addApp} closeModal={closeAppModal} loadedData={editAppData !== null && editAppData !== undefined ? appsContainer[editAppData] : null} />
    </div>
  )
};

export default AdminDashboard;