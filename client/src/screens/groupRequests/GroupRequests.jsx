import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./GroupRequests.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  large: {
    width: "50px",
    height: "50px",
  },
});

const GroupRequests = (props) => {
  const classes = useStyles();
  const { group, handleAdminResponse } = props;
  const [open, setOpen] = useState(false);

  const handleAccept = (id) => {
    const data = {
      userId: id,
      decision: "accept",
    };
    handleAdminResponse(group?._id, data);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleReject = (id) => {
    const data = {
      userId: id,
      decision: "reject",
    };
    handleAdminResponse(group?._id, data);
  };

  const requestsJSX = group?.requests?.map((request) => (
    <div className="group-member-container">
      <div className="avatar-name-container">
        <div className="avatar">
          <Avatar
            src={`/uploads/users/${request?.avatar}`}
            alt={request?.displayName.toUpperCase()}
            className={classes.large}
          />
        </div>
        <div className="leaderboard-name">{request?.displayName}</div>
      </div>
      <div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="add"
          onClick={() => handleAccept(request?.userId)}
        >
          <AddBoxIcon fontSize="large" color="primary" />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="delete"
          onClick={() => handleReject(request?.userId)}
        >
          <DeleteForeverIcon fontSize="large" style={{ fill: "#d12424" }} />
        </IconButton>
      </div>
    </div>
  ));

  return (
    <div className="group-request-container">
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity="success"
          style={{ width: "275px", display: "flex", justifyContent: "center" }}
        >
          New Member Accepted!
        </Alert>
      </Snackbar>
      <div className="requests-label">Requests:</div>
      {group?.requests?.length > 0 ? (
        <div>{requestsJSX}</div>
      ) : (
        <div
          className="leaderboard-name"
          style={{ padding: "5px 0 0 20px", color: "#b6b6b6" }}
        >
          - No open requests
        </div>
      )}
    </div>
  );
};

export default GroupRequests;
