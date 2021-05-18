import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Landing.css";
import golfPhoto from "../../golfPhoto.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiButton-label": {
      color: "white",
      fontSize: "16px"
    }
  },
})

const Landing = () => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className="screen-container">
      <div className="landing-container">
        <div className="landing-label">ClubHouse</div>
        <div className="landing-caption">
          Improve your game, beat your friends.
        </div>
        <img src={golfPhoto} alt="golf photo" />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={true}
          className={classes.root}
        >
          Sign In
        </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={true}
          className={classes.root}
          onClick={(e) => setTimeout(() => history.push("/sign-up"), 190)}
          >
            Sign Up
          </Button>
      </div>
    </div>
  );
};

export default Landing;
