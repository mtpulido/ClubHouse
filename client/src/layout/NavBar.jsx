import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";
import CloseIcon from "@material-ui/icons/Close";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1e2124",
    color: "white"
    },
});

const NavBar = (props) => {
  const { open, setOpen } = props;
  const classes = useStyles();
  let { pathname } = useLocation();
  const history = useHistory();
  
  return (
    <div className="nav-container">
      <div className={open ? "nav-bar-open" : "nav-bar"}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            {pathname === "/user/dashboard" ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(e) => setOpen((curr) => !curr)}
              >
                <MenuIcon fontSize="large" color="primary" />
              </IconButton>
            ) : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(e) => setTimeout(() => history.goBack(), 120)}
              >
                <ArrowBackIcon fontSize="large" color="primary" />
              </IconButton>
            )}

            <Typography variant="h5">
              <span>ClubHouse</span>
              <GolfCourseIcon />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={open ? "burger-open" : "burger-closed"}>
        <div className={open ? "burger-button-open" : "burger-button-closed"}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            disabled={!open}
            onClick={(e) => setOpen((curr) => !curr)}
          >
            <CloseIcon fontSize="large" color="primary" />
          </IconButton>
        </div>
      </div>

      <div className={open ? "children-open" : "children-closed"}>
        {props.children}
      </div>
    </div>
  );
};

export default NavBar;
