
import { useState, useEffect } from "react";
import StatisticsCard from './StatisticsCard';
import MultiStatisticsCard from './MultiStatisticsCard';
import AddApp from './AddApp';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import { DataGrid } from '@material-ui/data-grid';
import AddVotings from "./AddVotings";
import AddCategory from "./AddCategory";
import AddAward from "./AddAward";

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

const categoriesColumns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'categoriesType', headerName: 'Categories Type', width: 200 },
]

const awardsColumns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'awardType', headerName: 'Award Type', width: 200 },
]

const votingsColumns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'award', headerName: 'Award', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'app', headerName: 'App', width: 200 },
]

const tutorialsColumns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'name', headerName: 'Name', width: 200 },
  // { field: 'awardType', headerName: 'Award Type', width: 200 },
]

const AdminDashboard = ({ teams, apps, email, categories = [], awards = [], votings = [], tutorials = [] }) => {
  const [appsContainer, setAppsContainer] = useState(apps)
  const [categoriesContainer, setCategoriesContainer] = useState(categories)
  const [awardsContainer, setAwardsContainer] = useState(awards)
  const [tutorialsContainer, setTutorialsContainer] = useState(tutorials)
  const [votingsContainer, setVotingsContainer] = useState(votings)
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [addVotingsModalOpen, setAddVotingsModalOpen] = useState(false);
  const [addCategoriesModalOpen, setAddCategoriesModalOpen] = useState(false);
  const [addAwardsModalOpen, setAddAwardsModalOpen] = useState(false);
  const [addTutorialsModalOpen, setAddTutorialsModalOpen] = useState(false);
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
  const [categoriesData, setCategoriesData] = useState(!!categories ? categories.map((categories, index) => {
    // console.log("categories", categories)
    return {
      id: index + 1,
      name: categories.name,
      categoriesType: categories.categoriesType,
      categoriesTypeKey: categories.categoriesTypeKey,
      // categories: app.categories.reduce((previous, current, index) => {
      //   if (index == 0) {
      //     return current;
      //   } else {
      //     return `${previous}, ${current}`;
      //   }
      // }, "")
    }
  }) : [])
  const [awardsData, setAwardsData] = useState(!!awards ? awards.map((award, index) => {
    return {
      id: index + 1,
      name: award.name,
      awardType: award.awardType,
      awardTypeKey: award.awardTypeKey,
    }
  }) : [])
  const [votingsData, setVotingsData] = useState(!!votings ? votings.map((voting, index) => {
    return {
      id: index + 1,
      name: voting.name,
      award: voting.award,
      category: voting.category,
      app: voting.app,
      description: voting.description,
      tutorialURL: voting.tutorialURL,
    }
  }) : [])
  const [tutorialsData, setTutorialsData] = useState(!!tutorials ? tutorials.map((tutorials, index) => {
    return {
      id: index + 1,
      name: tutorials.name,
      url: tutorials.url,
      isInternal: tutorials.isInternal,
      // awardType: award.awardType,
      // awardTypeKey: award.awardTypeKey,
    }
  }) : [])
  const [editAppData, setEditAppData] = useState(null);
  const [editVotingsData, setEditVotingsData] = useState(null);
  const [editCategoriesData, setEditCategoriesData] = useState(null);
  const [editAwardsData, setEditAwardsData] = useState(null);
  const [editTutorialsData, setEditTutorialsData] = useState(null);
  const [overallAppStatistics, setOverAllAppStatistics] = useState(null);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [teamStatsColumns, setTeamStatsColumns] = useState([
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'name', headerName: 'Name', width: 250 },
  ])
  const [insertedId, setInsertedId] = useState(null);
  const [teamStatsPublishedDate, setTeamStatsPublishedDate] = useState(null);

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

      setTeamStatsColumns([
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'name', headerName: 'Name', width: 250 },
      ].concat(appColumns))
      
    }

    const fetchTeamStatistics = async () => {
      const res = await fetch(`/api/statistics/teams`);
      const json = await res.json();

      if (json) {
        let mapped = json.statistics.map((team, index) => {
          const currentTeam = teams.find((currentTeam) => {
            return currentTeam.slug == team.team
          })

          let params = {
            id: index + 1,
            name: currentTeam ? currentTeam.name : team.team,
          }

          let appParams = {}

          if (team.statistics && team.statistics.length > 0) {
            appParams = team.statistics.reduce((teamStatistics, team) => {

              if (Array.isArray(team.total)) {
                const levelParams = team.total.reduce((levelParams, level) => {
                  return {
                    ...levelParams,
                    [`${team.key}-${level.key}`]: level.total
                  }
                }, {})

                return {
                  ...teamStatistics,
                  ...levelParams,
                }
              } else {
                return {
                  ...teamStatistics,
                  [team.key]: team.total
                }
              }
            }, {})
          }
  
          return {
            ...params,
            ...appParams
          }
        })
        
        setInsertedId(json._id);
        setTeamStatistics(mapped);
        setTeamStatsPublishedDate(json.publishedDate);
      }
    };

    fetchAppsForTeamStatistics()
    fetchOverallStatistics()
    fetchTeamStatistics()
  }, [])

  const computeStatisticsPerTeam = async () => {
    const res = await fetch(`/api/statistics/aggregate-team`);
    const json = await res.json();

    return json
  }

  const triggerCollationPerTeam = async () => {
    const json = await computeStatisticsPerTeam()

    if (json) {
      if (json.insertedId) {
        setInsertedId(json.insertedId);
      }

      
      setTeamStatsPublishedDate(json.publishedDate);

      let mapped = json.statistics.map((team, index) => {
        const currentTeam = teams.find((currentTeam) => {
          return currentTeam.slug == team.team
        })

        let params = {
          id: index + 1,
          name: currentTeam ? currentTeam.name : team.team,
        }

        let appParams = {}

        if (team.statistics && team.statistics.length > 0) {
          appParams = team.statistics.reduce((teamStatistics, team) => {

            if (Array.isArray(team.total)) {
              const levelParams = team.total.reduce((levelParams, level) => {
                return {
                  ...levelParams,
                  [`${team.key}-${level.key}`]: level.total
                }
              }, {})

              return {
                ...teamStatistics,
                ...levelParams,
              }
            } else {
              return {
                ...teamStatistics,
                [team.key]: team.total
              }
            }
          }, {})
        }

        return {
          ...params,
          ...appParams
        }
      })
      
      setTeamStatistics(mapped);
    }
  }

  const triggerCollationPerApp = async () => {
    const res = await fetch(`/api/statistics/aggregate-apps`);
    const json = await res.json();

    if (json) {
      setOverAllAppStatistics(json);
    }
  }

  const triggerCollation = async () => {
    await triggerCollationPerApp();
    await triggerCollationPerTeam();
  }

  const openAddApp = () => {
    // setEditAppData(null);
    setAddAppModalOpen(true);
  }

  const openEditApp = (data, event) => {
    const index = parseInt(data.id) - 1
    setEditAppData(index)
    setAddAppModalOpen(true);
  }

  const openAddVotings = () => {
    // setEditVotingsData(null);
    setAddVotingsModalOpen(true);
  }

  const openEditVotings = (data, event) => {
    const index = parseInt(data.id) - 1
    setEditVotingsData(index)
    setAddVotingsModalOpen(true);
  }

  const openAddCategories = () => {
    // setEditCategoriesData(null);
    setAddCategoriesModalOpen(true);
  }

  const openEditCategories = (data, event) => {
    const index = parseInt(data.id) - 1
    setEditCategoriesData(index)
    setAddCategoriesModalOpen(true);
  }

  const openAddAwards = () => {
    // setEditAwardsData(null);
    setAddAwardsModalOpen(true);
  }

  const openEditAwards = (data, event) => {
    const index = parseInt(data.id) - 1
    setEditAwardsData(index)
    setAddAwardsModalOpen(true);
  }

  const addApp = async ({name, categoriesType, slug, key, tickets, ticketType, allowCollection, levels, edit}) => {
    if (edit) {
      const res = await fetch(`/api/apps/edit?email=${email}`,
      {
        body: JSON.stringify({
          name,
          categoriesType,
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
      const res = await fetch(`/api/apps/new`,
      {
        body: JSON.stringify({
          name,
          categoriesType,
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


  const fetchNewVotings = async () => {
    const votingsRes = await fetch(`/api/votings`);
    const votingsJson = await votingsRes.json();
    setVotingsContainer(votingsJson)
    setVotingsData(votingsJson.map((voting, index) => {
      return {
        id: index + 1,
        name: voting.name,
        award: voting.award,
        description: voting.description,
        category: voting.category,
        app: voting.app,
        tutorialURL: voting.tutorialURL,
        startDate: voting.startDate,
        endDate: voting.endDate,
      }
    }))
  }

  const addVotings = async ({name, category, app, description, award, tutorialURL, startDate, endDate, edit}) => {
    if (edit) {
      const res = await fetch(`/api/votings/edit`,
      {
        body: JSON.stringify({
          name,
          categories,
          app,
          description,
          award,
          category,
          tutorialURL,
          startDate,
          endDate,
          _id: votings[editVotingsData]._id,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
        fetchNewVotings()
      }
    } else {
      // Add
      const res = await fetch(`/api/votings/new`,
      {
        body: JSON.stringify({
          name,
          categories,
          app,
          description,
          award,
          category,
          tutorialURL,
          startDate,
          endDate,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
        fetchNewVotings()
      }
    }

  }

  const closeVotingsModal = () => {
    setEditVotingsData(null)
    setAddVotingsModalOpen(false)
  }

  const handleDelete = () => {
    fetchNewVotings()
  }

  const addCategories = async ({name, categoriesType, edit}) => {
    if (edit) {
      const res = await fetch(`/api/categories/edit`,
      {
        body: JSON.stringify({
          name,
          categoriesType,
          _id: categories[editCategoriesData]._id,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      
      const json = await res.json();
  
      if (json) {
        // fetch categories again
  
        const categoriesRes = await fetch(`/api/categories`);
        const categoriesJson = await categoriesRes.json();
        setCategoriesContainer(categoriesJson)
        setCategoriesData(categoriesJson.map((categories, index) => {
          return {
            id: index + 1,
            name: categories.name,
            categoriesType: categories.categoriesType,
            categoriesTypeKey: categories.categoriesTypeKey,
          }
        }))
      }
    } else {
      // Add
      const res = await fetch(`/api/categories/new`,
      {
        body: JSON.stringify({
          name,
          categoriesType,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
  
        const categoriesRes = await fetch(`/api/categories`);
        const categoriesJson = await categoriesRes.json();
        setCategoriesContainer(categoriesJson)
        setCategoriesData(categoriesJson.map((categories, index) => {
          return {
            id: index + 1,
            name: categories.name,
            categoriesType: categories.categoriesType,
            categoriesTypeKey: categories.categoriesTypeKey,
          }
        }))
      }
    }
  }

  const closeCategoriesModal = () => {
    setEditCategoriesData(null)
    setAddCategoriesModalOpen(false)
  }


  const addAwards = async ({name, awardType, slug, key, tickets, ticketType, allowCollection, levels, edit}) => {

    if (edit) {
      const res = await fetch(`/api/awards/edit`,
      {
        body: JSON.stringify({
          name,
          awardType,
          _id: awards[editAwardsData]._id,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      
      const json = await res.json();
  
      if (json) {
        // fetch categories again
  
        const awardsRes = await fetch(`/api/awards`);
        const awardsJson = await awardsRes.json();
        setAwardsContainer(awardsJson)
        setAwardsData(awardsJson.map((award, index) => {
          return {
            id: index + 1,
            name: award.name,
            awardType: award.awardType,
            awardTypeKey: award.awardTypeKey,
          }
        }))
      }
    } else {
      // Add
      const res = await fetch(`/api/awards/new`,
      {
        body: JSON.stringify({
          name,
          awardType,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      
      const json = await res.json();
  
      if (json) {
        // fetch apps again
  
        // const categoriesRes = await fetch(`/api/categories`);
        // const categoriesJson = await categoriesRes.json();
        // setCategoriesContainer(categoriesJson)
        // setCategoriesData(categoriesJson.map((categories, index) => {
        //   return {
        //     id: index + 1,
        //     name: categories.name,
        //     categoriesType: categories.categoriesType,
        //     categoriesTypeKey: categories.categoriesTypeKey,
        //   }
        // }))
  
        const awardsRes = await fetch(`/api/awards`);
        const awardsJson = await awardsRes.json();
        setAwardsContainer(awardsJson)
        setAwardsData(awardsJson.map((award, index) => {
          return {
            id: index + 1,
            name: award.name,
            awardType: award.awardType,
            awardTypeKey: award.awardTypeKey,
          }
        }))
      }
    }
  }

  const closeAwardsModal = () => {
    setEditAwardsData(null)
    setAddAwardsModalOpen(false)
  }


  const publishTeamStats = async () => {
    const res = await fetch(`/api/statistics/publish-teams`,
    {
      body: JSON.stringify({
        insertedId: insertedId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  }



  return (
    <div className="dashboard">
      <div className="notice">
        <h3>Notice</h3>
        <p>Welcome, admin. Have a nice day!</p>
      </div>

      <div className="dashboard-section">
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
                            title={app.name}
                            isEnableMultiple
                            allowCollection={app.allowCollection}
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
                          allowCollection={app.allowCollection}
                        />
                      </Grid>
                    )

                  }
                }
              }
            })
          }
        </Grid>
        <Grid container>

          <div className="statistics-date">
            * <em>Not currently active for collection</em>
          </div>
        </Grid>
      </div>
      <div className="dashboard-section">
        <Grid container spacing={3}>
          <Grid item xs>
            <Grid container>
              <Grid item xs>
                <h1>Team Statistics</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={publishTeamStats} className="button">
                  Publish to Teams
                </Button>
              </Grid>
            </Grid>
            <Grid container className="section">
              {
                overallAppStatistics && (
                  <Grid item className="statistics-date">
                    Team Statistics last published at { moment(teamStatsPublishedDate).format("MMMM Do YYYY, h:mm:ss a") }
                  </Grid>
                )
              }
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={teamStatistics} columns={teamStatsColumns} pageSize={10} />
            </div>
          </Grid>
        </Grid>
      </div>
      <Grid container className="dashboard-section">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs>
                <h1>Votings</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddVotings} className="button">
                  Add Voting
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={votingsData} columns={votingsColumns} pageSize={5} onRowClick={openEditVotings} />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container>
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
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs>
                <h1>Awards</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddAwards} className="button">
                  Add Award
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              {/* <DataGrid rows={[]} columns={columns} pageSize={5} /> */}
              <DataGrid rows={awardsData} columns={awardsColumns} pageSize={5} onRowClick={openEditAwards} />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs>
                <h1>Categories</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddCategories} className="button">
                  Add Categories
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={categoriesData} columns={categoriesColumns} pageSize={5} onRowClick={openEditCategories} />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs>
                <h1>Tutorials</h1>
              </Grid>
              <Grid item xs align="right">
                <Button variant="contained" color="secondary" onClick={openAddAwards} className="button">
                  Add Tutorial
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              {/* <DataGrid rows={[]} columns={columns} pageSize={5} /> */}
              <DataGrid rows={awardsData} columns={awardsColumns} pageSize={5} onRowClick={openEditAwards} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <AddApp open={addAppModalOpen} submit={addApp} closeModal={closeAppModal} loadedData={editAppData !== null && editAppData !== undefined ? appsContainer[editAppData] : null} />

      <AddVotings apps={apps} awards={awards} categories={categories} open={addVotingsModalOpen} submit={addVotings} closeModal={closeVotingsModal} loadedData={editVotingsData !== null && editVotingsData !== undefined ? votingsContainer[editVotingsData] : null} handleDelete={handleDelete} />
      <AddCategory open={addCategoriesModalOpen} submit={addCategories} closeModal={closeCategoriesModal} loadedData={editCategoriesData !== null && editCategoriesData !== undefined ? categoriesContainer[editCategoriesData] : null} />
      <AddAward open={addAwardsModalOpen} submit={addAwards} closeModal={closeAwardsModal} loadedData={editAwardsData !== null && editAwardsData !== undefined ? awardsContainer[editAwardsData] : null} />
    </div>
  )
};

export default AdminDashboard;