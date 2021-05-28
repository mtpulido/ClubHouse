import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

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

const NewGroup = (props) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const [newGroup, setNewGroup] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <form>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        name="avatar"
        type="file"
        onChange={handleChange}
        value={newGroup.avatar}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <div>{newGroup.avatar}</div>

      <div className="text-field-stepper">
        <TextField
          label="Group Name*"
          id="Group Name"
          variant="outlined"
          placeholder="The Golfers"
          name="name"
          value={newGroup.name}
          className={formClasses.root}
          onChange={handleChange}
          autoComplete="off"
          // helperText={props.entryError[3]}
          // error={props.entryError[3] ? true : false}
        />
        </div>
        </form>
    </div>
  );
};

export default NewGroup;
