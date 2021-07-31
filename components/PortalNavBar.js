
import { signOut, useSession } from "next-auth/client"
import Grid from '@material-ui/core/Grid';

const PortalNavBar = ({isProfilePresent, lowerThanSm, admin}) => {
  const [session, loading] = useSession();

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      className={`navigation ${lowerThanSm ? 'xs' : ''}`}
      spacing={1}
    >
      <Grid item xs={12} sm={6} className="title">
        <a href="/portal">
          BVO Portal<span className="title-dot">.</span>
        </a>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        className={`links ${lowerThanSm ? 'xs' : ''}`}
        direction="row"
        alignItems="flex-end"
        justify={`${lowerThanSm ? 'flex-start' : 'flex-end'}`}
        spacing={5}
      >
        {session && isProfilePresent && admin && (
          <Grid item className="link">
            <a href="/portal/users">Users</a>
          </Grid>
        )}
        {session && isProfilePresent && (
          <Grid item className="link">
            <a href="/portal/profile">Profile</a>
          </Grid>
        )}
        {session && (
          <Grid item className="link">
            <div className="link-note">Hi {session.user.name}</div>
              {/* <button>
                <Link href="/secret">To the secret</Link>
              </button> */}
            <div className="link-login" onClick={signOut}>Log out</div>
          </Grid>
        )}
      </Grid>
    </Grid>
    // <div className="navigation">
    //   <div className="title">
    //     <a href="/portal">BVO Portal<span className="title-dot">.</span></a>
    //   </div>
    //   <div className="links">
        
    //     {/* <a href="/" className="link">BVO Website</a> */}
    //     {session && isProfilePresent && (
    //       <a href="/portal/profile" className="link">Profile</a>
        // )}
        // {session && (
        //   <div className="link">
        //     <div className="link-note">Hi {session.user.name}</div>
        //       {/* <button>
        //         <Link href="/secret">To the secret</Link>
        //       </button> */}
        //       <div className="link-login" onClick={signOut}>Log out</div>
        //   </div>
        // )}
    //   </div>
    // </div>
  )
}

export default PortalNavBar;