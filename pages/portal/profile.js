import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import countryList from 'react-select-country-list'
import PortalNavBar from '../../components/PortalNavBar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Portal() {
  const [session, loading] = useSession();
  const [admin, setAdmin] = useState();
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
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }

  const teams = [
    'Armythyst',
    'Bemojikens',
    'BPTW',
    'Bulletproof',
    'BVSU',
    'Criteam',
    'Epipanthy',
    'Hope World',
    'iHeart',
    'Lajibolala',
    'Laserpointer',
    'President Namjoon',
  ]

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
            <div className="profile-info-card">
              <Autocomplete
                id="combo-box-demo"
                options={teams}
                getOptionLabel={(option) => option}
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
