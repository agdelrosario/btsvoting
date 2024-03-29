// import Head from 'next/head'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
// import Link from "next/link"
// // import {signIn, signOut, useSession} from "next-auth/client"
import NavBar from '../../components/NavBar';
// import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loading from '../../components/Loading';
// import moment from "moment-timezone";
// import { format } from 'date-fns';
// import AlbumIcon from '@mui/icons-material/Album';
// import PublicIcon from '@mui/icons-material/Public';
// // import { Public } from '@material-ui/icons';
// import StarIcon from '@mui/icons-material/Star';
import Grid from '@material-ui/core/Grid';
import { ConstructionOutlined } from "@mui/icons-material";

export default function Home({voting}) {
  const router = useRouter();
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
      <NavBar lowerThanSm={lowerThanSm} />
      <main>
        <Grid container className="main-content">
          {
            !voting && (
              <Loading />
            )
          }
          {
            !!voting && (
              <Grid item>
                <h1>{ voting.name }</h1>
              </Grid>
            )
          }
        </Grid>
      </main>
          

      <footer className={`${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
        <div>BTS Voting Org 2021</div>
        <div>Developed and maintained by <a href="https://twitter.com/taeyadelune">@taeyadelune</a> &nbsp;&#9900;&nbsp; Content by BVO members</div>
      </footer>
    </div>
  )

}

export async function getServerSideProps(ctx) {
  const votingRes = await fetch(`${process.env.HOST}/api/votings/single?votingId=${ctx.query.votingId}`);
  const voting = await votingRes.json();

  return {
    props: {
      voting,
    }
  }
}