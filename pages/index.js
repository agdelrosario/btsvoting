import Head from 'next/head'
import React from "react"
import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/client"
import NavBar from '../components/NavBar';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="container">
      <Head>
        <title>BTS Voting Organization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="slogan">
        <p className="description">
          The #1 source of BTS voting information and updates since 2017
        </p>
        <p className="sub-description">
          Posting credible awards and voting events only
        </p>
      </div>

      <main>

        <div className="sidebar">
          <h1>Voting Updates</h1>
          <a className="twitter-timeline" data-lang="en" data-width="400" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/btsvotingorg?ref_src=twsrc%5Etfw">Tweets by btsvotingorg</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
        <div className="timeline">
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
        </div>


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
        BTS Voting Org 2021
      </footer>
    </div>
  )
}
