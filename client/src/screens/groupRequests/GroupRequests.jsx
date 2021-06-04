import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./GroupRequests.css"
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  large: {
    width: "50px",
    height: "50px",
  },
});

const GroupRequests = (props) => {
  const classes = useStyles()
  const { group, handleAdminResponse } = props

  const handleAccept = (id) => {
    const data = {
      userId: id,
      decision: "accept"
    }
    handleAdminResponse(group?._id, data)
  }
  
  const handleReject = (id) => {
    const data = {
      userId: id,
      decision: "reject"
    }
    handleAdminResponse(group?._id, data)
  }
  
  
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
          <DeleteForeverIcon fontSize="large" style={{ fill: "#d12424" }}/>
        </IconButton>
        </div>
    </div>
  ))

  return (
    <div className="group-request-container">
      {requestsJSX}
    </div>
  )
}

export default GroupRequests
