import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import countryList from 'react-select-country-list'
import PortalNavBar from '../../../components/PortalNavBar'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Portal() {
  const [session, loading] = useSession();
  const [admin, setAdmin] = useState();
  const [teams, setTeams] = useState();
  const allOptions = countryList().data;
  const [selectedDate, setSelectedDate] = useState(null);

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
        // console.log("json", json)
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
                <Autocomplete
                  id="combo-box-demo"
                  options={teams}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField className="autocomplete" {...params} label="Team" variant="outlined" />}
                />
              </div>
              <div className="profile-info-card">
                <Autocomplete
                  id="combo-box-demo"
                  options={allOptions}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField className="autocomplete" {...params} label="Country" variant="outlined" />}
                />
              </div>
              <div className="profile-info-card">
                <MuiPickersUtilsProvider utils={MomentUtils}>
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
                </MuiPickersUtilsProvider>
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
