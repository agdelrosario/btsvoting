import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

const ProfileGrid = ({validation, setValidation, teams, countries}) => {

  const handleInput = (item, value) => {
    let error = validation[item].error
    if (error && value != null) {
      error = false
    }

    setValidation({
      ...validation,
      [item]: {
        error,
        value
      }
    });
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

        <Grid item xs={12} sm={6} md={4}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
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
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileGrid;
  