import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AddNewAccount from './AddNewAccount';
import EditAccount from './EditAccount';

const VotingGrid = ({host, email, validation, setValidation, initialVotingProfile, apps}) => {
  const [open, setOpen] = useState(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentAccountIndex, setCurrentAccountIndex] = useState(null);
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
    
    // const json = await res.json();

    const votingProfileRes = await fetch(`${host}/api/voting-profiles/single?email=${email}`);
    const votingProfileJson = await votingProfileRes.json();
    setVotingProfile(votingProfileJson)
  }

  const editAccount = async ({ app, username, tickets }) => {
    console.log("yo editing this stuff", currentAccount)
    // console.log("currentApp", currentApp.key)
    console.log("currentAccountIndex", currentAccountIndex)

    const res = await fetch(`${host}/api/voting-profiles/edit?email=${email}`,
    {
      body: JSON.stringify({
        appKey: app,
        index: currentAccountIndex,
        username,
        tickets,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const votingProfileRes = await fetch(`${host}/api/voting-profiles/single?email=${email}`);
    const votingProfileJson = await votingProfileRes.json();
    setVotingProfile(votingProfileJson)
  }

  const setVotingAccountData = (appKey, index, appIndex) => {
    if (votingProfile == null || votingProfile[appKey] == null) {
      return null;
    }
    console.log("index", index)
    console.log("votingProfile", votingProfile)
    console.log("votingProfile[appKey]", votingProfile[appKey])
    setCurrentApp(apps[appIndex])
    setCurrentAccountIndex(index)
    setCurrentAccount(votingProfile[appKey][index]);
    setOpenEditAccount(true);
  }

  let count = 0;

  return (
    <form className="profile-info">
      {
        apps && apps.map((app, appIndex) => {
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
                    <Grid item onClick={() => setVotingAccountData(app.key, index, appIndex)}>
                      <Grid
                        className="item"
                      >
                        <Grid container className="item-header">
                          <Grid item xs><h3>Account { (index + 1) }</h3></Grid>
                          <Grid item xs align="right" className="action">UPDATE</Grid>
                        </Grid>
                        <span>{val.tickets && val.tickets.name ? val.tickets.name : val.tickets}</span>
                      </Grid>
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
      {
        openEditAccount && (
          <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} currentApp={currentApp} submit={editAccount} currentAccount={currentAccount}  />
        )
      }
    </form>
  )
}

export default VotingGrid;
  