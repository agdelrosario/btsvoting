import Head from 'next/head'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProviders, signIn, signOut, useSession} from "next-auth/client"
// import PortalNavBar from '../../components/PortalNavBar';
// import StatisticsCard from '../../components/StatisticsCard';
// import MultiStatisticsCard from '../../components/MultiStatisticsCard';

export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default function SignIn(providers) {
  const [session, loading] = useSession();
  // const [admin, setAdmin] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/portal')
    }
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  console.log("providers", providers)

  return (
    <div className="container">
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PortalNavBar /> */}
      <main>
        <div className="login-page">
          <div className="title">
            <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
          </div>
          <p>This login is for BVO members only. You have been warned.</p>
          <div className="login-buttons">
            {
              Object.values(providers.providers).map(provider => (
                <div key={provider.name} className="login-button">
                  <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}
