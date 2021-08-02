
import {signIn, signOut, useSession} from "next-auth/client"
import Grid from '@material-ui/core/Grid';

const NavBar = ({lowerThanSm}) => {
  const [session, loading] = useSession();

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      className={`navigation ${lowerThanSm ? 'xs' : ''}`}
      // spacing={1}
    >
      <Grid item xs={9} sm={6} className="title">
        <a href="/portal">
          BTS VOTING ORG<span className="title-dot">.</span>
        </a>
      </Grid>

      {
        lowerThanSm && (
          <Grid item xs={3} key="top" align="right">
            {/* <Button onClick={toggleDrawer(true)}>Top</Button> */}
            {/* <IconButton
              aria-label="delete"
              onClick={toggleDrawer(true)}

            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer anchor={"top"} open={showDrawer} onClose={toggleDrawer(false)}>
              {list()}
            </SwipeableDrawer> */}
          </Grid>
        )
      }
      {
        !lowerThanSm && (
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
            <Grid item className="link">
              <a href="">How to vote</a>
            </Grid>
          </Grid>
        )
      }
      {/* <div className="title">
        <a href="/">BTS VOTING ORG<span className="title-dot">.</span></a>
      </div> */}
      {/* <div className="links">
        <a href="" className="link">How to vote</a> */}

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
      {/* </div> */}
    </Grid>
  )
}

export default NavBar;