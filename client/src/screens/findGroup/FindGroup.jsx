import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import "./FindGroup.css";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E4E4E4",
      opacity: 0.4,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1,
    },
    "& .MuiButton-label": {
      color: "black",
      fontSize: "16px",
    },
  },
});

const FindGroup = (props) => {
  const {
    handleGetGroups,
    entryError,
    findGroup,
    handleRequestGroup,
    currentUser,
    toggleFetch
  } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (formData.name) {
      handleGetGroups(formData)
    }
  }, [toggleFetch])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetGroups(formData);
  };

  const checkIfRequested = (group) => {
    let isRequested = false
    group.requests.map((request) => {
      if (request.userId === currentUser._id) {
        return isRequested = true
      } 
    })
    group.members.map((member) => {
      if (member === currentUser._id) {
        return isRequested = true
      } 
    })
    return isRequested
  }

  const onJoinClick = (groupId) => {
    handleRequestGroup(groupId)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 3200)
  }

  const groupsJSX = findGroup?.map((group) => (
    <div className="searched-group-container">
      <div className="avatar">
        <Avatar
          src={`/uploads/groups/${group.avatar}`}
          alt={group.name}
          className={classes.large}
        />
      </div>
      <div className="name-member-group">
        <div className="name-group-text">{group.name}</div>
        <div className="name-member-text">Members: {group.members.length}</div>
      </div>
      <div>
        {group.isOpen ? (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onJoinClick(group._id)}
            disabled={checkIfRequested(group)}
          >
            Join
          </Button>
        ) : null}
      </div>
    </div>
  ));

  return (
    <div className="find-group-container">
      <div className="snackbar-container">
        <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert severity="success"
          style={{ width: "275px", display: "flex", justifyContent: "center" }}
        >
          Request Sent!
        </Alert>
        </Snackbar>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <TextField
            variant="outlined"
            id="find group"
            name="name"
            label="Find Group"
            placeholder="Enter Group name"
            className={classes.root}
            style={{ width: "275px"}}
            value={formData.name}
            autoComplete="off"
            onChange={handleChange}
            helperText={entryError}
            error={entryError?.[0] ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          style={{ width: "275px", marginTop: "20px" }}
          className={classes.root}
        >
          Find Group
        </Button>
      </form>
      {groupsJSX}
    </div>
  );
};

export default FindGroup;
