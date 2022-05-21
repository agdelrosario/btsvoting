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

// const categories = [
//   "app",
//   "website",
// ]


function getStyles(name, award, theme) {
  return {
    fontWeight:
      award.indexOf(name) === -1
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

export default function AddVotings({open, submit, loadedData, closeModal, apps, awards, categories}) {
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
  });
  // const [awards, setAwards] = useState(null)
  const [app, setApp] = useState(loadedData?.app || null);
  const [category, setCategory] = useState(loadedData?.category || null);
  const [tutorialURL, setTutorialURL] = useState(loadedData?.tutorialURL || null);
  

  useEffect(() => {
    setName(loadedData?.name || null)
    setAward(loadedData?.award || null)
    setApp(loadedData?.app || null)
    setCategory(loadedData?.category || null)
    setDescription(loadedData?.description || null)
    setTutorialURL(loadedData?.tutorialURL || null)
    // setAwardType(loadedData?.awardKey || null)


    // const fetchAwardTypes = async () => {
    //   const res = await fetch(`/api/awards`);
    //   const json = await res.json();

    //   if (json) {
    //     setAwards(json);
    //   }
    
    // };

    // fetchAwardTypes();

    
  },[open, loadedData]);

  const handleClose = () => {
    // setOpen(false);
    setName(null);
    setAward(null);
    setCategory(null);
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
      category,
      description,
      tutorialURL,
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
              value={name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.award}>Award *</InputLabel>
              <Select
                native
                value={award}
                onChange={handleAwardChange}
                label="Award *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="Award"
                error={validation.award}
              >
                <option aria-label="None" value="" />
                {
                  !!awards && awards.map((value) => (
                    <option value={value.key} key={`award-type-${value.key}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.award}>App *</InputLabel>
              <Select
                native
                value={app}
                onChange={handleAppChange}
                label="App *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="App"
                error={validation.app}
              >
                <option aria-label="None" value="" />
                {
                  !!apps && apps.map((value) => (
                    <option value={value.key} key={`app-type-${value.key}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.award}>Category *</InputLabel>
              <Select
                native
                value={category}
                onChange={handleCategoryChange}
                label="Category *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="Category"
                error={validation.category}
              >
                <option aria-label="None" value="" />
                {
                  !!categories && categories.map((value) => (
                    <option value={value.key} key={`app-type-${value.key}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              className="ticket"
              label="Description"
              variant="outlined"
              error={validation.description}
              onChange={handleDescriptionInput}
              value={description}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              className="ticket"
              label="Tutorial URL (optional)"
              variant="outlined"
              error={validation.tutorialURL}
              onChange={handleTutorialURLInput}
              value={tutorialURL}
              // required
            />
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