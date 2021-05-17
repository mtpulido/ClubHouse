import React from "react";
import Carousel from "../../components/carousel/Carousel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SignIn.css";
import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a3a3a3",
      opacity: 0.4
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1
    },
  },
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#000b23",
    },
    text: {
      primary: "#fafafa",
      secondary: "#a3a3a3",
    },
    primary: {
      main: "#4CAF50",
      text: "#fffff",
    },
    secondary: {
      main: "#004eeb",
    },
  },
});

const SignIn = (props) => {
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
    <div className="landing-container">
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TextField
            id="outlined-basic"
            label="Display Name"
            id="display name"
            size="small"
            variant="outlined"
            placeholder="Mike"
            name="displayName"
            value={signUpCredentials.displayName}
            className={classes.root}
            onChange={handleChangeSignUp}
          />
          <TextField
            id="outlined-basic"
            id="email"
            size="small"
            label="Email"
            variant="outlined"
            placeholder="example@email.com"
            name="email"
            className={classes.root}
            value={signUpCredentials.email}
            onChange={handleChangeSignUp}
          />
          <TextField
            id="outlined-basic"
            id="password"
            size="small"
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
            size="small"
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

          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default SignIn;
