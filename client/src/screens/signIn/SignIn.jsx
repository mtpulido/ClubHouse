import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SignIn.css";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const SignIn = (props) => {
  const classes = useStyles();
  const [signInCredentials, setSignInCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChangeSignIn = (event) => {
    const { name, value } = event.target;
    setSignInCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    props.setCredentialsError([]);
    props.handleSignIn(signInCredentials);
  };

  return (
    <div className="screen-container">
      <form className="auth-form-sign-in" onSubmit={handleSubmit}>
        <div className="auth-form-label">Sign In</div>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          placeholder="example@email.com"
          name="email"
          className={classes.root}
          value={signInCredentials.email}
          onChange={handleChangeSignIn}
          autoComplete="off"
          helperText={props.credentialsError[1]}
          error={props.credentialsError[1] ? true : false}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="password"
          name="password"
          className={classes.root}
          value={signInCredentials.password}
          onChange={handleChangeSignIn}
          helperText={props.credentialsError[2]}
          error={props.credentialsError[2] ? true : false}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          className={classes.root}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
