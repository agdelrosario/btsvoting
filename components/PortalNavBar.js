
import {signIn, signOut, useSession} from "next-auth/client"

const NavBar = () => {
  const [session, loading] = useSession();

  return (
    <div className="navigation">
      <div className="title">
        <a href="/portal">BVO Portal<span className="title-dot">.</span></a>
      </div>
      <div className="links">
        
        {/* <a href="/" className="link">BVO Website</a> */}
        {session && (
          <a href="/portal/profile" className="link">Profile</a>
        )}
        {session && (
          <div className="link">
            <div className="link-note">Hi {session.user.name}</div>
              {/* <button>
                <Link href="/secret">To the secret</Link>
              </button> */}
              <div className="link-login" onClick={signOut}>Log out</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar;