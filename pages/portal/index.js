
import { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/client"
import { useRouter } from 'next/router';
import PortalLayout from '../../components/PortalLayout';
import MemberDashboard from '../../components/MemberDashboard';
import AdminDashboard from '../../components/AdminDashboard';
import Loading from '../../components/Loading';


export default function Portal({session}) {
  // const [admin, setAdmin] = useState();
  // const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(null)
  const [teams, setTeams] = useState(null)
  const [apps, setApps] = useState(null)
  const [profile, setProfile] = useState(null)
  const [categories, setCategories] = useState(null)
  const [awards, setAwards] = useState(null)
  const [votings, setVotings] = useState(null)
  const componentMounted = useRef(true);
  

  useEffect(async () => {
    if (!session) {
      router.push('/login')
      return;
    }

    const retrieveAdmins = async () => {
      if (!(session && session.user && !session.user.email)) {
        const adminRes = await fetch(`/api/admin?email=${session.user.email}`);
        setAdmin(await adminRes.json());
      } else {
        setAdmin({})
      }
    }

    retrieveAdmins()

    const retrieveApps = async () => {
      const appsRes = await fetch(`/api/apps`);
      setApps(await appsRes.json());
    }

    console.debug('session', session)
    retrieveApps()
  }, []);

  useEffect(async () => {
    if (!session) {
      router.push('/login')
      return;
    }

    const retrieveProfile = async () => {
      if (session.id) {
        const profileRes = await fetch(`/api/profiles/single?userId=${session.id}`);
        const profile = await profileRes.json();
        if (!profile || (!!profile && (!profile.teamInfo || !profile.teamInfo.name))) {
          router.push('/portal/profile/initial-setup')
        } 
  
        setProfile(profile)
      }
    }

    retrieveProfile()
  }, [apps])

  useEffect(async () => {
    const retrieveTeams = async () => {
      const teamsRes = await fetch(`/api/teams`);
      let teamsJson = await teamsRes.json();

      if (componentMounted.current && !!teamsJson && !!setTeams) {
        setTeams(teamsJson);
        setLoading(false);
      }
    }
    const retrieveCategories = async () => {
      const categoriesRes = await fetch(`/api/categories`);
      let categoriesJson = await categoriesRes.json()

      if (!!categoriesJson) {
        setCategories(categoriesJson);
      } else {
        setCategories([])
      }
      // setLoading(false);
    }
    const retrieveAwards = async () => {
      const awardsRes = await fetch(`/api/awards`);
      let awardsJson = await awardsRes.json()

      if (!!awardsJson) {
        setAwards(awardsJson);
      } else {
        setAwards([])
      }
      // setLoading(false);
    }

    const retrieveVotings = async () => {
      const votingsRes = await fetch(`/api/votings`);
      let votingsJson = await votingsRes.json()

      if (!!votingsJson) {
        setVotings(votingsJson);
      } else {
        setVotings([])
      }
      // setLoading(false);
    }

    if (!!admin && !!admin.email) {
      retrieveTeams()
      retrieveCategories()
      retrieveAwards()
      retrieveVotings()
    }
  }, [profile])

  useEffect(async() => {
    // console.log("admin", admin)
    // console.log("loading", loading)
    // console.log("apps", apps)
    // console.log("profile", profile)
    if ((!!admin && loading) && !!apps && !!profile) {
      setLoading(false);
    }
  }, [apps, profile, admin, loading])

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
              (!!admin && !!admin.email && !!teams && !!apps && !!categories && !!awards && !!votings) && <AdminDashboard teams={teams} apps={apps} email={session.user.email} categories={categories} awards={awards} votings={votings} />
            }
          </PortalLayout>
        )
      }
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    }
  }
}