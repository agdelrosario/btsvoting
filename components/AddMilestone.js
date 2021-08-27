import { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';


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

const appIds = [
  {
    key: "integer",
    name: "Integer (e.g. 3,000)"
  },
  {
    key: "levels",
    name: "Levels (e.g. Black)"
  }
]


function getStyles(name, congratulatoryText, theme) {
  return {
    fontWeight:
      congratulatoryText.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddMilestone({open, submit, loadedData, closeModal, apps}) {
  const labelRef = useRef()
  const classes = useStyles();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  const [modalStyle, setModalStyle] = useState(getModalStyle(lowerThanSm));
  const [name, setName] = useState(loadedData?.name || null);

  const [congratulatoryText, setCongratulatoryText] = useState(loadedData?.congratulatoryText || []);
  const [thresholdValue, setThresholdValue] = useState(loadedData?.thresholdValue || null);
  const [appId, setAppId] = useState(loadedData?.appId || '');
  const [active, setActive] = useState(loadedData ? loadedData.active : true);
  const [validation, setValidation] = useState({
    name: null,
    congratulatoryText: null,
    thresholdValue: null,
    appId: null,
    active: null,
  });
  const [currentApp, setCurrentApp] = useState(null)

  useEffect(() => {
    setName(loadedData?.name || null)
    setThresholdValue(loadedData?.thresholdValue || null)
    setCongratulatoryText(loadedData?.congratulatoryText || [])
    setActive(loadedData? loadedData.active : true)
    setAppId(loadedData?.appId || null)
  },[open, loadedData]);

  const handleClose = () => {
    setCongratulatoryText([]);
    setName(null);
    setAppId(null);
    setThresholdValue(null);
    setActive(true);
    setValidation({
      name: null,
      congratulatoryText: null,
      thresholdValue: null,
      appId: null,
      active: null,
    });
    closeModal();
  };

  useEffect(() => {
    setModalStyle(getModalStyle(lowerThanSm))
  }, [lowerThanSm])

  const handleTicketInput = (name) => {
    let val = name.target.value
    setThresholdValue(val);
    let error = validation.thresholdValue
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      thresholdValue: error
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

  const handleCongratulatoryTextInput = (congratulatoryText) => {
    let val = congratulatoryText.target.value
    setCongratulatoryText(val);
    let error = validation.congratulatoryText
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      congratulatoryText: error
    });
  }


  // Convert string to get object key
  const keyify = (str) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }


  const handleSubmit = () => {
    let tempValidation = {
      name: null,
      congratulatoryText: null,
      thresholdValue: null,
      appId: null,
      active: null,
    }

    if (name == null || name == '') {
      tempValidation.name = true
    }
    if (congratulatoryText == null || congratulatoryText == '') {
      tempValidation.congratulatoryText = true
    }
    if (thresholdValue == null || thresholdValue == '') {
      tempValidation.thresholdValue = true
    }
    if (appId == null || appId.length == 0) {
      tempValidation.appId = true
    }
    if (active == null) {
      tempValidation.active = true
    }

    setValidation(tempValidation);

    if (tempValidation.name || tempValidation.congratulatoryText || tempValidation.thresholdValue || tempValidation.appId || tempValidation.active) {
      return null;
    }

    submit({
      name,
      congratulatoryText,
      thresholdValue,
      appId,
      active,
    });
    
    handleClose();
  }

  const handleAppIdChange = (event) => {
    let val = event.target.value
    setAppId(val);

    let error = validation.appId
    if (error && val != null && val != '') {
      error = false
    }

    const tempApp = apps.find((app) => {
      return app.slug == val
    })

    setCurrentApp(tempApp)

    setValidation({
      ...validation,
      appId: error
    });
  };

  const handleGPointLevelSelect = (val) => {
    setThresholdValue(val);
    let error = validation.thresholdValue
    if (error && val != null) {
      error = false
    }

    setValidation({
      ...validation,
      thresholdValue: error
    });
  };

  const handleActive = (event) => {
    let val = event.target.checked
    setActive(val)

    let error = validation.active
    if (error && val != null) {
      error = false
    }

    setValidation({
      ...validation,
      active: error
    });
  }

  const body = (
    <div style={modalStyle} className="modal-style">
      <div className="modal-main">
        <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
          <Grid item xs><h2 id="simple-modal-title">New milestone</h2></Grid>
          <Grid item align="right" width="unset"><div className="close" onClick={handleClose}></div></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              className="ticket"
              label="Nickname"
              variant="outlined"
              error={validation.name}
              onChange={handleNameInput}
              defaultValue={name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.appId}>App *</InputLabel>
              <Select
                native
                value={appId}
                onChange={handleAppIdChange}
                label="App *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="App"
                error={validation.appId}
              >
                <option aria-label="None" value="" />
                {
                  apps.map((value) => (
                    <option value={value.slug} key={`app-id-${value.slug}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
              { appId == 'levels' && (
                <FormHelperText id="my-helper-text">You will need to define these levels in the next step.</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {
              currentApp == null && (
                <TextField
                  className="ticket"
                  label="Value *"
                  variant="outlined"
                  disabled
                />
              )
            }
            {
              currentApp && currentApp.ticketType == "integer" && (
                <TextField
                  className="ticket"
                  type="number"
                  label="Value"
                  variant="outlined"
                  error={validation.thresholdValue}
                  // onChange={(event, val) => { handleTicketInput(val)}}
                  onChange={handleTicketInput}
                  required
                />
              )
            }
            {
              currentApp && currentApp.ticketType == "levels" && (

                <Autocomplete
                  id="combo-box-demo"
                  options={currentApp.levels.map((level) => {
                    return {
                      name: level,
                      key: keyify(level),
                    }
                  })}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, val) => { handleGPointLevelSelect(val)}}
                  renderInput={
                    (params) => <TextField error={validation.thresholdValue} className="autocomplete" {...params} label="Value" variant="outlined" required />
                  }
                />
              )
            }
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              className="ticket"
              label="Congratulatory Text"
              variant="outlined"
              error={validation.congratulatoryText}
              onChange={handleCongratulatoryTextInput}
              defaultValue={congratulatoryText}
              required
            />
            <FormHelperText>Will be displayed on the announcement graphic.</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={handleActive}
                  name="active"
                  color="primary"
                />
              }
              label="Active"
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
    </div>
  );

  return (
    <div>
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