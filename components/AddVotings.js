import { useState, useEffect, useRef } from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';


function getModalStyle(lowerThanSm) {
  let overflow = {}

  if (lowerThanSm) {
    overflow = {
      overflow: 'scroll',
    }
  }

  return {
    top: `0`,
    left: `0`,
    ...overflow,
  }
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
  "Votings",
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

export default function AddVotings({open, submit, loadedData, closeModal}) {
  const labelRef = useRef()
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
  const classes = useStyles();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = useState(getModalStyle(lowerThanSm));
  const [name, setName] = useState(loadedData?.name || null);
  const [openLevelStep, setOpenLevelStep] = useState(false);

  const [categoryType, setCategoryType] = useState(loadedData?.categoryType || []);
  const [tickets, setTickets] = useState(loadedData?.tickets || null);
  const [description, setDescription] = useState(loadedData?.tickets || null);
  const [ticketType, setTicketType] = useState(loadedData?.ticketType || null);
  const [allowCollection, setAllowCollection] = useState(loadedData ? loadedData.allowCollection : true);
  const [validation, setValidation] = useState({
    name: null,
    categoryType: null,
    // tickets: null,
    description: null,
    ticketType: null,
    allowCollection: null,
  });

  const [levels, setLevels] = useState(loadedData?.levels || [])

  const [levelValidation, setLevelValidation] = useState([]);

  useEffect(() => {
    setName(loadedData?.name || null)
    // setTickets(loadedData?.tickets || null)
    setDescription(loadedData?.description || null)
    setCategoryType(loadedData?.categoryType || [])
    setAllowCollection(loadedData? loadedData.allowCollection : true)
    setTicketType(loadedData?.ticketType || null)
    setLevels(loadedData?.levels || [])

    setLevelValidation(loadedData?.levels?.map((level) => {
      return false
    }) || [])
  },[open, loadedData]);

  const handleClose = () => {
    // setOpen(false);
    setCategoryType([]);
    setName(null);
    setTicketType(null);
    // setTickets(null);
    setDescription(null);
    setAllowCollection(true);
    setValidation({
      name: null,
      categoryType: null,
      // tickets: null,
      description: null,
      ticketType: null,
      allowCollection: null,
    });
    setLevelValidation([]);
    setOpenLevelStep(false);
    closeModal();
  };

  useEffect(() => {
    setModalStyle(getModalStyle(lowerThanSm))
  }, [lowerThanSm])

  // const handleTicketInput = (name) => {
  //   let val = name.target.value
  //   setTickets(val);
  //   let error = validation.tickets
  //   if (error && val != null && val != '') {
  //     error = false
  //   }

  //   setValidation({
  //     ...validation,
  //     tickets: error
  //   });
  // }

  const handleDescriptionInput = (name) => {
    let val = name.target.value
    setDescription(val);
    let error = validation.description
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      description: error
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
      // tickets: null,
      description: null,
      ticketType: null,
      allowCollection: null,
    }

    if (name == null || name == '') {
      tempValidation.name = true
    }
    if (categoryType == null || categoryType.length == 0) {
      tempValidation.categoryType = true
    }
    // if (tickets == null || tickets == '') {
    //   tempValidation.tickets = true
    // }
    if (description == null || description == '') {
      tempValidation.description = true
    }
    if (ticketType == null || ticketType.length == 0) {
      tempValidation.ticketType = true
    }
    if (allowCollection == null) {
      tempValidation.allowCollection = true
    }

    setValidation(tempValidation);

    if (tempValidation.name || tempValidation.categoryType || tempValidation.description || tempValidation.ticketType || tempValidation.allowCollection) {
      return null;
    }

    if (ticketType == 'levels') {
      // Transition to second step
      setOpenLevelStep(true)
    } else {

      submit({
        name,
        categoryType,
        slug: slugify(name),
        key: keyify(name),
        description,
        ticketType,
        allowCollection,
        edit: !!loadedData
      });
      
      handleClose();
    }
  }

  const handleSubmitWithLevels = () => {
    
  }

  const handleCategoryTypeChange = (event) => {
    let val = event.target.value
    setCategoryType(val);

    let error = validation.categoryType
    if (error && val != null && val.length > 0) {
      error = false
    }

    setValidation({
      ...validation,
      categoryType: error
    });
  };

  const handleTicketTypeChange = (event) => {
    let val = event.target.value
    setTicketType(val);

    let error = validation.ticketType
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      ticketType: error
    });
  };

  const handleAllowCollection = (event) => {
    let val = event.target.checked
    setAllowCollection(val)

    let error = validation.allowCollection
    if (error && val != null) {
      error = false
    }

    setValidation({
      ...validation,
      allowCollection: error
    });
  }

  const setLevelError = (index, error) => {
    const tempLevelValidation = [...levelValidation];

    tempLevelValidation[index] = error;

    setLevelValidation(tempLevelValidation);
  }

  const checkIfLastLevelHasContent = () => {
    if (levels.length == 0) {
      return true;
    }

    const lastLevelIndex = levels.length - 1
    const hasContent = levels[lastLevelIndex] && levels[lastLevelIndex] != undefined && levels[lastLevelIndex] != ''

    if (!hasContent) {
      setLevelError(lastLevelIndex, true)
    }

    return hasContent
  }

  const addLevel = () => {
    if (levels.length < 10 && checkIfLastLevelHasContent()) {
      setLevels([...levels, ""]);
      setLevelValidation([...levelValidation, false]);
    }
  }

  const removeLevel = (index) => {
    const tempLevels = [...levels];
    const tempLevelValidation = [...levelValidation];

    tempLevels.splice(index, 1);
    tempLevelValidation.splice(index, 1);

    setLevels(tempLevels);
    setLevelValidation(tempLevelValidation);
  }

  const handleChangeLevel = (val, index) => {
    let tempLevels = [...levels]
    const tempLevelValidation = [...levelValidation];

    tempLevels[index] = val
    tempLevelValidation[index] = false;
    
    setLevels(tempLevels)
    setLevelValidation(tempLevelValidation);
  }

  const handleSubmitLevel = () => {
    const tempLevelValidation = [...levelValidation];

    levels.forEach((level, index) => {
      const hasContent = level && level != undefined && level != ''
      if (!hasContent) {
        tempLevelValidation[index] = true
      }
    })

    setLevelValidation(tempLevelValidation);

    if (!tempLevelValidation.includes(true)) {
      submit({
        name,
        categoryType,
        slug: slugify(name),
        key: keyify(name),
        description,
        ticketType,
        allowCollection,
        levels,
        edit: !!loadedData,
      });
      
      handleClose();
    }

  }


  const body = (
    <div style={modalStyle} className="modal-style">
      {
        openLevelStep && (
          <Grid container className="modal-main" spacing={3}>
            <Grid container item alignItems="flex-end" style={{marginBottom: '20px'}}>
              <Grid item xs><h2 id="simple-modal-title">Define Levels</h2></Grid>
              <Grid item align="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
            </Grid>

            <Grid item>You can add a maximum of 10 levels.</Grid>
            <Grid container item spacing={3}>
              {
                levels && levels.map((level, index) => {
                  return (
                    <Grid container item xs={12} sm={6} md={4} lg={3}>
                      <Grid item xs={1} align="center">
                        { index + 1}
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          className="ticket"
                          // label="Tickets"
                          variant="outlined"
                          error={levelValidation[index]}
                          onChange={(event, val) => { handleChangeLevel(event.target.value, index)}}
                          // onChange={handleTicketInput}
                          required
                          // helperText="e.g. Ever Hearts, GPoints"
                          value={level}
                        />
                        {
                          levelValidation.length > 0 && levelValidation[index] && (
                            <FormHelperText error={levelValidation[index]}>Finish filling this up first.</FormHelperText>
                          )
                        }

                        
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => removeLevel(index)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                        {/* <Button
                          variant="contained"
                          color="secondary"
                          // className={classes.button}
                          onClick={addLevel}
                          startIcon={<AddIcon />}
                        >
                        </Button> */}
                      </Grid>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  onClick={addLevel}
                  startIcon={<AddIcon />}
                >
                  Add a level
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  onClick={handleSubmitLevel}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )
      }
      {
        !openLevelStep && (
          <div className="modal-main">
          <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
            <Grid item xs><h2 id="simple-modal-title">New Voting</h2></Grid>
            <Grid item align="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                className="text"
                label="Name"
                variant="outlined"
                error={validation.name}
                onChange={handleNameInput}
                value={name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                className="text"
                label="Description"
                variant="outlined"
                error={validation.description}
                // onChange={(event, val) => { handleNameInput(val)}}
                onChange={handleDescriptionInput}
                value={description}
                required
                // helperText="e.g. Ever Hearts, GPoint Level"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={labelRef} htmlFor="my-input" error={validation.ticketType}>Ticket Type *</InputLabel>
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
                  error={validation.ticketType}
                >
                  <option aria-label="None" value="" />
                  {
                    ticketTypes.map((value) => (
                      <option value={value.key} key={`ticket-type-${value.key}`} label={value.name}>{value.name}</option>
                    ))
                  }
                </Select>
                { ticketType == 'levels' && (
                  <FormHelperText id="my-helper-text">You will need to define these levels in the next step.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
                >
                  {
                    categories.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, categoryType, theme)}>
                        {name}
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText id="my-helper-text">Where voting and collection hVotingsens, can be multiple</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allowCollection}
                      onChange={handleAllowCollection}
                      name="allowCollection"
                      color="primary"
                    />
                  }
                  label="Allow members to collect"
                />
                <FormHelperText>Can be turned on/off in the future.</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Button variant="contained" color="secondary" onClick={handleSubmit} className="button">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        )
      }
      {/* <AddVotings /> */}
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