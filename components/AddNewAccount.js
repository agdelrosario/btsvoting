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

export default function AddNewAccount({open, setOpen, currentApp, submit}) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (val) => {

  }

  const body = (
    <div style={modalStyle} className="add-new-account-modal">
      <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
        <Grid item xs><h2 id="simple-modal-title">New { currentApp ? currentApp.name + ' ' : '' }Account</h2></Grid>
        <Grid item alignItems="flex-end" justify="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
      </Grid>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      {/* error={validation.country.error} */}
      <Grid container direction="columns" spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField className="ticket" label="Username" variant="outlined" required />
        </Grid>
        <Grid item xs={12} sm={5}>
          {
            currentApp && currentApp.key != "fannstar" && (<TextField className="ticket" type="number" label={currentApp ? 'Total ' + currentApp.tickets : ''} variant="outlined" required />)
          }
          {
            currentApp && currentApp.key == "fannstar" && (

              <Autocomplete
                id="combo-box-demo"
                options={gpointLevels}
                getOptionLabel={(option) => option.name}
                onChange={(event, val) => { handleInput('team', val)}} 
                // defaultValue={validation.team.key}
                // getOptionLabel={(option) => { return option.name || ''}}
                // error={validation.team.error}
                renderInput={(params) => <TextField  className="autocomplete" {...params} label="GPoint Level" variant="outlined" required />}
              />
            )
          }
          
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={submit} className="button">
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