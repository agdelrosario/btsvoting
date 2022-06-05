// import Head from 'next/head'
import React, { useEffect, useState } from "react"
import NavBar from '../../components/NavBar';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loading from '../../components/Loading';
import Head from 'next/head'
import Grid from '@material-ui/core/Grid';
import { ConstructionOutlined } from "@mui/icons-material";

export default function Home() {
//   const router = useRouter();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const lowerThanMd = useMediaQuery(theme.breakpoints.down('sm'));
  // const [voting, setVoting] = useState(null)

  // useEffect(async () => {
  //   const retrieveVoting = async () => {
  //     console.log("router", router)
  //     const votingRes = await fetch(`/api/votings/single?votingId=${router.query.votingId}`);
  //     const votingJson = await votingRes.json();

  //     setVoting(votingJson)
  //   }

  //   retrieveVoting()
  // }, [])

  return (
    <div className={`container${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
    <Head>
      <title>BTS Voting Organization</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <NavBar lowerThanSm={lowerThanSm} />
      <main>
        <Grid container className="main-content">
          <Grid item>
            <h1>BVO Web Team</h1>
            <p>The web team is comprised of BVO members</p>
            <p>@bvowebteam</p>
            <h2>Theia</h2>
            <span>@taeyadelune</span>
            <span>BVO Team Laserpointer</span>
            <p>Theia is the main web admin. She designed and coded the website at its core. She handles the database and the servers. She manages the tasks of the web team and trains the new members.</p>
            
          </Grid>
        </Grid>
      </main>
          

      <footer className={`${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
        <div>BTS Voting Org 2021</div>
        <div>Developed and maintained by the <a href="/about/bvo-web-team">BVO Web Team</a></div>
    </footer>
    </div>
  )

}

// export async function getServerSideProps(ctx) {
//   const votingRes = await fetch(`${process.env.HOST}/api/votings/single?votingId=${ctx.query.votingId}`);
//   const voting = await votingRes.json();

//   return {
//     props: {
//       voting,
//     }
//   }
// }