import Head from 'next/head'
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getSession} from "next-auth/client"
import { useRouter } from 'next/router';
import PortalNavBar from '../../components/PortalNavBar';
import StatisticsCard from '../../components/StatisticsCard';
import MultiStatisticsCard from '../../components/MultiStatisticsCard';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const {HOST} = publicRuntimeConfig

// import fetchProfile from "../api/profiles/fetch-profile"


export default function Portal({ profile, session }) {
  // const [session, loading] = useSession();
  const [admin, setAdmin] = useState();
  // const [profile, setProfile] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch("/api/admin");
      const json = await res.json();

      if (json) {
        setAdmin(json.length > 0);
      }
    };
    fetchAdmin();
    // fetchProfile();

    console.log('profile', profile)


    if (!session) {
      router.push('/login')
    } else if (!profile || profile.length == 0) {
      router.push('/portal/profile/initial-setup')
    } else {
      setLoading(false);
    }
  }, [session, profile]);
  

  // if (typeof window !== "undefined" && loading) return null;

  return (
    <div className="container">
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortalNavBar />
      <main>
        {
          loading && (
            <>
              Insert Loading Screen here
            </>
          )
        }
        {
          !loading && (
            <>
              <div className="dashboard">
                <div className="notice">
                  <h3>Notice</h3>
                  Welcome to the BTS Voting Org Portal! Your profile will be verified by the admin. After successful verification, you will be able to update your profile information and view your team's statistics. Have a great day!
                </div>

                <h1>Team President Namjoon Stats</h1>
                <div className="statistics">
                  <StatisticsCard
                    title="Idol Champ"
                    pointsValue="2,986,443"
                    pointsType="Ruby Chamsims"
                  />
                  <StatisticsCard
                    title="Choeaedol"
                    pointsValue="45,062,779"
                    pointsType="Ever Hearts"
                  />
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
                </div>
              </div>
              <hr />
              <div>

              </div>
              
            </>
          )
        }
      </main>
    </div>
  );
}


// Portal.getInitialProps = async (context) => {
//   // const fetchProfile = async () => {
//     const session = await getSession(context)
//     console.log("context", context)
//     console.log("session", session)

//     // console.log("getAll", getAll)
//     // console.log("ctx", ctx)
//     // console.log("${process.env.HOST}", process.env.HOST)
//     // const res = await fetch(`${process.env.HOST}/api/profiles/fetch-profile`);
//     const res = await fetch(getAll());
//     const json = await res.json();

//     // if (json) {
//     //   setProfile(json.length > 0);
//     // }
//     return { profile: json }
//   // };
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const json = await res.json()
//   // return { stars: json.stargazers_count }
// }

// Portal.getInitialProps = async (context) => {
//   // Get the user's session based on the request
//   // const user = req.session.get('user')
//     const session = await getSession(context)
//     console.log("session", session)
//     // console.log("host", process.env)
//     // console.log("context", context)
//     console.log("process.env", process.env.SOMETHING)
//     const res = await fetch(`${process.env.SOMETHING}/api/profiles/single?email=${session.user.email}`);
//     const profile = await res.json();
//   // const ola = await fetchProfile();
//   // console.log("ola", ola)

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: '/login',
//   //       permanent: false,
//   //     },
//   //   }
//   // }

//   return {
//     props: {
//       session,
//       profile
//     },
//   }
// }

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  // console.log("session", session)
  // console.log("host", process.env)
  // console.log("context", context)
  // console.log("process.env", process.env.HOST)
  const res = await fetch(`${process.env.HOST}/api/profiles/single?email=${session.user.email}`);
  const json = await res.json();
  // console.log('res', json)
  return {
    props: {
      session: session,
      profile: json,
    }
  }
}


// export async function getStaticProps(context) {
//   console.log("HOST", process.env.SOMETHING)
//   return { props: {
//     hello: "hello" 
//   }}
// }

/*

Fetching new API -- declare in one file and import :D

import userHandler from "../../api/user/[id].js";

export async getStaticProps(){
    // This is where the api handler is getting called
    const user = await userHandler();
    return { props: { user } }
}


*/