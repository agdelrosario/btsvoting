
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client"
import { useRouter } from 'next/router';
import StatisticsCard from '../../components/StatisticsCard';
import MultiStatisticsCard from '../../components/MultiStatisticsCard';
import PortalLayout from '../../components/PortalLayout';


export default function Portal({ profile, session, admin }) {
  // const [admin, setAdmin] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/login')
    } else if (!profile || profile.email == null) {
      router.push('/portal/profile/initial-setup')
    } else {
      setLoading(false);
    }
  }, [session, profile]);

  return (
    <PortalLayout profile={profile} session={session}>
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
                <p>Welcome to the BTS Voting Org Portal! Your profile will be verified by the admin. After successful verification, you will be able to update your profile information and view your team's statistics. Have a great day!</p>
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
    </PortalLayout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const profileRes = await fetch(`${process.env.HOST}/api/profiles/single?email=${session.user.email}`);
  const profile = await profileRes.json();

  const adminRes = await fetch(`${process.env.HOST}/api/admin?email=${session.user.email}`);
  const admin = await adminRes.json();
  return {
    props: {
      session: session,
      profile: profile,
      admin: admin,
    }
  }
}