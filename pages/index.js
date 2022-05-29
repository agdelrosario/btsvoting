import Head from 'next/head'
import React, { useEffect, useState } from "react"
import Link from "next/link"
// import {signIn, signOut, useSession} from "next-auth/client"
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from "moment-timezone";
import { format } from 'date-fns';
import AlbumIcon from '@mui/icons-material/Album';
import PublicIcon from '@mui/icons-material/Public';
// import { Public } from '@material-ui/icons';
import StarIcon from '@mui/icons-material/Star';
import { Apps } from '@material-ui/icons';

export default function Home({enableFrontpage}) {
  // const [session, loading] = useSession();
  const [apps, setApps] = useState([])
  const [pastVotings, setPastVotings] = useState()
  const [presentVotings, setPresentVotings] = useState()
  const [futureVotings, setFutureVotings] = useState()
  const [categories, setCategories] = useState()

  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const lowerThanMd = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const retrievePastVotings = async () => {
      const votingsRes = await fetch(`/api/votings/past`);
      let votingsJson = await votingsRes.json()

      if (!!votingsJson) {
        setPastVotings(votingsJson);
      } else {
        setPastVotings([])
      }
    }

    const retrievePresentVotings = async () => {
      const votingsRes = await fetch(`/api/votings/present`);
      let votingsJson = await votingsRes.json()
      // console.log("votingsJson", votingsJson)

      if (!!votingsJson) {
        setPresentVotings(votingsJson.concat(votingsJson).concat(votingsJson));
      } else {
        setPresentVotings([])
      }
    }

    const retrieveCategory = async () => {
      const categoryRes = await fetch(`/api/categories`);
      let categoryJson = await categoryRes.json()

      if (!!categoryJson) {
        setCategories(categoryJson.reduce((categories, category, index) => {
          return {
            ...categories,
            [category.name]: {
              type: category.categoryTypeKey,
            }
          }
        }, {}));
        // setCategory(categoryJson)
      } else {
        setCategories([])
      }
    }
    const retrieveFutureVotings = async () => {
      const votingsRes = await fetch(`/api/votings/future`);
      let votingsJson = await votingsRes.json()
      console.log("FUTURE", votingsJson)

      if (!!votingsJson) {
        setFutureVotings(votingsJson);
      } else {
        setFutureVotings([])
      }
    }

    const retrieveApps = async () => {
      const appsRes = await fetch(`/api/apps`);
      setApps(await appsRes.json());
    }



    moment.tz.setDefault("Asia/Seoul")
    retrieveApps()
    retrievePresentVotings()
    retrievePastVotings()
    retrieveFutureVotings()
    retrieveCategory()
  }, [])

  const formatDateRange = (startDate, endDate) => {

    const start = moment.tz(startDate, "Asia/Seoul")
    const end = moment.tz(endDate, "Asia/Seoul")

    let dateRange = start.format('MMM D')
    let sameYear = true;

    if (start.get('year') !== end.get('year')) {
      dateRange = `${dateRange}, ${start.format('YYYY')}`
      sameYear = false;
    }

    dateRange = `${dateRange} - `

    if (!(sameYear && start.get('month') === end.get('month'))) {
      dateRange = `${dateRange}${end.format('MMM ')}`
    }

    return `${dateRange}${end.format('D, YYYY')}`
  }


  return (
    <>


      {
        enableFrontpage && (

          <div className={`container${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
            <Head>
              <title>BTS Voting Organization</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar lowerThanSm={lowerThanSm} />

            <Grid container className={`slogan`} spacing={1}>
              <Grid container item xs={12} className="description" alignItems="flex-end" justify="flex-start" align="flex-end" alignContent="flex-end">
                <span>The #1 source of BTS voting information and updates since 2017</span>
              </Grid>
              <Grid container item xs={12}  className="sub-description" alignItems="flex-start" align="flex-start">
                <Grid item>Posting credible awards and voting events only</Grid>
              </Grid>
            </Grid>

            <main>
            {/* {
              !lowerThanSm && ( */}
                <Grid container>
        
                  {/* <Grid item xs={12} lg={2} className="sidebar">
                    <h1>Voting Updates</h1>
                    <a className="twitter-timeline" data-lang="en" data-width="400" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/btsvotingorg?ref_src=twsrc%5Etfw">Tweets by btsvotingorg</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                  </Grid> */}
                  <Grid item xs={12} lg={12} className={`timeline${lowerThanSm ? ` xs` : ``}${lowerThanMd ? ` sm` : ``}`}>
                    <h1>Voting Timeline</h1>
                    <div className="future">
                      <div className="future-direction">
                        <div className="future-heading"><a>See more of the future</a></div>
                        <div className="future-arrow">
                          <div className="icon-arrow-up" />
                        </div>
                      </div>
                      <div className="cards">
                        {
                          !!futureVotings && futureVotings.map((voting) => {
                            const dateRange = formatDateRange(voting.startDate, voting.endDate)

                            return (
                              <a href={`/voting/${voting._id}`}>
                                <div className="card" key={voting._id}>
                                  <div className="node">
                
                                  </div>
                                  <div className="content">
                                    <div className="date">
                                      { dateRange }
                                    </div>
                                    <div className="details">
                                      <h2>{ voting.name }</h2>
                                    {/* <div className="categories">
                                        
                                          !!categories && !!voting.category && voting.category.map((category) => {
                                            return (
                                              <div className="category" key={category}>
                                                { categories[category].type == 'song' && (<div className="icon icon-music"></div>) }
                                                { categories[category].type == 'album' && (<AlbumIcon style={{fontSize: 14}} className="mui-icon" />) }
                                                { categories[category].type == 'location' && category === 'Global' && (<PublicIcon style={{fontSize: 14}} className="mui-icon" />) }
                                                <span>{ category }</span>
                                              </div>
                                            )
                                          })
                                        
                                      </div> */}
                                      <div className="app-link">
                                      {!!voting.app && voting.app.map((votingApp, index) => {
                                          const selectedApp = apps.find((app) => { return app.slug === votingApp })

                                          if (!selectedApp) { return }

                                          return (
                                            <span>{selectedApp.name}{index < (voting.app.length - 1) ? `, `: ''}</span>
                                          )}
                                        )}<span className="tooltip" alt="Not yet announced">*</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="present">
                      <div className="present-node node-heading">
                        <div className="node">
                          
                        </div>
                        <div className="node-title">
                          On-going
                        </div>
                        <div className="node-description">
                          Current votings
                        </div>
                      </div>
                      <div className="cards">
                        {
                          !!presentVotings && presentVotings.map((voting) => {
                            const dateRange = formatDateRange(voting.startDate, voting.endDate)

                            

                            return (
                              <div className="card" key={voting.oid}>
                                <div className="node">
              
                                </div>
                                <div className="node-line">
                                  &nbsp;
                                </div>
                                <div className="content">
                                  <div className="date">
                                    { dateRange }
                                  </div>
                                  <div className="details">
                                    <h1>{ voting.name }</h1>
                                    <Grid container className="categories">
                                      {
                                        !!categories && !!voting.category && voting.category.map((category) => {
                                          return (
                                            <Grid item className="category" key={category}>
                                              { categories[category].type == 'song' && (<div className="icon icon-music"></div>) }
                                              { categories[category].type == 'album' && (<AlbumIcon style={{fontSize: 14}} className="mui-icon" />) }
                                              { categories[category].type == 'location' && category === 'Global' && (<PublicIcon style={{fontSize: 14}} className="mui-icon" />) }
                                              <span>{ category }</span>
                                            </Grid>
                                          )
                                        })
                                      }
                                    </Grid> 
                                    <Grid container className="app-link">
                                      <Grid item xs={12} sm={6}>
                                        Vote daily on {!!voting.app && voting.app.map((votingApp, index) => {
                                          const selectedApp = apps.find((app) => { return app.slug === votingApp })

                                          if (!selectedApp) { return }

                                          return (
                                            <span>{selectedApp.name}{index < (voting.app.length - 1) ? `, `: ''}</span>
                                          )}
                                        )}<span className="tooltip" alt="Not yet announced">*</span>
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        Current ranking: <strong>#10</strong> (1,509,326)
                                      </Grid>
                                    </Grid>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="past">
                      <div className="past-node node-heading">
                        <div className="node">
        
                        </div>
                        <div className="node-title">
                          Previous
                        </div>
                        <div className="node-description">
                          Past votings and rankings
                        </div>
                      </div>

                      <div className="cards">
                        {
                          !!pastVotings && pastVotings.map((voting) => {
                            const dateRange = formatDateRange(voting.startDate, voting.endDate)

                            

                            return (
                          <div className="card" key={voting.oid}>
                            <div className="node">
          
                            </div>
                            {/* <div className="node-line">
                              &nbsp;
                            </div> */}
                            <div className="content">
                              <div className="date">
                                { dateRange }
                              </div>
                              {/* <div className="main-content"> */}
                                <div className="rank">
                                  <div className="rank-star"><StarIcon style={{color: "#C1C1C1"}} /></div>
                                  <span className="rank-title">RANK</span>
                                  <span className="rank-position">#1</span>
                                </div>
                                <div className="details">
                                  <h1>{ voting.name }</h1>
                                  <div className="categories">
                                    {
                                      !!categories && !!voting.category && voting.category.map((category) => {
                                        return (
                                          <div className="category" key={category}>
                                            { categories[category].type == 'song' && (<div className="icon icon-music"></div>) }
                                            { categories[category].type == 'album' && (<AlbumIcon style={{fontSize: 14}} className="mui-icon" />) }
                                            { categories[category].type == 'location' && category === 'Global' && (<PublicIcon style={{fontSize: 14}} className="mui-icon" />) }
                                            <span>{ category }</span>
                                          </div>
                                        )
                                      })
                                    }
                                  </div> 
                                  <Grid container className="app-link">
                                    <Grid item xs={12} sm={6}>
                                      Voted on {!!voting.app && voting.app.map((votingApp, index) => {
                                          const selectedApp = apps.find((app) => { return app.slug === votingApp })

                                          if (!selectedApp) { return }

                                          return (
                                            <span>{selectedApp.name}{index < (voting.app.length - 1) ? `, `: ''}</span>
                                          )}
                                        )}<span className="tooltip" alt="Not yet announced">*</span>
                                    </Grid>
                                  </Grid>
                                </div>
                              {/* </div> */}
                            </div>
                          </div>
                            )})
                        }
                        </div>

                      <div className="past-direction">
                        <div className="past-arrow">
                          <div className="icon-arrow-up down" />
                        </div>
                        <div className="past-heading"><a>See more of the past</a></div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              {/* )
            }
            {
              lowerThanSm && (
                <Grid container>
    
                </Grid>
              )
            } */}
    
    
            {/* 
    
            <div className="grid">
              <a href="https://nextjs.org/docs" className="card">
                <h3>Documentation &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
    
              <a href="https://nextjs.org/learn" className="card">
                <h3>Learn &rarr;</h3>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>
    
              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className="card"
              >
                <h3>Examples &rarr;</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
    
              <a
                href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className="card"
              >
                <h3>Deploy &rarr;</h3>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </div> */}
          </main>
          

          <footer className={`${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
            <div>BTS Voting Org 2021</div>
            <div>Developed and maintained by <a href="https://twitter.com/taeyadelune">@taeyadelune</a> &nbsp;&#9900;&nbsp; Content by BVO members</div>
          </footer>
        </div>
        )
      }

      {
        !enableFrontpage && (
          <div>
            <Head>
              <title>BTS Voting Organization</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="frontpage-temporary">
              <div className="title">
                <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
              </div>
              <p>Lots of plans for this space. Stay tuned.</p>
            </div>

          </div>
        )
      }
    </>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      enableFrontpage: process.env.ENABLE_FRONTPAGE === 'true',
    }
  }
}