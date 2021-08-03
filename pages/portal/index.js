
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client"
import { useRouter } from 'next/router';
import PortalLayout from '../../components/PortalLayout';
import MemberDashboard from '../../components/MemberDashboard';
import AdminDashboard from '../../components/AdminDashboard';
import Loading from '../../components/Loading';


export default function Portal({ profile, session, admin, teams, apps, host }) {
  // const [admin, setAdmin] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // console.log('profile', profile)
    if (!session) {
      router.push('/login')
    } else if (!profile || !profile.team) {
      router.push('/portal/profile/initial-setup')
    } else {
      setLoading(false);
    }
  }, [session, profile]);

  return (
    <PortalLayout profile={profile} session={session} admin={!!admin.email}>
      {
        loading && (
          <Loading />
        )
      }
      {
        !loading && !admin.email && <MemberDashboard profile={profile} />
      }
      {
        !loading && !!admin.email && <AdminDashboard host={host} teams={teams} apps={apps} email={session.user.email} />
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

  const teamsRes = await fetch(`${process.env.HOST}/api/teams`);
  const teams = await teamsRes.json();

  const appsRes = await fetch(`${process.env.HOST}/api/apps`);
  const apps = await appsRes.json();

  return {
    props: {
      session,
      profile,
      admin,
      teams,
      apps,
      host: process.env.HOST,
    }
  }
}