import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import countryList from 'react-select-country-list';
import PortalLayout from '../../../components/PortalLayout';
import ProfileGrid from '../../../components/ProfileGrid';
import VotingGrid from '../../../components/VotingGrid';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0',
  },

  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.breakpoints.down('xs') ? theme.spacing(3) : theme.spacing(5),
    marginBottom: theme.breakpoints.down('xs') ? theme.spacing(3) : theme.spacing(5),
    border: '1px solid #979797',
    padding: theme.breakpoints.down('xs') ? theme.spacing(3) : theme.spacing(5),
  },
}));

function getSteps() {
  return ['Welcome to BVO Portal', 'Setup personal profile', 'Input voting details'];
}

export default function Portal({session, profile, host, teams, countries, apps, admin}) {
  const router = useRouter();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isProfilePresent = profile && profile.team != null
  const steps = getSteps();
  console.log("admin", admin)
  const [teamsData, setTeamsData] = useState(admin.email ? teams : teams.filter((team) => {
    return team.slug != "admins"
  }))

  const [validation, setValidation] = useState({
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
    // birthday: { error: false, value: null },
  });
  const [validationVoting, setValidationVoting] = useState({
    team: { error: false, value: {
      slug: null
    } },
    country: { error: false, value: {
      value: null
    } },
    birthday: { error: false, value: null },
  });
  const [appAccounts, setAppAccounts] = useState([])

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <h1>Welcome to BVO Portal!</h1>
            <p>BVO members can update their number of voting tickets (Ever Hearts, Jellies, etc.) and keep up with their teams statistics here. There are lots of things planned for this space so please stay tuned!</p>
          </div>
        );
      case 1:
        return (
          <div>
            <h1>Setup personal profile</h1>
            <ProfileGrid validation={validation} setValidation={setValidation} teams={teamsData} countries={countries} />
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Input voting details</h1>
            <VotingGrid email={session.user.email} validation={validationVoting} setValidation={setValidationVoting} apps={apps} appAccounts={appAccounts} />
          </div>
        );
      default:
        return "Unknown step. I don't know how you got here, but you should refresh.";
    }
  }

  const handleNext = async () => {
    if (activeStep == 1) {
      let errors = []
      if (!(validation.team.value && validation.team.value.slug && validation.team.value.slug != '')) {
        errors.push('team');
      }
      if (!(validation.country.value && validation.country.value.value && validation.country.value.value != '')) {
        errors.push('country');
      }
      if (!(validation.month.value && validation.month.value.value && validation.month.value.value != '')) {
        errors.push('month');
      }
      if (!(validation.day.value && validation.day.value.value && validation.day.value.value != '')) {
        errors.push('day');
      }
      // if (!(validation.birthday.value && validation.birthday.value != '')) {
      //   errors.push('birthday');
      // }

      if (errors.length > 0) {

        let temporaryObj = { ...validation }

        errors.forEach((error) => {
          temporaryObj[error].error = true;
        })
  
        setValidation(temporaryObj)  
        return;
      }
      // const existingProfileRecheck = await fetch(`/api/profiles/single?email=${session.user.email}`);
      // const existingProfileRecheckJson = await existingProfileRecheck.json()

      // console.log("existingProfileRecheck", existingProfileRecheck)

      // if (existingProfileRecheckJson && existingProfileRecheckJson.email != null) {
      const res = await fetch(`/api/profiles/update?email=${session.user.email}`,
      {
        body: JSON.stringify({
          month: validation.month.value.value,
          day: validation.day.value.value,
          team: validation.team.value.slug,
          country: validation.country.value.value,
          lastUpdatedDate: moment().format(),
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      
      const json = await res.json();
      // } else {
      //   const res = await fetch(`/api/profiles/new`,
      //   {
      //     body: JSON.stringify({
      //       email: session.user.email,
      //       birthday: validation.birthday.value,
      //       team: validation.team.value.slug,
      //       country: validation.country.value.value,
      //       setupDate: moment().format(),
      //     }),
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     method: 'POST'
      //   });
        
      //   const json = await res.json();
      // }
    } else if (activeStep == 2) {
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  

  useEffect(() => {
    if (isProfilePresent) {
      router.push('/portal')
    } else {

      const fetchAppAccounts = async () => {
        return Promise.all(apps.map(async (app) => {
          const res = await fetch(`/api/accounts/${app.slug}?email=${session.user.email}`)
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
    }

  }, []);

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
        (isProfilePresent) && (
          <div className="profile">
            Loading
          </div>
        )
      }
      { (!isProfilePresent) && (
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
                <Typography className={classes.instructions}>Thank you for setting up your profile, army! <a href="/portal">Go to your dashboard now.</a></Typography>
                <Button onClick={handleReset}>Start again</Button>
              </div>
            ) : (
              <div>
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
      )}
    </PortalLayout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  console.log("session", session)
  const profileRes = await fetch(`${process.env.HOST}/api/profiles/single?email=${session.user.email}`);
  const profile = await profileRes.json();

  const teamsRes = await fetch(`${process.env.HOST}/api/teams`);
  const teams = await teamsRes.json();

  const appsRes = await fetch(`${process.env.HOST}/api/apps`);
  const apps = await appsRes.json();

  const countries = countryList().data;

  const adminRes = await fetch(`${process.env.HOST}/api/admin?email=${session.user.email}`);
  const admin = await adminRes.json();

  return {
    props: {
      session,
      profile,
      host: process.env.HOST,
      teams,
      countries,
      apps,
      admin,
    }
  }
}
