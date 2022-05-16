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
  "app",
  "website",
]


function getStyles(name, awardType, theme) {
  return {
    fontWeight:
      awardType.indexOf(name) === -1
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

export default function AddAward({open, submit, loadedData, closeModal}) {
  const labelRef = useRef()
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
  const classes = useStyles();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = useState(getModalStyle(lowerThanSm));
  const [name, setName] = useState(loadedData?.name || null);
  const [awardType, setAwardType] = useState(loadedData?.awardType || null);
  const [awardTypeKey, setAwardTypeKey] = useState(loadedData?.awardTypeKey || null);
  const [validation, setValidation] = useState({
    name: null,
    awardType: null,
  });
  const [awardTypes, setAwardTypes] = useState(null)

  useEffect(() => {
    setName(loadedData?.name || null)
    // setAwardType(loadedData?.awardType || null)
    setAwardType(loadedData?.awardTypeKey || null)


    const fetchAwardTypes = async () => {
      const res = await fetch(`/api/award-types`);
      const json = await res.json();

      if (json) {
        setAwardTypes(json);
      }
    };

    fetchAwardTypes();

    
  },[open, loadedData]);

  const handleClose = () => {
    // setOpen(false);
    setName(null);
    setAwardType(null);
    setValidation({
      name: null,
      awardType: null,
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

  const handleSubmit = () => {
    let tempValidation = {
      name: null,
      awardType: null,
    }

    if (name == null || name == '') {
      tempValidation.name = true
    }

    if (awardType == null || awardType.length == 0) {
      tempValidation.awardType = true
    }

    setValidation(tempValidation);

    if (tempValidation.name || tempValidation.awardType) {
      return null;
    }

    submit({
      name,
      awardType,
      edit: !!loadedData
    });
    
    handleClose();
  }

  const handleAwardTypeChange = (event) => {
    let val = event.target.value
    setAwardType(val);

    let error = validation.awardType
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      awardType: error
    });
  };


  const body = (
    <div style={modalStyle} className="modal-style">
      <div className="modal-main">
        <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
          <Grid item xs><h2 id="simple-modal-title">New Award</h2></Grid>
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
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.awardType}>Type *</InputLabel>
              <Select
                native
                value={awardType}
                onChange={handleAwardTypeChange}
                label="Type *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="Type"
                error={validation.awardType}
              >
                <option aria-label="None" value="" />
                {
                  !!awardTypes && awardTypes.map((value) => (
                    <option value={value.key} key={`award-type-${value.key}`} label={value.name}>{value.name}</option>
                  ))
                }
              </Select>
            </FormControl>
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