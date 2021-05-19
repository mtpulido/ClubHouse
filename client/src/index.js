import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#fafafa",
      secondary: "#b6b6b6",
    },
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#000410",
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
