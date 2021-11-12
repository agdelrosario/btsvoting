
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/client"
import { useRouter } from 'next/router';
import PortalLayout from '../../components/PortalLayout';
import MemberDashboard from '../../components/MemberDashboard';
import AdminDashboard from '../../components/AdminDashboard';
import Loading from '../../components/Loading';


export default function Portal({ session }) {
  // const [admin, setAdmin] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(null)
  const [teams, setTeams] = useState(null)
  const [apps, setApps] = useState(null)
  const [profile, setProfile] = useState(null)
  

  useEffect(async () => {
    const retrieveAdmins = async () => {
      const adminRes = await fetch(`/api/admin?email=${session.user.email}`);
      setAdmin(await adminRes.json());
    }

    const retrieveApps = async () => {
      const appsRes = await fetch(`/api/apps`);
      setApps(await appsRes.json());
    }

    const retrieveProfile = async () => {
      // console.log("session", session)
      if (session.id) {
        const profileRes = await fetch(`/api/profiles/single?userId=${session.id}`);
        const profile = await profileRes.json();
        console.debug("profile", profile)
        if (!profile || (!!profile && (!profile.teamInfo || !profile.teamInfo.name))) {
          console.log("move to initial setup")
          router.push('/portal/profile/initial-setup')
        } 
  
        setProfile(profile)
      }
    }


    console.debug('session', useSession)
    if (!session) {
      router.push('/login')
    } else {
      retrieveAdmins()
      retrieveProfile()
      retrieveApps()
    }
  }, [session]);

  useEffect(async () => {
    const retrieveTeams = async () => {
      const teamsRes = await fetch(`/api/teams`);
      setTeams(await teamsRes.json());
      setLoading(false);
    }

    if (!!admin && !!admin.email) {
      retrieveTeams()
    } else {
      setLoading(false);
    }
  }, [admin])

  useEffect(async() => {
    // console.debug("apps", apps)
    // console.debug("profile", profile)
    if (!(!!admin && loading) && !!apps && !!profile) {
      setLoading(false);
    }
  }, [apps, profile])

  return (

    <>
      {
        loading && (
          <Loading />
        )
      }
      {
        !loading && (
          <PortalLayout profile={profile} session={session} admin={!!admin ? admin.email : null}>
            {
              ((!admin || !admin.email) && !!profile && !!profile.teamInfo && !!apps) && <MemberDashboard profile={profile} apps={apps} />
            }
            {
              (!!admin && !!admin.email && !!teams && !!apps) && <AdminDashboard teams={teams} apps={apps} email={session.user.email} />
            }
          </PortalLayout>
        )
      }
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  console.log("session", session)

  return {
    props: {
      session,
    }
  }
}