// import Header from "./Header";
// import NavBar from "./NavBar";
import Head from 'next/head'
import PortalNavBar from "./PortalNavBar";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const PortalLayout = props => {

  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <div className={`container ${lowerThanSm ? 'xs' : ''}`}>
      <Head>
        <title>BVO Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        !!props.profile && (
          <>
            <PortalNavBar isProfilePresent={props.profile.team != null} lowerThanSm={lowerThanSm} admin={props.admin} />
            <main className={`portal ${lowerThanSm ? 'xs' : ''}`}>
              {props.children}
              <div className="footer">
                <p>Designed, developed, and maintained by <a href="https://twitter.com/taeyadelune">Theia</a> (BVO Laserpointer) for BTS Voting Organization.</p>
                <p className="smaller">For inquiries, issues, and suggestions, please contact Theia or admin.</p>
              </div>
            </main>
          </>
        )
      }
    </div>
  )
  // <div className="Layout" style={layoutStyle}>
  //   <Header />
  //   <div className="Content" style={contentStyle}>
  //     {props.children}
  //   </div>
  //   <NavBar />
  // </div>
};

export default PortalLayout;