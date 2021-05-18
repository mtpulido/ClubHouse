import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SignUp.css";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E4E4E4",
      opacity: 0.4
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1
    },
    "& .MuiButton-label": {
      color: "white",
      fontSize: "16px"
    }
  },
});

const SignUp = (props) => {
  const classes = useStyles();
  const [signUpCredentials, setSignUpCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setSignUpCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="screen-container">
      <form
        className="auth-form"
        onSubmit={(e) => {
          setPasswordError("");
          props.setCredentialsError([])
          if (confirmPassword === signUpCredentials.password) {
            e.preventDefault();
            props.handleSignUp(signUpCredentials);
          }
          if (confirmPassword !== signUpCredentials.password) {
            e.preventDefault();
            setPasswordError("Passwords do not match");
          }
        }}
      >
        <div className="auth-form-label">Create Your Account</div>
  
          <TextField
            id="outlined-basic"
            label="Display Name"
            id="display name"
            variant="outlined"
            placeholder="Mike"
            name="displayName"
            value={signUpCredentials.displayName}
            className={classes.root}
            onChange={handleChangeSignUp}
            autoComplete='off'
          />
          <TextField
            id="outlined-basic"
            id="email"
            label="Email"
            variant="outlined"
            placeholder="example@email.com"
            name="email"
            className={classes.root}
            value={signUpCredentials.email}
            onChange={handleChangeSignUp}
            autoComplete='off'
          />
          <TextField
            id="outlined-basic"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            placeholder="password"
            name="password"
            className={classes.root}
            value={signUpCredentials.password}
            onChange={handleChangeSignUp}
          />
          <TextField
            id="outlined-basic"
            id="confirm password"
            label="confirm password"
            variant="outlined"
            type="password"
            placeholder="password"
            name="confirmPassword"
            className={classes.root}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {passwordError ? (
            <div className="auth-errors">{passwordError}</div>
          ) : null}

          {props.credentialsError?.map((error) => (
            <div className="auth-errors">{error}</div>
          ))}

          <Button variant="contained" color="primary" type="submit" size="large" className={classes.root}>
            Sign Up
          </Button>
      </form>
    </div>
  );
};

export default SignUp;
