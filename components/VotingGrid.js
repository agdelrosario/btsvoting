import { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AddNewAccount from './AddNewAccount';
import EditAccount from './EditAccount';

const VotingGrid = ({userId, validation, setValidation, apps, appAccounts: tempAppAccounts}) => {
  const [open, setOpen] = useState(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  // const [currentAccountIndex, setCurrentAccountIndex] = useState(null);
  const [currentApp, setCurrentApp] = useState();
  const [appAccounts, setAppAccounts] = useState({});

  useEffect(() => {
    // console.log("tempAppAccounts", tempAppAccounts)
    setAppAccounts(tempAppAccounts)
  }, [tempAppAccounts])


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
  
  const handleDelete = async (app) => {
    const newAppAccounts = await fetch(`/api/accounts/${app.slug}?userId=${userId}`);
    const newAppAccountsJson = await newAppAccounts.json();

    let tempAppAccounts = {...appAccounts}
    tempAppAccounts[app.key] = newAppAccountsJson
    setAppAccounts(tempAppAccounts);
  }

  const addAccount = async ({ app, username, tickets, }) => {
    // console.log("app", app)
    const res = await fetch(`/api/account/${app.slug}?userId=${userId}`,
    {
      body: JSON.stringify({
        username,
        tickets,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    
    // const json = await res.json();

    const newAppAccounts = await fetch(`/api/accounts/${app.slug}?userId=${userId}`);
    const newAppAccountsJson = await newAppAccounts.json();

    let tempAppAccounts = {...appAccounts}
    tempAppAccounts[app.key] = newAppAccountsJson
    setAppAccounts(tempAppAccounts);
  }

  const editAccount = async ({ app, username, tickets }) => {
    const res = await fetch(`/api/edit-account/${app.slug}?userId=${userId}`,
    {
      body: JSON.stringify({
        _id: currentAccount._id,
        username,
        tickets,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const newAppAccounts = await fetch(`/api/accounts/${app.slug}?userId=${userId}`);
    const newAppAccountsJson = await newAppAccounts.json();

    let tempAppAccounts = {...appAccounts}
    tempAppAccounts[app.key] = newAppAccountsJson
    setAppAccounts(tempAppAccounts);
  }

  const setVotingAccountData = (appKey, index, appIndex) => {
    if (appAccounts == null || appAccounts[appKey] == null) {
      return null;
    }
    setCurrentApp(apps[appIndex])
    // setCurrentAccountIndex(index)
    setCurrentAccount(appAccounts[appKey][index]);
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
                  appAccounts[app.key] && appAccounts[app.key].length > 0 && appAccounts[app.key].map((val, index) => (
                    <Grid item onClick={() => setVotingAccountData(app.key, index, appIndex)}>
                      <Grid
                        className="item"
                      >
                        <Grid container className="item-header">
                          <Grid item xs><h3>Account { (index + 1) }</h3></Grid>
                          <Grid item xs align="right" className="action">UPDATE</Grid>
                        </Grid>

                        <div className="username">{val.username}</div>
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
          <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} currentApp={currentApp} submit={editAccount} currentAccount={currentAccount} handleDelete={handleDelete}  />
        )
      }
    </form>
  )
}

export default VotingGrid;
  