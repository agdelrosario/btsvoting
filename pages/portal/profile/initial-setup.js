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
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    border: '1px solid #979797',
    padding: theme.spacing(5),
  },
}));

function getSteps() {
  return ['Welcome to BVO Portal', 'Setup profile', 'Input voting details'];
}


export default function Portal() {
  const [session, loading] = useSession();
  const [admin, setAdmin] = useState();
  const [teams, setTeams] = useState();
  const allOptions = countryList().data;
  const [selectedDate, setSelectedDate] = useState(null);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <h1>Welcome to BVO Portal!</h1>
          <p>This is where BVO members update their number of voting tickets (Ever Hearts, Jellies, etc.) and keep up with their teams statistics for a more productive BVO. There are lots of things planned for this space so please stay tuned!</p>
        </div>
      );
    case 1:
      return (
        <div>
          <h1>Setup profile</h1>
          
          <div className="profile-info">
            <Grid
              container
              // direction="row"
              // justify="flex-start"
              // alignItems="center"
              spacing={3}
            >
              <Grid item xs>
              <Autocomplete
                id="combo-box-demo"
                options={teams}
                getOptionLabel={(option) => option.name}
                // style={{ width: 300 }}
                renderInput={(params) => <TextField className="autocomplete" {...params} label="Team" variant="outlined" />}
              />
              </Grid>

              <Grid item xs>
              <Autocomplete
                id="combo-box-demo"
                options={allOptions}
                getOptionLabel={(option) => option.label}
                // style={{ width: 300 }}
                renderInput={(params) => <TextField className="autocomplete" {...params} label="Country" variant="outlined" />}
              />
              </Grid>

              <Grid item xs>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  // margin="normal"
                  id="date-picker-dialog"
                  label="Birthdate (MM/DD/YYYY)"
                  format="MM/DD/YYYY"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"

                  style={{width:"100%"}}
                />
              </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  return (
    <div className="container">
      <PortalNavBar />
      <main>
        <div className="profile">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
