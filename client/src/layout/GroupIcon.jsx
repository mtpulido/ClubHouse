import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import "./NavBar.css";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import "./Burger.css";
import StarIcon from "@material-ui/icons/Star";
import Badge from "@material-ui/core/Badge";

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

const GroupMenu = (props) => {
  const classes = useStyles();
  const { open, group, setOpen, currentUser, windowDimensions } = props;
  const { pathname } = useLocation();
  const history = useHistory();

  const membersJSX = group?.members?.map((member) => (
    <div className="members-menu">
      <div className="avatar">
        <Avatar
          src={`/uploads/users/${member?.avatar}`}
          alt={member?.displayName?.toUpperCase()}
          className={classes.large}
        />
      </div>
      {member._id === group.admin.id ? (
        <StarIcon
          style={{
            fill: "gold",
            alignSelf: "flex-start",
            marginTop: "3px",
            marginRight: "-24px",
          }}
        />
      ) : null}
      <div className="members-name">{member?.displayName}</div>
    </div>
  ));
  
  return (
    <div>
      {group && pathname !== "/group/find/group" && pathname !== "/group/new/group"?
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
          {currentUser?._id === group?.admin?.id ? (
            <div className="admin-settings-group">
              <Badge
                color="primary"
                badgeContent={group?.requests?.length}
                classes={{ badge: classes.customBadge }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/group/requests/${group?._id}`)}
                  size="small"
                  style={{ height: "40px" }}
                >
                  Requests
              </Button>
              </Badge>
              <IconButton
                // edge="start"
                color="primary"
                aria-label="settings"
                onClick={() => history.push(`/group/settings/${group?._id}`)}
              >
                <SettingsIcon fontSize="large" color="primary" />
              </IconButton>
            </div>
          ) : null}

          <div className="group-burger-menu">
            <div className="avatar">
              <Avatar
                src={`/uploads/groups/${group?.avatar}`}
                alt={group?.name}
                className={classes.large}
                style={{ marginTop: "10px" }}
              />
            </div>
            <div className="group-name">{group?.members?.length} Members</div>
          </div>
          {windowDimensions.width >= 1200 ? <div className="side-bar-group-name">{group?.name}</div> : null}
          {membersJSX}
        </div> : null
        // <div className={open ? "group-burger-open" : "group-burger-closed"}>
        //   <div className="group-placeholder">Group Menu</div>
        // </div>
      }
    </div>
  );
};

export default GroupMenu;
