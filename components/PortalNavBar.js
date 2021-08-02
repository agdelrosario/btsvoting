import { useState } from "react";
import { signOut, useSession } from "next-auth/client"
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';

const PortalNavBar = ({isProfilePresent, lowerThanSm, admin}) => {
  const [session, loading] = useSession();
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShowDrawer(open);
  };

  const goToLink = (link) => {
    router.push(link)
  }

  console.log("router", router.pathname)

  const list = () => (
    <div
      // className={clsx(classes.list, {
      //   [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      // })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {session && isProfilePresent && router.pathname != "/portal/users" && admin &&  (
          <ListItem button key="users" onClick={() => goToLink("/portal/users")}>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        )}
        {session && isProfilePresent && router.pathname != "/portal/profile" && (
          <ListItem button key="profile" onClick={() => goToLink("/portal/profile")}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        )}
        {session && isProfilePresent && (
          <ListItem button key="users" onClick={signOut}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        )}
      </List>

      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

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
          BVO Portal<span className="title-dot">.</span>
        </a>
      </Grid>
      {
        lowerThanSm && (
          <Grid item xs={3} key="top" align="right">
            {/* <Button onClick={toggleDrawer(true)}>Top</Button> */}
            <IconButton
              aria-label="delete"
              onClick={toggleDrawer(true)}

            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer anchor={"top"} open={showDrawer} onClose={toggleDrawer(false)}>
              {list()}
            </SwipeableDrawer>
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
        )
      }
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