import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./CreateGroup.css"

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
      fontSize: "16px",
    },
  },
}));

const CreateGroup = (props) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const [newGroup, setNewGroup] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePhoto = (event) => {
    setNewGroup((prevState) => ({
      ...prevState,
      avatar: event.target.files[0]
   })) 
  };



  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()

    formData.append("name", newGroup.name)
    formData.append("avatar", newGroup.avatar)

    props.handlePostGroup(formData)
  }
  
  return (
    <div style={{maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="create-group-form"
      >
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
          Choose Photo
        </Button>
      </label>
        {newGroup?.avatar ? <div style={{ marginBottom: "5px", alignSelf: "center" }}>{newGroup?.avatar?.name}</div> : null}

      <div className="text-field-stepper" style={{alignSelf: "center"}}>
        <TextField
          label="Group Name*"
          id="Group Name"
          variant="outlined"
          placeholder="The Golfers"
          name="name"
          value={newGroup.name}
            className={formClasses.root}
            style={{ width: "275px" }}
          onChange={handleChange}
          autoComplete="off"
          helperText={props.entryError}
          error={props.entryError?.length > 0 ? true : false}
        />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // size="large"
          disabled={props.currentUser?.displayName?.length > 0 ? false : true}
          className={classes.root}
          style={{width: "275px"}}
        >
          Submit
        </Button>
        </form>
    </div>
  );
};

export default CreateGroup;
