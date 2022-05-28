// import Head from 'next/head'
import React, { useEffect, useState } from "react"
// import Link from "next/link"
// // import {signIn, signOut, useSession} from "next-auth/client"
import NavBar from '../../components/NavBar';
// import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import moment from "moment-timezone";
// import { format } from 'date-fns';
// import AlbumIcon from '@mui/icons-material/Album';
// import PublicIcon from '@mui/icons-material/Public';
// // import { Public } from '@material-ui/icons';
// import StarIcon from '@mui/icons-material/Star';

export default function Home({enableFrontpage}) {
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const lowerThanMd = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={`container${lowerThanSm || lowerThanMd ? " mobile" : ""}`}>
      <NavBar lowerThanSm={lowerThanSm} />
      Shit
    </div>
  )

}