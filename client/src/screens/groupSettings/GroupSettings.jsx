import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./GroupSettings.css";
import Avatar from "@material-ui/core/Avatar";
import { useParams, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const useFormStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E4E4E4",
      opacity: 0.4,
      width: "250px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1,
      width: "250px",

    },
    "& .MuiButton-label": {
      color: "black",
      fontSize: "16px",
    },
  },
}));

const GroupSettings = (props) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const { group, handleEditGroupSettings } = props;
  const [isOpen, setIsOpen] = useState(group?.isOpen);
  const [groupSettings, setGroupSettings] = useState({
    name: "",
    avatar: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    if (group) {
      setGroupSettings({
        name: group?.name,
        avatar: group?.avatar,
      });
    }
    if (group?.name?.length > 0) {
      setDisabled(false);
    }
  }, [group]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePhoto = (event) => {
    setGroupSettings((prevState) => ({
      ...prevState,
      avatar: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", groupSettings.name);
    formData.append("avatar", groupSettings.avatar);
    formData.append("isOpen", isOpen);

    handleEditGroupSettings(id, formData);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <div>
      <Snackbar open={open}>
        <Alert
          severity="success"
          style={{
            position: "fixed",
            top: "0",
            width: "90vw",
            marginTop: "3px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Group Succesfully Updated!
        </Alert>
      </Snackbar>
      <form
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className="update-group-form"
      >
        <div style={{alignSelf: "center",}}>
          <input
            accept="image/*"
            className={classes.input}
            id="avatar"
            name="avatar"
            type="file"
            onChange={handleChangePhoto}
          />
          <label htmlFor="avatar">
            <Button variant="outlined" color="primary" component="span">
              Choose New Photo
            </Button>
          </label>
        </div>
          <div style={{ marginBottom: "5px", alignSelf: "center"}}>{groupSettings?.avatar?.name}</div>
        <div className="text-field-stepper" style={{alignSelf: "center", paddingRight: "50px"}}>
          <TextField
            label="Group Name*"
            id="Group Name"
            variant="outlined"
            placeholder="The Golfers"
            name="name"
            value={groupSettings?.name}
            className={formClasses.root}
            onChange={handleChange}
            autoComplete="off"
            // helperText={props.entryError[3]}
            // error={props.entryError[3] ? true : false}
          />
          </div>
          <div style={{alignSelf: "center"}}>
            <FormControlLabel
              label="Join Requests:"
              labelPlacement="start"
              control={
                <Switch
                  checked={isOpen}
                  onChange={() => setIsOpen((curr) => !curr)}
                  name="isOpen"
                  color="primary"
                />
              }
            />
          </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // size="large"
          className={classes.root}
          disabled={disabled}
          style={{width: "250px"}}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GroupSettings;
