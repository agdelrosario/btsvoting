import Head from 'next/head'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProviders, signIn, signOut, useSession} from "next-auth/client"

export async function getServerSideProps(context){
  const providers = await getProviders()

  return {
    props: {
      providers,
      enablePortal: process.env.ENABLE_PORTAL === 'true',
    }
  }
}

export default function SignIn({providers, enablePortal}) {
  const [session, loading] = useSession();
  // const [admin, setAdmin] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/portal')
    }
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;


  return (
    <div className="container">
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="login">
        {
          enablePortal && (
            <div className="login-page">
              <div className="title">
                <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
              </div>
              <p>Welcome to the home of BVO members. Please do not login if you are not a member.</p>
              <div className="login-buttons">
                {
                  Object.values(providers).map(provider => (
                    <div key={provider.name} className="login-button">
                      <div className="login-button-description">For BVO Teams in {provider.name}</div>
                      <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          !enablePortal && (
            <div className="login-page">
              <div className="title">
                <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
              </div>
              <p>Currently under maintenance. We will be back shortly.</p>
            </div>
          )
        }
      </main>
    </div>
  );
}
