import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import countryList from 'react-select-country-list';
import PortalLayout from '../../../components/PortalLayout';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Portal({session, profile, host}) {
  // const [session, loading] = useSession();
  const router = useRouter();
  const [admin, setAdmin] = useState();
  const [team, setTeam] = useState();
  const isProfilePresent = profile && profile.email != null
  const [selectedDate, setSelectedDate] = useState(isProfilePresent ? moment(profile.birthday).format('MM/DD/YYYY') : null);
  // const [country, setCountry] = useState(null)
  const [country, setCountry] = useState(isProfilePresent ? countryList().valueMap[profile.country.toLowerCase()] : null)
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(true)

  // console.log('lowerThanSm', lowerThanSm)
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin`);
      const json = await res.json();

      if (json.admin) {
        setAdmin(json.admin);
      }
    };
    
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/single?slug=${profile.team}`);
      const json = await res.json();

      if (json) {
        console.log("json", json)
        setTeam(json);
      }
    };

    fetchData();
    if (profile && profile.email != null) {
      fetchTeam();
      setLoading(false);
    } else {
      router.push('/portal/profile/initial-setup')
    }
  }, [session]);

  // if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }

  return (
    <PortalLayout profile={profile} session={session}>
      {
        loading && (
          <>
            Insert Loading Screen here
          </>
        )
      }
      {
        !loading && (
        <Grid 
          container
          className="profile"
        >
          <p>Note: The information in this page can also be viewed by the admins.</p>
          {/* <div> */}
            <Grid
              container
              className="heading"
              spacing={1} 
              direction="row"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={6}><h1>Profile</h1></Grid>
              <Grid
                item xs={12} sm={6} alignItems="flex-end" justify="flex-end" align={lowerThanSm ? "left" : "right"}><span>Please talk to an admin to modify.</span></Grid>
            </Grid>
            <div className="profile-info">
              <Grid 
                container
                direction="row"
                spacing={2}
              >
                <Grid item xs className="profile-info-card">
                  <TextField className="autocomplete" label="Team" value={team ? team.name : ''} disabled variant="outlined" />
                </Grid>
                <Grid item xs className="profile-info-card">
                  <TextField className="autocomplete" label="Country" defaultValue={country} disabled variant="outlined" />
                </Grid>
                <Grid item xs className="profile-info-card">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Birthdate"
                      format="MM/DD/YYYY"
                      value={selectedDate}
                      // onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      inputVariant="outlined"
                      disabled
                      style={{width:"100%"}}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>
            <div className="voting-profile">
              <div className="heading">
                <h1>Voting Profile</h1>
                <span>Monthly stats are collated every end of the month. Please update as often as you can.</span>
              </div>
            </div>
          {/* </div> */}
        </Grid>
      )}
    </PortalLayout>
  );
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const res = await fetch(`${process.env.HOST}/api/profiles/single?email=${session.user.email}`);
  const profile = await res.json();
  return {
    props: {
      session: session,
      profile: profile,
      host: process.env.HOST
    }
  }
}
