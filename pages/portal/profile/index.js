import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import countryList from 'react-select-country-list';
import PortalNavBar from '../../../components/PortalNavBar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Portal({session, profile, host}) {
  // const [session, loading] = useSession();
  const [admin, setAdmin] = useState();
  const [teams, setTeams] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  // const [country, setCountry] = useState(null)
  const [country, setCountry] = useState(countryList().valueMap[profile.country.toLowerCase()])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin`);
      const json = await res.json();

      if (json.admin) {
        setAdmin(json.admin);
      }
    };
    const fetchTeams = async () => {
      const res = await fetch(`/api/teams`);
      const json = await res.json();

      if (json) {
        setTeams(json);
      }
    };

    fetchData();
    fetchTeams();
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

  // const teams = [
  //   'Armythyst',
  //   'Bangtan Universe',
  //   'Bemojikens',
  //   'BPTW',
  //   'Bulletproof',
  //   'BVO 1st Child',
  //   'BVSC',
  //   'Criteam',
  //   'Epipanthy',
  //   'Hope World',
  //   'I Heart BVO',
  //   'Impiedstor',
  //   'Kim Seokjin',
  //   'Lajibolala',
  //   'Laserpointer',
  //   'Lejindary',
  //   'President Namjoon',
  //   'Yeontan',
  // ]

  return (
    <div className="container">
      <PortalNavBar />
      <main>
        <div className="profile">
          <div className="heading">
            <h1>Profile</h1>
            <span>Your information can also be viewed by the admins. To modify, please talk to an admin.</span>
          </div>
          <div className="profile-info">
            <Grid>
              <div className="profile-info-card">
                <TextField className="autocomplete" label="Team" defaultValue={country} disabled variant="outlined" />

                {/* <Autocomplete
                  id="combo-box-demo"
                  options={teams}
                  // defaultValue={profile.birthday.slug}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField className="autocomplete" {...params} label="Team" variant="outlined" />}
                /> */}
              </div>
              <div className="profile-info-card">
                <TextField className="autocomplete" label="Country" defaultValue={country} disabled variant="outlined" />
                {/* <Autocomplete
                  id="combo-box-demo"
                  options={allOptions}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField className="autocomplete" {...params} label="Country" variant="outlined" />}
                /> */}
              </div>
              <div className="profile-info-card">
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Birthdate"
                    format="MM/DD/YYYY"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider> */}
              </div>
            </Grid>
          </div>
          <div className="voting-profile">
            <div className="heading">
              <h1>Voting Profile</h1>
              <span>Monthly stats are collated every end of the month. Please update as often as you can.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
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
