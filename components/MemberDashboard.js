
import StatisticsCard from './StatisticsCard';
import MultiStatisticsCard from './MultiStatisticsCard';
import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import moment from "moment";

const MemberDashboard = ({profile, apps}) => {
  const [teamStats, setTeamStats] = useState(null)
  
  useEffect(() => {
    const fetchTeamStatistics = async () => {
      const res = await fetch(`/api/statistics/team?team=${profile.teamInfo.slug}`);
      const json = await res.json();

      if (json) {
        setTeamStats(json)
      }
    };

    fetchTeamStatistics()
  }, [])


  return (
    <div>
      <div className="dashboard">
        <div className="notice">
          <h3>Notice</h3>
          <p>Welcome to the BTS Voting Org Portal! Have a great day!</p>
        </div>

        <div className="dashboard-section">
          <Grid container>
            <Grid container item xs>
              <h1>Team { profile.teamInfo.name } Stats</h1>
            </Grid>
          </Grid>
          <Grid container className="section">
            {
              teamStats && (
                <Grid item className="statistics-date">
                  {
                    !!teamStats.statistics && (<>Team Statistics last updated at { moment(teamStats.publishedDate).format("MMMM Do YYYY, h:mm:ss a") }</>)
                  }
                  {
                    !teamStats.statistics && (<>Sorry, there are no statistics computed yet. Wait until next computation cycle for the data to reflect.</>)
                  }
                </Grid>
              )
            }
          </Grid>
          <Grid container className="statistics" spacing={2}>
            {
              teamStats && teamStats.statistics &&
              apps.map((app, index) => {

                const statisticsIndex = teamStats.statistics.findIndex((appStatistic) => {
                  return appStatistic.key == app.key
                })


                if (statisticsIndex > -1) {
                  if (app.ticketType == 'levels') {
                    let levelArray = []

                    if (app.levels && app.levels.length > 0) {
                      levelArray = app.levels.map((level) => {
                        let count = 0


                        const levelIndex = teamStats.statistics[statisticsIndex].total.findIndex((totalPerLevel) => {
                          return totalPerLevel.key == level
                        })

                        if (levelIndex > -1) {
                          count = teamStats.statistics[statisticsIndex].total[levelIndex].total || 0
                        }

                        return {
                          pointsValue: count,
                          pointsType: level,
                        }
                      })

                      return (
                        <Grid item key={`multi-statistics-card-${index}`}>
                          <MultiStatisticsCard
                            title="Fan n Star"
                            isEnableMultiple
                            pointsArray={levelArray}
                          />
                        </Grid>
                      )
                    }

                  } else {
                    let points = teamStats.statistics[statisticsIndex].total || 0

                    return (
                      <Grid item key={`multi-statistics-card-${index}`}>
                        <StatisticsCard
                          title={app.name}
                          pointsValue={points}
                          pointsType={app.tickets}
                        />
                      </Grid>
                    )

                  }
                }
              })
            }
          </Grid>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
};

export default MemberDashboard;