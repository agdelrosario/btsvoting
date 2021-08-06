import Head from 'next/head'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProviders, signIn, signOut, useSession} from "next-auth/client"

export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default function Unathorized(providers) {
  const [session, loading] = useSession();
  // const [admin, setAdmin] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     router.push('/portal')
  //   }
  // }, [session]);

  // if (typeof window !== "undefined" && loading) return null;


  return (
    <div className="container">
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="login">
        <div className="login-page">
          <div className="title">
            <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
          </div>
          <p align="center">Sorry! You are not allowed to enter the site. Please wait until admin approves your request.<br />If you are not notified by admin of your approval, please check back in 24 hours.</p>
          <a href="/login">Login again</a>
          {/* <div className="login-buttons">
            {
              Object.values(providers.providers).map(provider => (
                <div key={provider.name} className="login-button">
                  <div className="login-button-description">For BVO Teams in {provider.name}</div>
                  <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
              ))
            }
          </div> */}
        </div>
      </main>
    </div>
  );
}
