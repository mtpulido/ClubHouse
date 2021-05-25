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
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1e2124",
    color: "white",
    transition: ".18s",
  },
  root1: {
    backgroundColor: "#363b40",
    color: "white",
    transition: ".12s",
  },
  large: {
    width: "50px",
    height: "50px",
  },
});

const NavBar = (props) => {
  const { open, setOpen, currentUser } = props;
  const classes = useStyles();
  let { pathname } = useLocation();
  const history = useHistory();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="nav-container">
      <div className="nav-bar">
        <AppBar
          position="static"
          className={open ? classes.root1 : classes.root}
        >
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
              <span onClick={scrollToTop}>ClubHouse</span>
              <GolfCourseIcon />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={open ? "burger-open" : "burger-closed"}>
        <div className="menu-header">
          <div className="menu-menu">Menu</div>
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
        <div className="menu-user">
          <div className="menu-user-icons">
            <Avatar
              alt={currentUser?.displayName}
              src="/broken-image.jpg"
              className={classes.large}
            />
            <div className="menu-display-name">{currentUser?.displayName}</div>
          </div>
          <div className="menu-rounds">
            <CreateIcon fontSize="small"/> {currentUser?.recentRounds.length} Posted Rounds</div>
        </div>
        <div className="menu-links">
        <Button
        className={classes.button}
            startIcon={<DashboardIcon style={{ height: "28px", width: "28px" }}/>}
            style={{ marginBottom: "10px", fontSize: "18px"}}
      >
            Dashboard
      </Button>
      <Button
        className={classes.button}
            startIcon={<GroupIcon style={{ height: "28px", width: "28px" }}/>}
            style={{ marginBottom: "10px", fontSize: "18px"}}
      >
            Groups
      </Button>
          <div className="menu-groups"></div>{/* GROUPS GO HERE */}
          <Button
        className={classes.button}
            startIcon={<GroupAddIcon style={{ height: "28px", width: "28px" }}/>}
            style={{ marginBottom: "10px", fontSize: "18px"}}
      >
            New Group
      </Button>
      <Button
        className={classes.button}
            startIcon={<SettingsIcon style={{ height: "28px", width: "28px" }}/>}
            style={{ marginBottom: "10px", fontSize: "18px"}}
      >
            Settings
      </Button>
        </div>
      </div> 

      <div className={open ? "children-open" : "children-closed"}>
        {props.children}
      </div>
    </div>
  );
};

export default NavBar;
