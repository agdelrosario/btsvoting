import Head from 'next/head'
import '@zeit-ui/style'
import React from "react"
import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/client"

export default function Home() {
  const [session, loadng] = useSession();


  return (
    <div className="container">
      <Head>
        <title>BTS Voting Organization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navigation">
        <div className="title">
          BTS Voting Organization<span className="title-dot">.</span>
        </div>
        <div className="links">
          <a href="" className="link">Home</a>
          <a href="" className="link">How to vote</a>
          <a href="" className="link">
            <div className="link-note">BVO Member?</div>
            <div>Login</div>
          </a>
        </div>
      </div>

      <div className="slogan">
        <p className="description">
          The #1 source of BTS voting information and updates since 2017
        </p>
        <p className="sub-description">
          Posting credible awards and voting events only
        </p>
      </div>
        {
          !session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
            </>
          )
        }
        {
          session && (
            <>
              Signed in as {session.user.email}<br />
              <button onClick={signOut}>Sign out</button>
            </>
          )
        }

      <main>

        <div className="sidebar">
          <h1>Voting Updates</h1>
          <a className="twitter-timeline" data-lang="en" data-width="400" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/btsvotingorg?ref_src=twsrc%5Etfw">Tweets by btsvotingorg</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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

      <style jsx>{`
        .container {
          min-height: 100vh;
          background-color: #272727;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
        }

        ::-moz-selection { background: yellow; }
        ::selection { background: yellow; }

        main {
          min-height: 300px;
          display: flex;
        }

        .navigation {
          width: 100%;
          border-bottom: 1px solid #414141;
          height: 100px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 70px;
        }

        .links {
          display: flex;
          flex-direction: row;
          height: 100%;
          align-items: flex-end;
        }

        .links .link {
          padding: 0 30px 16px 30px;
        }

        .links  a.link {
          font-weight: 600;
          color: #C2C2C2;
          text-decoration: none;
        }

        .links a.link:hover  {
          color: #FFF;
        }

        .links .link .link-note {
          font-weight: 500;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #979797;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #414141;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          font-size: 3rem;
          font-family: 'Bebas Neue', sans-serif;
          color: #ffffff;
          display: inline;
          line-height: 0.8rem;
          text-align: left;
          padding-bottom: 10px;
        }

        .slogan {
          padding: 0 70px;
          min-height: 300px;
        }

        .description {
          margin-top: 70px;
          line-height: 1rem;
          font-size: 1.5rem;
        }

        .sub-description {
          color: #9B9B9B;
          line-height: 1;
          font-size: 1.5rem;
        }

        .title-dot {
          font-family: 'Montserrat', sans-serif;
          font-size: 4rem;
          color: #FFF032;
        }

        .sidebar { 
          background-color: #1F1F1F;
          padding: 20px 20px 20px 70px;
          margin: 0 35px 0 0;
          height: 100%;
          width: 500px;
          box-sizing: border-box;
        }

        h1 {
          font-family: 'Bebas Neue', sans-serif;
          padding: 0px;
          margin: 0px;
          margin: 0 0 20px 0;
        }

        .sidebar h1 {
        }

        .icon {
          margin-right: 5px;
        }

        .icon-music {
          -webkit-mask: url('/icon-music.svg') no-repeat center;
          mask: url('/icon-music.svg') no-repeat center;
          background-color: black;
          width: 11px;
          height: 11px;
        }

        .icon-arrow-up {
          -webkit-mask: url("/arrow-up.svg") no-repeat center;
          mask: url("/arrow-up.svg") no-repeat center;
          background-color: black;
          width: 9px;
          height: 5px;
        }

        .timeline {
          position: relative;
          padding: 20px 70px 20px 20px;
          width: calc(100% - 500px - 35px);
        }

        .timeline .future {
        }

        .timeline .future .future-arrow {
          width: 21px;
          height: 21px;
          background-color: white;
          border-radius: 10.5px;
          margin-left: 124px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .timeline .future .future-arrow:hover {
          background-color: black;
        }

        .timeline .future .future-arrow:hover .icon-arrow-up {
          background-color: white;
        }

        .timeline .future .cards {
          border-left: 1px dashed #C4C4C4;
          margin-left: 134px;
          width: calc(100% - 134px);
          padding-top: 10px;
        }

        .timeline .future .cards .card {
          position: relative;
          padding: 0px 0 20px 40px;
          width: 100%;
        }

        .timeline .future .cards .card .node {
          width: 15px;
          height: 15px;
          border: 1px solid #C4C4C4;
          border-radius: 7px;
          position: absolute;
          left: -8px;
          background-color: #272727;
          top: 6px;
        }

        .timeline .future .cards .card:hover .node {
          border: 1px solid white;
        }

        .timeline .future .cards .card:hover h2 {
          color: white;
        }
        
        .timeline .future .cards .card .details {
          display: flex;
          align-items: center;
        }
        
        .timeline .future .cards .card .details .categories {
          display: flex;
          align-items: center;
          margin-left: 30px;
          
        }
        
        .timeline .future .cards .card .details .categories .category {
          background-color: #000000;
          color: #A1A1A1;
          padding: 3px 10px;
          border-radius: 14.5px;
          margin-right: 10px;
          height: 29px;
          display: flex;
          align-items: center;
        }
        
        .timeline .future .cards .card .details .categories .category:hover {
          background-color: #1A1A1A;
          color: white;
        }
        
        .timeline .future .cards .card .details .categories .category:hover .icon {
          background-color: white;
        }

        .timeline .future .cards .card .details .categories .category .icon {
          background-color: #A1A1A1;
        }

        .timeline .future .cards .card .details .categories .category span{

          font-size: 11px;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .timeline .future .cards .card .details .app-link {
          margin-left: 20px;
          
        }
        
        .timeline .future .cards .card .details .app-link .tooltip {
          font-size: 20px;
          line-height: 10px;
        }

        

        .timeline .future .cards .card h2 {
          font-family: 'Bebas Neue', sans-serif;
          padding: 0px;
          margin: 0px;
          color: #A1A1A1;
        }

        .timeline .present {
          position: relative;
        }

        .timeline .present .present-node {
          width: 20px;
          height: 20px;
          background-color: #FFF032;
          border-radius: 10px;
          margin-left: 124px;
        }




        // code {
        //   background: #fafafa;
        //   border-radius: 5px;
        //   padding: 0.75rem;
        //   font-size: 1.1rem;
        //   font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        //     DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        // }

        // .grid {
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   flex-wrap: wrap;

        //   max-width: 800px;
        //   margin-top: 3rem;
        // }

        // .card {
        //   margin: 1rem;
        //   flex-basis: 45%;
        //   padding: 1.5rem;
        //   text-align: left;
        //   color: inherit;
        //   text-decoration: none;
        //   border: 1px solid #eaeaea;
        //   border-radius: 10px;
        //   transition: color 0.15s ease, border-color 0.15s ease;
        // }

        // .card:hover,
        // .card:focus,
        // .card:active {
        //   color: #0070f3;
        //   border-color: #0070f3;
        // }

        // .card h3 {
        //   margin: 0 0 1rem 0;
        //   font-size: 1.5rem;
        // }

        // .card p {
        //   margin: 0;
        //   font-size: 1.25rem;
        //   line-height: 1.5;
        // }

        // .logo {
        //   height: 1em;
        // }

        // @media (max-width: 600px) {
        //   .grid {
        //     width: 100%;
        //     flex-direction: column;
        //   }
        // }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
