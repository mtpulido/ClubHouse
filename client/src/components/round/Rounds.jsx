import React from "react";
import Button from "@material-ui/core/Button";
import "./Round.css"

const Rounds = (props) => {
  const { id, score, course, open } = props;
  return (
    <div className="one-round">
      <div className="round-row">
        <div className="round-course">{course}</div>
        <div className="round-icon">🔥</div>
      </div>
      <div className="round-row">
        <div className="round-score">{score}</div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          disabled={open}
          // onClick={}
          // className={classes.button}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Rounds;
