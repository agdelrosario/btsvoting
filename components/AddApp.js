import { useState, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


function getModalStyle() {
  return {
    top: `0`,
    left: `0`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: 0,
    width: "100%",
    height: "100%",
  },
  outlinedInput: {
    padding: 0,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing(1),
    height: "18px",
  },
  // noLabel: {
  //   marginTop: theme.spacing(3),
  // },
}));

const categories = [
  "app",
  "website",
]

const ticketTypes = [
  {
    key: "integer",
    name: "Integer (e.g. 3,000)"
  },
  {
    key: "levels",
    name: "Levels (e.g. Black)"
  }
]


function getStyles(name, categoryType, theme) {
  return {
    fontWeight:
      categoryType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// const ITEM_HEIGHT = 100;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       marginTop: 54,

//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function AddApp({open, setOpen, submit}) {
  const labelRef = useRef()
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
  const classes = useStyles();
  const theme = useTheme();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState(null);

  const [categoryType, setCategoryType] = useState([]);
  const [tickets, setTickets] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [validation, setValidation] = useState({
    name: null,
    categoryType: null,
    tickets: null,
    ticketType: null,
  });

  const handleClose = () => {
    setOpen(false);
    setCategoryType([]);
    setName(null);
    setTicketType(null);
    setTickets(null);
  };

  const handleTicketInput = (name) => {
    let val = name.target.value
    setTickets(val);
    let error = validation.tickets
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      name: error
    });
  }

  const handleNameInput = (name) => {
    let val = name.target.value
    setName(val);
    let error = validation.name
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      name: error
    });
  }


  // Convert string to slug
  const slugify = (string) => {
    return string
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  // Convert string to get object key
  const keyify = (str) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }


  const handleSubmit = () => {
    let tempValidation = {
      name: null,
      categoryType: null,
    }



    console.log("name", name)
    console.log("categoryType", categoryType)

    if (name == null || name == '') {
      tempValidation.name = true
    }
    if (categoryType == null || categoryType.length == 0) {
      tempValidation.categoryType = true
    }

    setValidation(tempValidation);

    if (tempValidation.name || tempValidation.categoryType) {
      return null;
    }

    submit({
      name,
      categoryType,
      slug: slugify(name),
      key: keyify(name,)
    });
    handleClose();
  }

  const handleCategoryTypeChange = (event) => {
    setCategoryType(event.target.value);
  };

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };


  const body = (
    <div style={modalStyle} className="modal-style">
      <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
        <Grid item xs><h2 id="simple-modal-title">New app</h2></Grid>
        <Grid item alignItems="flex-end" justify="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
      </Grid>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      {/* error={validation.country.error} */}
      <Grid container direction="columns" spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            className="ticket"
            label="Name"
            variant="outlined"
            error={validation.name}
            // onChange={(event, val) => { handleNameInput(val)}}
            onChange={handleNameInput}
            required
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            className="ticket"
            label="Tickets"
            variant="outlined"
            error={validation.tickets}
            // onChange={(event, val) => { handleNameInput(val)}}
            onChange={handleTicketInput}
            required
            helperText="e.g. Ever Hearts, GPoints"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={labelRef} htmlFor="my-input" error={validation.categoryType}>Ticket Type *</InputLabel>
            <Select
              native
              value={ticketType}
              onChange={handleTicketTypeChange}
              label="Ticket Type *"
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
              defaultValue="Ticket Type"
            >
              <option aria-label="None" value="" />
              {
                ticketTypes.map((value) => (
                  <option value={value.key} label={value.name}>{value.name}</option>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={labelRef} htmlFor="my-input" error={validation.categoryType}>Categories *</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              labelWidth={labelWidth}
              label="Categories *"
              required={true}
              value={categoryType}
              onChange={handleCategoryTypeChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  labelWidth={labelWidth}
                  label="Categories *"
                  required={true}
                  className={classes.outlinedInput}
                  error={validation.categoryType}
                />
              }
              variant="outlined"
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {
                    selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} size="small" />
                    ))
                  }
                </div>
              )}
              // MenuProps={MenuProps}
            >
              {
                categories.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, categoryType, theme)}>
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText id="my-helper-text">Where voting and collection happens</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="secondary" onClick={handleSubmit} className="button">
              Submit
            </Button>
          </Grid>
        </Grid>
      <AddApp />
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