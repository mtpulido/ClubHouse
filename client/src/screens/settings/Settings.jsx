import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Settings.css";

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
      // width: "250px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1,
      // width: "250px",
    },
    "& .MuiButton-label": {
      color: "black",
      fontSize: "18px",
    },
  },
}));

const Settings = (props) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const {
    handleSignOut,
    currentUser,
    setEntryError,
    entryError,
    snackBar,
    handleEditSettings,
  } = props;
  const [userSettings, setUserSettings] = useState({
    displayName: "",
    avatar: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setEntryError([]);
    window.scrollTo({
      top: 0,
      left: 0,
    });
    if (currentUser) {
      setUserSettings({
        displayName: currentUser?.displayName,
        avatar: currentUser?.avatar,
      });
    }
    if (currentUser?.displayName?.length > 0) {
      setDisabled(false);
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePhoto = (event) => {
    setUserSettings((prevState) => ({
      ...prevState,
      avatar: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("displayName", userSettings.displayName);
    formData.append("avatar", userSettings.avatar);

    handleEditSettings(formData);
  };

  return (
    <div className="settings-container">
      <Snackbar
        open={snackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          style={{ width: "275px", display: "flex", justifyContent: "center" }}
        >
          Settings Succesfully Updated!
        </Alert>
      </Snackbar>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="create-group-form"
      >
        {/* <div style={{ alignSelf: "center" }}>
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
        </div> */}
        <div style={{ marginBottom: "5px", alignSelf: "center" }}>
          {userSettings?.avatar?.name}
        </div>
        <div className="text-field-stepper" style={{ alignSelf: "center" }}>
          <TextField
            label="Display Name*"
            id="Display Name"
            variant="outlined"
            placeholder="enter new name"
            name="displayName"
            value={userSettings?.displayName}
            className={formClasses.root}
            onChange={handleChange}
            style={{ width: "275px" }}
            autoComplete="off"
            helperText={entryError}
            error={entryError?.length > 0 ? true : false}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // size="large"
          className={formClasses.root}
          disabled={disabled}
          style={{ width: "275px", marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
      <div className="sign-out">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => handleSignOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
