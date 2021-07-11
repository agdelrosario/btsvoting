import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AddNewAccount from './AddNewAccount';

const VotingGrid = ({validation, setValidation, votingProfile, apps}) => {
  const [open, setOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState();

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

  const addAccount = ({ username, tickets}) => {
    console.log("username", username, "tickets", tickets)
  }

  return (
    <form className="profile-info">
      {
        apps && apps.map((app) => (
          <Grid container direction="column" className="voting-info" spacing={2}>
            <Grid container item xs spacing={1} alignItems="flex-end" >
              <Grid item><h1>{ app.name }</h1></Grid>
              <Grid item><span>{ app.tickets }</span></Grid>
            </Grid>
            <Grid
              container
              item
              spacing={3}
            >
              {
                votingProfile && votingProfile[app.key] && votingProfile[app.key].map((account, index) => (
                  <Grid item xs={8} sm={6}>
                    <Grid item>
                      <h3>Account { (index + 1) }</h3>
                    </Grid>
                  </Grid>
                ))
              }
              <Grid item xs={12} sm={2}>

                <div className="item add-new-account" onClick={() => {
                  setCurrentApp(app)
                  setOpen(true);
                }}>
                  <h3>Add account</h3>
                </div>
              </Grid>
            </Grid>
                
          </Grid>
        ))
      }
      <AddNewAccount open={open} setOpen={setOpen} currentApp={currentApp} submit={addAccount} />
    </form>
  )
}

export default VotingGrid;
  