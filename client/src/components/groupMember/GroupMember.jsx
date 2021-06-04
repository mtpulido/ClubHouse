import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./GroupMember.css"

const useStyles = makeStyles({
  large: {
    width: "50px",
    height: "50px",
  },
});

const GroupMember = (props) => {
  const classes = useStyles();
  const { member, roundsTimeframe, category } = props


  const handlePercent = (number) => {
    if (number < 1) {
      return (number*100).toFixed(2)+ "%"
    }
   return number
  }

  return (
    <div className="group-member-container">
      <div className="avatar-name-container">
    <div className="avatar">
      <Avatar
              src={`/uploads/users/${member?.avatar}`}
              alt={member.name}
        className={classes.large}
        />
        </div>
        <div className="leaderboard-name">{member?.displayName}</div>
        </div>
      <div className="leaderboard-number">{handlePercent(member?.[roundsTimeframe]?.[category])}</div>
      
    </div>
  )
};

export default GroupMember;
