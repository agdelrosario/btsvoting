import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import countryList from 'react-select-country-list';
import Loading from '../../../components/Loading';
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
import VotingGrid from '../../../components/VotingGrid';

export default function Profile({session, profile, host, apps, admin}) {
  const router = useRouter();
  const [team, setTeam] = useState();
  const isProfilePresent = profile && profile.team != null
  const [selectedDate] = useState(isProfilePresent ? moment(`${profile.month}-${profile.day}-2021`, 'MM-D-YYYY') : null);
  const [country] = useState(isProfilePresent ? countryList().valueMap[profile.country.toLowerCase()] : null)
  const [month] = useState(selectedDate ? selectedDate.format('MMMM') : null)
  const [day] = useState(selectedDate ? selectedDate.format('D') : null)
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(true)
  const [appAccounts, setAppAccounts] = useState([])
  const [validationVoting, setValidationVoting] = useState({
    team: { error: false, value: {
      slug: null
    } },
    country: { error: false, value: {
      value: null
    } },
    month: { error: false, value: {
      value: null
    } },
    day: { error: false, value: {
      value: null
    } },
  });
  

  useEffect(() => {
    
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/single?slug=${profile.team}`);
      const json = await res.json();

      if (json) {
        setTeam(json);
      }
    };

    const fetchAppAccounts = async () => {
      return Promise.all(apps.map(async (app) => {
        const res = await fetch(`/api/accounts/${app.slug}?userId=${session.id}`)
        const resJson = await res.json()

        return {
          key: app.key,
          data: resJson
        }
      }))
    }

    fetchAppAccounts().then(data => {
      let accounts = {}

      data.forEach(app => {
        accounts[app.key] = app.data
      })

      setAppAccounts(accounts)
    });
    if (profile && !!profile.team) {
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
    <PortalLayout profile={profile} session={session} admin={!!admin.email}>
      {
        loading && (
          <Loading />
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
                item xs={12} sm={6} alignItems="flex-end" justify="flex-end" align={lowerThanSm ? "left" : "right"}
              >
                <span>Please talk to an admin to modify.</span>
              </Grid>
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
                <Grid container item xs className="profile-info-card" spacing={1}
                direction="row">
                  <Grid item xs={8}>
                    <TextField className="autocomplete" label="Month" defaultValue={month} disabled variant="outlined" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField className="autocomplete" label="Day" defaultValue={day} disabled variant="outlined" />
                  </Grid>
                  {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      views={['day', 'month']}
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
                  </MuiPickersUtilsProvider> */}
                </Grid>
              </Grid>
            </div>
            
            <Grid
              container
              className="heading"
              spacing={1} 
              direction="row"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={6}><h1>Voting Profile</h1></Grid>
              <Grid
                item xs={12} sm={6} alignItems="flex-end" justify="flex-end" align={lowerThanSm ? "left" : "right"}
              >
                <span>Monthly stats are collated every end of the month. Please update as often as you can.</span>
              </Grid>
            </Grid>

            <VotingGrid userId={session.id} validation={validationVoting} setValidation={setValidationVoting} apps={apps} appAccounts={appAccounts} />
            {/* <div className="voting-profile">
              <div className="heading">
                <h1>Voting Profile</h1>
                <span>Monthly stats are collated every end of the month. Please update as often as you can.</span>
              </div>
            </div> */}
          {/* </div> */}
        </Grid>
      )}
    </PortalLayout>
  );
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const profileRes = await fetch(`${process.env.HOST}/api/profiles/single?userId=${session.id}`);
  const profile = await profileRes.json();

  const appsRes = await fetch(`${process.env.HOST}/api/apps`);
  const apps = await appsRes.json();

  const adminRes = await fetch(`${process.env.HOST}/api/admin?email=${session.user.email}`);
  const admin = await adminRes.json();

  return {
    props: {
      session,
      profile,
      host: process.env.HOST,
      apps,
      admin,
    }
  }
}
