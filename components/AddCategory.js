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

export default function AddCategory({open, submit, loadedData, closeModal}) {
  const labelRef = useRef()
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
  const classes = useStyles();
  const theme = useTheme();
  const lowerThanSm = useMediaQuery(theme.breakpoints.down('xs'));
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = useState(getModalStyle(lowerThanSm));
  const [name, setName] = useState(loadedData?.name || null);
  const [categoryType, setCategoryType] = useState(loadedData?.categoryType || null);
  const [categoryTypeKey, setCategoryTypeKey] = useState(loadedData?.categoryTypeKey || null);
  const [validation, setValidation] = useState({
    name: null,
    categoryType: null,
  });
  const [categoryTypes, setCategoryTypes] = useState(null)

  useEffect(() => {
    setName(loadedData?.name || null)
    // setCategoryType(loadedData?.categoryType || null)
    setCategoryType(loadedData?.categoryTypeKey || null)


    const fetchCategoryTypes = async () => {
      const res = await fetch(`/api/category-types`);
      const json = await res.json();

      if (json) {
        setCategoryTypes(json);
      }
    };

    fetchCategoryTypes();

    
  },[open, loadedData]);

  const handleClose = () => {
    // setOpen(false);
    setName(null);
    setCategoryType(null);
    setValidation({
      name: null,
      categoryType: null,
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
      categoryType: null,
    }

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
      edit: !!loadedData
    });
    
    handleClose();
  }

  const handleCategoryTypeChange = (event) => {
    let val = event.target.value
    setCategoryType(val);

    let error = validation.categoryType
    if (error && val != null && val != '') {
      error = false
    }

    setValidation({
      ...validation,
      categoryType: error
    });
  };


  const body = (
    <div style={modalStyle} className="modal-style">
      <div className="modal-main">
        <Grid container alignItems="flex-end" style={{marginBottom: '20px'}}>
          <Grid item xs><h2 id="simple-modal-title">New Category</h2></Grid>
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
              <InputLabel ref={labelRef} htmlFor="my-input" error={validation.categoryType}>Type *</InputLabel>
              <Select
                native
                value={categoryType}
                onChange={handleCategoryTypeChange}
                label="Type *"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
                defaultValue="Type"
                error={validation.categoryType}
              >
                <option aria-label="None" value="" />
                {
                  !!categoryTypes && categoryTypes.map((value) => (
                    <option value={value.key} key={`category-type-${value.key}`} label={value.name}>{value.name}</option>
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