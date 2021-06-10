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
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import GroupMenu from "./GroupIcon";
import Badge from "@material-ui/core/Badge";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

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
  customBadge: {
    backgroundColor: "#b82828",
    color: "white",
    marginTop: "3px",
  },
});

const NavBar = (props) => {
  const { open, setOpen, currentUser, group } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [openGroupSettings, setOpenGroupSettings] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (currentUser) {
      setGroups(currentUser.groups);
    }
    if (
      pathname.startsWith("/group/requests") ||
      pathname.startsWith("/group/settings")
    ) {
      setOpenGroupSettings(false);
    }
    if (pathname.startsWith("/user/settings")) {
      setOpen(false);
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentUser, pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleGroupOpen = (id) => {
    history.push(`/group/${id}`);
  };

  const groupJSX = groups?.map((group, index) => (
    <div className="group-menu" onClick={() => handleGroupOpen(group._id)}>
      <div className="avatar">
          <Avatar
            src={`/uploads/groups/${group?.avatar}`}
            alt={group?.name?.toUpperCase()}
            className={classes.large}
          />
      </div>
      <div className="group-name">{group.name}</div>
    </div>
  ));

  console.log(windowDimensions)

  return (
    <div className="nav-container">

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
              src={`/uploads/users/${currentUser?.avatar}`}
              alt={currentUser?.displayName?.toUpperCase()}
              className={classes.large}
            />
            <div className="menu-display-name">{currentUser?.displayName}</div>
          </div>
          <div className="menu-rounds">
            <CreateIcon fontSize="small" /> {currentUser?.recentRounds?.length}{" "}
            Posted Rounds
          </div>
        </div>
        <div className="menu-links">
          <Button
            className={classes.button}
            startIcon={
              <DashboardIcon style={{ height: "28px", width: "28px" }} />
            }
            style={{ marginBottom: "10px", fontSize: "18px" }}
            onClick={() => history.push("/user/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className={classes.button}
            startIcon={<GroupIcon style={{ height: "28px", width: "28px" }} />}
            style={{ marginBottom: "10px", fontSize: "18px" }}
          >
            Groups
          </Button>
          <div className="menu-groups">{groupJSX}</div>

          <Button
            className={classes.button}
            startIcon={<SearchIcon style={{ height: "28px", width: "28px" }} />}
            style={{ marginBottom: "10px", fontSize: "18px" }}
            onClick={(e) =>
              setTimeout(() => history.push("/group/find/group"), 120)
            }
          >
            Find Group
          </Button>
          <Button
            className={classes.button}
            startIcon={
              <GroupAddIcon style={{ height: "28px", width: "28px" }} />
            }
            style={{ marginBottom: "10px", fontSize: "18px" }}
            onClick={() =>
              setTimeout(() => history.push("/group/new/group"), 120)
            }
          >
            New Group
          </Button>
          <Button
            className={classes.button}
            startIcon={
              <SettingsIcon style={{ height: "28px", width: "28px" }} />
            }
            style={{ marginBottom: "110px", fontSize: "18px" }}
            onClick={(e) =>
              setTimeout(() => history.push("/user/settings"), 120)
            }
          >
            Settings
          </Button>
        </div>
      </div>
      <div className="middle column">
      <div className="nav-bar">
        <AppBar
          position="static"
          className={open || openGroupSettings ? classes.root1 : classes.root}
        >
          <Toolbar>
            {pathname === "/user/dashboard" && windowDimensions.width <= "1200" ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(e) => setOpen((curr) => !curr)}
              >
                <div className="menu-icon-button"><MenuIcon fontSize="large" color="primary" /></div>
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
            {pathname.startsWith("/group") &&
            pathname !== "/group/new/group" &&
            pathname !== "/group/find/group" &&
            !pathname.startsWith("/group/requests") &&
            !pathname.startsWith("/group/settings") && windowDimensions.width <= "1200" ? (
              <div className="group-button-nav">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={(e) => setOpenGroupSettings((curr) => !curr)}
                >
                  <Badge
                    badgeContent={group?.requests?.length}
                    classes={{ badge: classes.customBadge }}
                  >
                    <GroupIcon fontSize="large" color="primary" />
                  </Badge>
                </IconButton>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </div>


      <div
        className={
          open || openGroupSettings ? "children-open" : "children-closed"
        }
      >
        {props.children}
        </div>
        
      </div>
      
      <GroupMenu
        open={openGroupSettings}
        group={group}
        setOpen={setOpenGroupSettings}
        currentUser={currentUser}
        windowDimensions={windowDimensions}
      />
    </div>
  );
};

export default NavBar;
