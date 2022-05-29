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
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
// import moment from "moment";
import moment from "moment-timezone";


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

// const categories = [
//   "app",
//   "website",
// ]


function getStyles(name, category, theme) {
  if (!category) {
    return;
  }

  return {
    fontWeight:
      category.indexOf(name) === -1
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

export default function AddVotings({open, submit, loadedData, closeModal, apps, awards, categories, handleDelete}) {
  const labelRef = useRef()
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
  const classes = useStyles();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = useState(getModalStyle(lowerThanSm));
  const [name, setName] = useState(loadedData?.name || null);
  const [description, setDescription] = useState(loadedData?.description || null);
  // const [award, setAwardType] = useState(loadedData?.award || null);
  const [award, setAward] = useState(loadedData?.award || null);
  // const [awardKey, setAwardTypeKey] = useState(loadedData?.awardKey || null);
  const [validation, setValidation] = useState({
    name: null,
    app: null,
    award: null,
    category: null,
    description: null,
    tutorialURL: null,
    startDate: null,
    endDate: null,
  });
  // const [awards, setAwards] = useState(null)
  const [app, setApp] = useState(loadedData?.app || []);
  // const [category, setCategory] = useState(loadedData?.category || null);
  const [category, setCategory] = useState(loadedData?.categories || [])
  const [tutorialURL, setTutorialURL] = useState(loadedData?.tutorialURL || null);
  const [startDate, setStartDate] = useState(loadedData?.startDate || null);
  const [endDate, setEndDate] = useState(loadedData?.endDate || null);

  useEffect(() => {
    setName(loadedData?.name || null)
    setAward(loadedData?.award || null)
    setApp(loadedData?.app || null)
    setCategory(loadedData?.category || null)
    setDescription(loadedData?.description || null)
    setTutorialURL(loadedData?.tutorialURL || null)
    setCategory(loadedData?.category || [])

    // console.log("category", loadedData?.category)


    const start = !!loadedData?.startDate ? moment.tz(loadedData?.startDate, "Asia/Seoul").format("YYYY-MM-DD hh:mm:ss") : null
    
    setStartDate(start)

    const end = !!loadedData?.endDate ? moment.tz(loadedData?.endDate, "Asia/Seoul").format("YYYY-MM-DD hh:mm:ss") : null
    setEndDate(end)

    // console.log("categories", categories)

    // setAwardType(loadedData?.awardKey || null)


    // const fetchAwardTypes = async () => {
    //   const res = await fetch(`/api/awards`);
    //   const json = await res.json();

    //   if (json) {
    //     setAwards(json);
    //   }
    
    // };

    // fetchAwardTypes();
    moment.tz.setDefault("Asia/Seoul");

    
  },[open, loadedData]);

  const handleClose = () => {
    // setOpen(false);
    setName(null);
    setAward(null);
    // setCategory(null);
    setDescription(null);
    setApp(null);
    setTutorialURL(null);
    setValidation({
      name: null,
      award: null,
      category: null,
      description: null,
      tutorialURL: null,
      app: null,
    });
    setStartDate(null);
    setEndDate(null);
    closeModal();
  };

  useEffect(() => {
    setModalStyle(getModalStyle(lowerThanSm))
  }, [lowerThanSm])

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

  const handleDescriptionInput = (description) => {
    let val = description.target.value
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

  const handleTutorialURLInput = (tutorialURL) => {
    let val = tutorialURL.target.value
    setTutorialURL(val);
    let error = validation.tutorialURL
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      tutorialURL: error
    });
  }

  const handleSubmit = () => {
    let tempValidation = {
      name: null,
      award: null,
    }

    if (name == null || name == '') {
      tempValidation.name = true
    }

    if (award == null || award.length == 0) {
      tempValidation.award = true
    }

    if (category == null || category.length == 0) {
      tempValidation.category = true
    }

    if (app == null || app.length == 0) {
      tempValidation.app = true
    }

    if (description == null || description.length == 0) {
      tempValidation.description = true
    }

    if (startDate == null || name == '') {
      tempValidation.startDate = true
    }

    if (endDate == null || endDate == '') {
      tempValidation.endDate = true
    }

    // if (tutorialURL == null || tutorialURL.length == 0) {
    //   tempValidation.tutorialURL = true
    // }

    setValidation(tempValidation);

    if (tempValidation.name || tempValidation.award || tempValidation.app || tempValidation.category || tempValidation.description) {
      return null;
    }

    submit({
      name,
      award,
      app,
      // category,
      description,
      tutorialURL,
      startDate,
      endDate,
      category,
      edit: !!loadedData
    });
    
    handleClose();
  }

  const handleAwardChange = (event) => {
    let val = event.target.value
    setAward(val);

    let error = validation.award
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      award: error
    });
  };

  const handleAppChange = (event) => {
    let val = event.target.value
    setApp(val);

    let error = validation.app
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      app: error
    });
  };

  const handleCategoryChange = (event) => {
    let val = event.target.value
    setCategory(val);

    let error = validation.category
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      category: error
    });
  };
  
  const handleStartDateChange = (date) => {
    // console.log("MOMENT TZ", moment.tz)

    let val = moment.tz(date, "Asia/Seoul").utc().format()//.format("YYYY-MM-DD hh:mm:ss")
    setStartDate(val);

    let error = validation.startDate
    if (error && date != null) {
      error = false
    }
    

    setValidation({
      ...validation,
      startDate: error
    });
  };
  
  const handleEndDateChange = (date) => {
    let val = moment.tz(date, "Asia/Seoul").utc().format()//.format("YYYY-MM-DD hh:mm:ss")
    setEndDate(val);

    let error = validation.endDate
    if (error && date != null) {
      error = false
    }
    

    setValidation({
      ...validation,
      endDate: error
    });
  };

  const deleteVoting = async () => {
    const res = await fetch(`/api/votings/delete`,
    {
      body: JSON.stringify({
        _id: loadedData._id,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    const resJson = await res.json();

    if (resJson) {
      handleDelete();
      handleClose();
    }
  }


  const body = (
    <div style={modalStyle} className="modal-style">
      <div className="modal-main">
        <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
          <Grid item xs><h2 id="simple-modal-title">New Voting</h2></Grid>
          <Grid item align="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              className="ticket"
              label="Name"
              variant="outlined"
              error={validation.name}
              onChange={handleNameInput}
              value={name || ""}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.award}>Award *</InputLabel>
              <Select
                native
                value={award || "Award"}
                onChange={handleAwardChange}
                label="Award *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                // defaultValue="Award"
                error={validation.award}
              >
                <option aria-label="None" value="" />
                {
                  !!awards && awards.map((value) => (
                    <option value={value.name} key={`award-type-${value.name}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.award}>App *</InputLabel>
              <Select
                native
                value={app || "App"}
                onChange={handleAppChange}
                label="App *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                // defaultValue="App"
                error={validation.app}
              >
                <option aria-label="None" value="" />
                {
                  !!apps && apps.map((value) => (
                    <option value={value.slug} key={`app-type-${value.slug}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.app}>Apps *</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                labelWidth={labelWidth}
                label="Apps *"
                required={true}
                value={app || []}
                // value={category || "Category"}
                onChange={handleAppChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    labelWidth={labelWidth}
                    label="Apps *"
                    required={true}
                    className={classes.outlinedInput}
                    error={validation.app}
                  />
                }
                variant="outlined"
                renderValue={(selected) => {
                  // console.log("selected", selected, Array.isArray(selected))
                  return (
                    <div className={classes.chips}>
                      {
                        Array.isArray(selected)  && selected.map((value) => {
                          console.log("VALUE", value)
                          const selectedApp = apps.find((app) => { return app.slug === value })
                          return (
                            <Chip key={value} label={selectedApp.name} className={classes.chip} size="small" />
                          )
                        })
                      }
                    </div>
                  )
                }}
              >
                {
                  apps.map(({name, slug}) => (
                    <MenuItem key={slug} value={slug} style={getStyles(name, category, theme)}>
                      {name}
                    </MenuItem>
                  ))
                }
              </Select>
              <FormHelperText id="my-helper-text">Where voting and collection happens, can be multiple</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.category}>Categories *</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                labelWidth={labelWidth}
                label="Categories *"
                required={true}
                value={category || []}
                // value={category || "Category"}
                onChange={handleCategoryChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    labelWidth={labelWidth}
                    label="Categories *"
                    required={true}
                    className={classes.outlinedInput}
                    error={validation.category}
                  />
                }
                variant="outlined"
                renderValue={(selected) => {
                  console.log("selected", selected, Array.isArray(selected))
                  return (
                    <div className={classes.chips}>
                      {
                        Array.isArray(selected)  && selected.map((value) => {
                          console.log("VALUE", value)
                            return (
                            <Chip key={value} label={value} className={classes.chip} size="small" />
                            )
                          }
                        )
                      }
                    </div>
                  )
                }}
              >
                {
                  categories.map(({name}) => (
                    <MenuItem key={name} value={name} style={getStyles(name, category, theme)}>
                      {name}
                    </MenuItem>
                  ))
                }
              </Select>
              <FormHelperText id="my-helper-text">Where voting and collection happens, can be multiple</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              className="ticket"
              label="Description"
              variant="outlined"
              error={validation.description}
              onChange={handleDescriptionInput}
              value={description || ""}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              className="ticket"
              label="Tutorial URL (optional)"
              variant="outlined"
              error={validation.tutorialURL}
              onChange={handleTutorialURLInput}
              value={tutorialURL || ""}
              // required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                id="date-picker-dialog"
                views={['year','month','date','hours', 'minutes' ]}
                label="Start Date and Time"
                format="YYYY-MM-DD hh:mm:ss"
                value={startDate}
                error={validation.startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                // maxDate={new Date()}
                minDate={new Date('January 1, 1940')}
                invalidDateMessage="Invalid date format. Should be YYYY-MM-DD."
                inputVariant="outlined"
                onError={
                  (error) => {
                    if (error && error != '' && validation.startDate.error == false) {
                      setValidation({
                        ...validation,
                        startDate: {
                          error: true,
                          value: validation.startDate.value
                        }
                      })
                    }
                  }
                }
                style={{width:"100%"}}
                required
              />

              <FormHelperText id="my-helper-text">Tip: Tap on the year to pick out from the month.</FormHelperText>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                id="date-picker-dialog"
                views={['year','month','date','hours', 'minutes' ]}
                label="End Date"
                format="YYYY-MM-DD hh:mm:ss"
                value={endDate}
                error={validation.endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                // maxDate={new Date()}
                minDate={new Date('January 1, 1940')}
                invalidDateMessage="Invalid date format. Should be YYYY-MM-DD."
                inputVariant="outlined"
                onError={
                  (error) => {
                    if (error && error != '' && validation.endDate.error == false) {
                      setValidation({
                        ...validation,
                        startDate: {
                          error: true,
                          value: validation.endDate.value
                        }
                      })
                    }
                  }
                }
                style={{width:"100%"}}
                required
              />

              <FormHelperText id="my-helper-text">Tip: Tap on the year to pick out from the month.</FormHelperText>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Button variant="contained" color="secondary" onClick={handleSubmit} className="button">
              Submit
            </Button>
          </Grid>
          {
            !!loadedData && (

              <Grid item xs={12} sm={6} lg={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  onClick={deleteVoting}
                  startIcon={<DeleteForeverIcon />}
                  className="button"
                >
                  Delete Voting
                </Button>
              </Grid>
            )
          }
        </Grid>
      </div>
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