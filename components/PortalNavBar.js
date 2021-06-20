
import {signIn, signOut, useSession} from "next-auth/client"

const NavBar = () => {
  const [session, loading] = useSession();

  return (
    <div className="navigation">
        <div className="title">
          BVO Portal<span className="title-dot">.</span>
        </div>
        <div className="links">
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