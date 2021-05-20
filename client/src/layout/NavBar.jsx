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
import { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    ".MuiAppBar-colorPrimary": {
      backgroundColor: "#000410",
    },
  },
});

const NavBar = (props) => {
  const { open, setOpen } = props;
  const classes = useStyles();
  let { pathname } = useLocation();
  const history = useHistory();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let newArray = urls.slice();
    if (newArray[newArray.length - 1] === pathname) {
      return null;
    }
    newArray.push(pathname);
    setUrls(newArray);
  }, [pathname]);

  const handleBack = () => {
    history.push(urls[urls.length - 2]);
    let newArray = urls.slice();
    newArray.pop();
    setUrls(newArray);
  };

  console.log(pathname);
  console.log(urls);

  return (
    <div className="nav-container">
      <div className={open ? "nav-bar-open" : "nav-bar"}>
        <AppBar position="static" color="secondary">
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
                onClick={
                  urls.length < 2
                    ? (e) => history.push("/user/dashboard")
                    : handleBack
                }
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
