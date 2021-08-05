import Head from 'next/head'
import React from "react"
import Link from "next/link"
// import {signIn, signOut, useSession} from "next-auth/client"
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Home({enableFrontpage}) {
  // const [session, loading] = useSession();

  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>


      {
        enableFrontpage && (

          <div className={`container${lowerThanSm ? " mobile" : ""}`}>
            <Head>
              <title>BTS Voting Organization</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar lowerThanSm={lowerThanSm} />

            <Grid container className={`slogan`} spacing={1}>
              <Grid container item xs={12} className="description" alignItem="flex-end" justify="flex-start" align="flex-end" alignContent="flex-end">
                <span>The #1 source of BTS voting information and updates since 2017</span>
              </Grid>
              <Grid container item xs={12}  className="sub-description" alignItem="flex-start" align="flex-start">
                <Grid item>Posting credible awards and voting events only</Grid>
              </Grid>
            </Grid>

            <main>
            {
              !lowerThanSm && (
                <Grid container>
        
                  <Grid item xs={12} lg={2} className="sidebar">
                    <h1>Voting Updates</h1>
                    <a className="twitter-timeline" data-lang="en" data-width="400" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/btsvotingorg?ref_src=twsrc%5Etfw">Tweets by btsvotingorg</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                  </Grid>
                  <Grid item xs={12} lg={10} className="timeline">
                    <h1>Voting Timeline</h1>
                    <div className="future">
                      <div className="future-arrow">
                        <div className="icon-arrow-up" />
                      </div>
                      <div className="cards">
                        <div className="card">
                          <div className="node">
        
                          </div>
                          <div className="details">
                            <h2>Soribada Awards</h2>
                            <div className="categories">
                              <div className="category">
                                <span>Korea</span>
                              </div>
                              <div className="category">
                                <div className="icon icon-music"></div>
                                <span>Butter</span>
                              </div>
                            </div> 
                            <div className="app-link">
                              <span>Choeaedol</span><span className="tooltip" alt="Not yet announced">*</span>
                            </div>
                          </div>
                          
                        </div>
                        <div className="card">
                          <div className="node">
        
                          </div>
                          <div className="details">
                            <h2>Soribada Awards</h2>
                            <div className="categories">
                              <div className="category">
                                <span>Korea</span>
                              </div>
                              <div className="category">
                                <div className="icon icon-music"></div>
                                <span>Butter</span>
                              </div>
                            </div> 
                            <div className="app-link">
                              <span>Choeaedol</span><span className="tooltip" alt="Not yet announced">*</span>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="present">
                      <div className="present-node">
        
                      </div>
                    </div>
                    <div className="past">
                      
                    </div>
                  </Grid>
                </Grid>
              )
            }
            {
              lowerThanSm && (
                <Grid container>
    
                </Grid>
              )
            }
    
    
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
          

          <footer>
              BTS Voting Org 2021<br />
              Developed and maintained by <a href="https://twitter.com/taeyasshibb">@taeyasshibb</a>
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