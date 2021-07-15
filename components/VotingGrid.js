import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AddNewAccount from './AddNewAccount';

const VotingGrid = ({host, email, validation, setValidation, initialVotingProfile, apps}) => {
  const [open, setOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState();
  const [votingProfile, setVotingProfile] = useState(initialVotingProfile);

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
  
  const handleClose = () => {
    setOpen(false);
  }

  const addAccount = async ({ app, username, tickets, }) => {
    const res = await fetch(`${host}/api/voting-profiles/update?email=${email}`,
    {
      body: JSON.stringify({
        app,
        username,
        tickets,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    
    const json = await res.json();

    const votingProfileRes = await fetch(`${host}/api/voting-profiles/single?email=${email}`);
    const votingProfileJson = await votingProfileRes.json();
    setVotingProfile(votingProfileJson)
  }

  let count = 0;

  return (
    <form className="profile-info">
      {
        apps && apps.map((app) => {
          return (
            <Grid container direction="column" className="voting-info" spacing={2}>
              <Grid container item xs spacing={1} alignItems="flex-end" >
                <Grid item><h1>{ app.name }</h1></Grid>
                <Grid item><span>{ app.tickets }</span></Grid>
              </Grid>
              <Grid
                container
                // direction="row"
                item
                spacing={2}
              >
                {
                  votingProfile && votingProfile[app.key] && votingProfile[app.key].map((val, index) => (
                    <Grid item>

                      <div className="item">
                        <h3>Account { (index + 1) }</h3>
                        <span>{val.tickets && val.tickets.name ? val.tickets.name : val.tickets}</span>
                      </div>
                    </Grid>
                  ))
                }
                <Grid item>

                  <div className="item add-new-account" onClick={() => {
                    setCurrentApp(app)
                    setOpen(true);
                  }}>
                    <h3>Add account</h3>
                  </div>
                </Grid>
              </Grid>
                  
            </Grid>
          )}
        )
      }
      <AddNewAccount open={open} setOpen={setOpen} currentApp={currentApp} submit={addAccount} />
    </form>
  )
}

export default VotingGrid;
  