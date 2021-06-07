import React from "react";
import Button from "@material-ui/core/Button";
import "./Round.css";
import { useHistory } from "react-router-dom";

const Rounds = (props) => {
  const { id, score, course, open } = props;
  const history = useHistory();
  return (
    <div className="one-round">
      <div className="round-row">
        <div className="round-course">{course}</div>
      </div>
      <div className="round-row">
        <div className="round-score">{score}</div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          disabled={open}
          onClick={(e) =>
            setTimeout(() => history.push(`/user/round/${id}`), 120)
          }
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Rounds;
