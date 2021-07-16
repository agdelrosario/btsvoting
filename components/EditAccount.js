import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

function getModalStyle() {
  return {
    top: `0`,
    left: `0`,
  };
}

const gpointLevels = [
  {
    name: 'Mint',
    key: 'mint',
  },
  {
    name: 'Bronze',
    key: 'bronze',
  },
  {
    name: 'Silver',
    key: 'silver',
  },
  {
    name: 'Gold',
    key: 'gold',
  },
  {
    name: 'Black',
    key: 'black',
  },
]

export default function AddNewAccount({open, setOpen, currentApp, submit, currentAccount}) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [validation, setValidation] = useState({
    username: null,
    tickets: null,
  });

  console.log("currentApp", currentApp)

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameInput = (username) => {
    let val = username.target.value
    setUsername(val);
    let error = validation.username
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      username: error
    });
  }

  const handleTicketInput = (ticket) => {
    let val = ticket.target.value
    setTickets(val);
    let error = validation.tickets
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      tickets: error
    });
  }

  const handleGPointLevelSelect = (val) => {
    setTickets(val);
    let error = validation.tickets
    if (error && val != null) {
      error = false
    }

    setValidation({
      ...validation,
      tickets: error
    });
  };

  const handleSubmit = () => {
    let tempValidation = {
      username: null,
      tickets: null,
    }
    if (username == null || username == '') {
      tempValidation.username = true
    }
    if (tickets == null || tickets == '') {
      tempValidation.tickets = true
    }

    setValidation(tempValidation);

    if (tempValidation.username || tempValidation.tickets) {
      return null;
    }

    submit({
      app: currentApp.key,
      username,
      tickets
    });
    handleClose();
  }



  const body = (
    <div style={modalStyle} className="add-new-account-modal">
      <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
        <Grid item xs><h2 id="simple-modal-title">Edit { currentApp ? currentApp.name + ' ' : '' }Account</h2></Grid>
        <Grid item alignItems="flex-end" justify="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
      </Grid>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      {/* error={validation.country.error} */}
      <Grid container direction="columns" spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            className="ticket"
            label="Username"
            variant="outlined"
            error={validation.username}
            // onChange={(event, val) => { handleUsernameInput(val)}}
            onChange={handleUsernameInput}
            required
            value={currentAccount && currentAccount.username}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          {
            currentApp && currentApp.key != "fannstar" && (
              <TextField
                className="ticket"
                type="number"
                label={currentApp ? 'Total ' + currentApp.tickets : ''}
                variant="outlined"
                error={validation.tickets}
                // onChange={(event, val) => { handleTicketInput(val)}}
                onChange={handleTicketInput}
                required
                value={currentAccount.tickets}
              />
            )
          }
          {
            currentApp && currentApp.key == "fannstar" && (

              <Autocomplete
                id="combo-box-demo"
                options={gpointLevels}
                getOptionLabel={(option) => option.name}
                onChange={(event, val) => { handleGPointLevelSelect(val)}}
                defaultValue={currentAccount.tickets.key}
                // getOptionLabel={(option) => { return option.name || ''}}
                
                renderInput={(params) => <TextField error={validation.tickets} className="autocomplete" {...params} label="GPoint Level" variant="outlined" required />}
              />
            )
          }
          
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} className="button">
            Submit
          </Button>
        </Grid>
      </Grid>
      <AddNewAccount />
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}