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
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from "react"
import "./Burger.css"
import StarIcon from '@material-ui/icons/Star';

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

const GroupMenu = (props) => {
  const classes = useStyles();
  const { open, group, setOpen, currentUser } = props
  
  const membersJSX = group?.members?.map((member) => (
    <div className="members-menu">
      <div className="avatar">
      <Avatar
              src={`/uploads/users/${member.avatar}`}
              alt={member.name}
        className={classes.large}
        />
        </div>
      {member._id === group.admin.id ? <StarIcon style={{fill: "gold", alignSelf: "flex-start", marginTop: "3px"}}/> : null}
      <div className = "members-name">{member.displayName}</div>
    </div>
  ))
  return (
    <div>
      <div className={open ? "group-burger-open" : "group-burger-closed"}>
      <div className="menu-header">
          <div className="header-group-name">{group?.name}</div>
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

        <div className="group-burger-menu">
        <div className="avatar">
      <Avatar
              src={`/uploads/groups/${group?.avatar}`}
              alt={group?.name}
          className={classes.large}
          style={{ marginTop: "10px"}}
            />
            </div>
          <div className="group-name">{group?.members?.length} Members</div>
      </div>  
        {membersJSX}
      </div>
    </div>
  )
}

export default GroupMenu
