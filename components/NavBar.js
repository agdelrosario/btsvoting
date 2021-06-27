
import {signIn, signOut, useSession} from "next-auth/client"

const NavBar = () => {
  const [session, loading] = useSession();

  return (
    <div className="navigation">
      <div className="title">
        <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
      </div>
      <div className="links">
        <a href="" className="link">How to vote</a>

        {/* {!session && (
          <div className="link">
            <div className="link-note">BVO Member?</div>
            <div className="link-login" onClick={signIn}>Log in</div>  
          </div>
        )} */}
        {/* {session && (
          <a href="/portal" className="link">Member Portal</a>
        )} */}
        {/* {session && (
          <div className="link">
            <div className="link-note">Hi {session.user.name}</div>
              <div className="link-login" onClick={signOut}>Log out</div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default NavBar;