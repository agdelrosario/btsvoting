import Head from 'next/head'
import { useState, useEffect } from "react";
import {signIn, signOut, useSession} from "next-auth/client"
import PortalNavBar from '../../components/PortalNavBar';
import StatisticsCard from '../../components/StatisticsCard';
import MultiStatisticsCard from '../../components/MultiStatisticsCard';

export default function Portal() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }
  return (
    <div className="container">
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortalNavBar />
      <main>
        <div className="dashboard">
          <div className="notice">
            <h3>Notice</h3>
            Welcome to the BTS Voting Org Portal! Your profile will be verified by the admin. After successful verification, you will be able to update your profile and view your team's statistics. Have a great day!
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
      </main>
    </div>
  );
}
