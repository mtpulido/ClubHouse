import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a3a3a3",
      opacity: 0.3
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
      default: "#000410",
    },
    text: {
      primary: "#fafafa",
      secondary: "#b6b6b6",
    },
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#067fea",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ThemeProvider theme={theme}>
          <CssBaseline />
        <App />
        </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
