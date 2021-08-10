import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
// import DatePicker from '@material-ui/lab/DatePicker';
import FormHelperText from '@material-ui/core/FormHelperText';
import moment from "moment";


const ProfileGrid = ({validation, setValidation, teams, countries}) => {
  const [months, setMonths] = useState(moment.months().map((month, index) => {
    return {
      value: index + 1,
      label: month,
    }
  }))
  const [days, setDays] = useState([])

  const handleInput = (item, value) => {
    let error = validation[item].error
    if (error && value != null) {
      error = false
    }

    if (item == 'month') {
      if (value && value.label && value.label != '') {
        const month = moment(`${value.label} 1, 2021`)
        const arraySize = month.daysInMonth()
        setDays(new Array(arraySize).fill(null).map((x, i) => {
          const currentDay = moment().startOf('month').add(i, 'days').format('D')
          return {
            value: currentDay,
            label: currentDay,
          }
        }))
  
        setValidation({
          ...validation,
          "day": {
            error: false,
            value: null,
          },
          [item]: {
            error,
            value
          }
        });
      } else {
        setDays([])
  
        setValidation({
          ...validation,
          "day": {
            error: false,
            value: null,
          },
          [item]: {
            error,
            value
          }
        });
      }

    } else {
      setValidation({
        ...validation,
        [item]: {
          error,
          value
        }
      });
    }
  };

  const handleDateChange = (date) => {
    let error = validation.birthday.error
    if (error && date != null) {
      error = false
    }

    setValidation({
      ...validation,
      birthday: {
        error,
        value: date
      }
    });
  };
  return (
    <form className="profile-info">
      <p>Each input field allows you to type in your data to search through the options. Finalise your selection by tapping the item in the dropdown.</p>
      <br />
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            id="combo-box-demo"
            options={teams}
            onChange={(event, val) => { handleInput('team', val)}} 
            defaultValue={validation.team.value}
            getOptionLabel={(option) => { return option.name || ''}}
            renderInput={(params) => <TextField error={validation.team.error} className="autocomplete" {...params} label="Team" variant="outlined" required />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            id="combo-box-demo"
            options={countries}
            defaultValue={validation.country.value} 
            onChange={(event, val) => { handleInput('country', val)}} 
            getOptionLabel={(option) => { return option.label || '' }}
            renderInput={(params) => <TextField error={validation.country.error} className="autocomplete" {...params} label="Country" variant="outlined" required />}
          />
        </Grid>

        <Grid container item xs={12} sm={6} md={4} spacing={1}>
          <Grid item xs={8}>
            <Autocomplete
              id="combo-box-demo"
              options={months}
              defaultValue={validation.month.value} 
              value={validation.month.value}
              onChange={(event, val) => { handleInput('month', val)}} 
              getOptionLabel={(option) => { return option.label || '' }}
              renderInput={(params) => <TextField error={validation.month.error} className="autocomplete" {...params} label="Birth Month" variant="outlined" required />}
            />
            {/* <FormHelperText>Birthday</FormHelperText> */}
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              id="combo-box-demo"
              options={days}
              defaultValue={validation.day.value}
              value={validation.day.value}
              onChange={(event, val) => { handleInput('day', val)}} 
              getOptionLabel={(option) => { return option.label || '' }}
              disabled={days.length == 0 }
              renderInput={(params) => <TextField error={validation.day.error} className="autocomplete" {...params} label="Day" variant="outlined" disabled={days.length == 0 } required />}
            />
            {/* <Grid item xs={12}><FormHelperText>Birthday</FormHelperText></Grid> */}
          </Grid>
          {/* <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              views={['month','day']}
              label="Birthdate"
              format="MM/DD/YYYY"
              value={validation.birthday.value}
              error={validation.birthday.error}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              maxDate={new Date()}
              minDate={new Date('January 1, 1940')}
              invalidDateMessage="Invalid date format. Should be MM/DD/YYYY."
              inputVariant="outlined"
              onError={
                (error) => {
                  if (error && error != '' && validation.birthday.error == false) {
                    setValidation({
                      ...validation,
                      birthday: {
                        error: true,
                        value: validation.birthday.value
                      }
                    })
                  }
                }
              }
              style={{width:"100%"}}
              required
            />
          </MuiPickersUtilsProvider> */}
        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileGrid;
  