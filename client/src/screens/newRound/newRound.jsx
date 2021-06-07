import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./NewRound.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#1e2124",
  },
  button: {
    width: "100px",
    marginRight: "20px",
  },
  actionsContainer: {
    marginBottom: theme.spacing(0),
  },
  step_label_root: {
    fontSize: "25px",
  },
  stepContent: {
    // display: "flex !important",
    // flexDirection: "column !important",
    // justifyContent: "space-evenly !important"
  },
}));

const useIconStyles = makeStyles((theme) => ({
  root: {
    color: "#a3a3a3",
    fontSize: "30px",
  },
}));

const useFormStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E4E4E4",
      opacity: 0.4,
      width: "250px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4CAF50",
      opacity: 1,
      width: "250px",
    },
    "& .MuiButton-label": {
      color: "black",
      fontSize: "16px",
    },
  },
}));

const NewRound = (props) => {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const formClasses = useFormStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [newRound, setNewRound] = useState({
    course: "",
    par: "",
    holes: "",
    score: "",
    fairwaysHit: "",
    possibleFairways: "",
    putts: "",
    greens: "",
    upAndDowns: "",
    possibleUpAndDowns: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [])

  const handleChangeRound = (event) => {
    const { name, value } = event.target;
    setNewRound((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeRoundNumber = (event) => {
    const { name, value } = event.target;
    setNewRound((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    props.handlePostRound(newRound);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  return (
    <div className="new-round-container">
      <form onSubmit={handleSubmit}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.root}
        >
          <Step key="1" className={classes.stepContent}>
            <StepLabel
              StepIconProps={{ classes: { root: iconClasses.root } }}
              classes={
                activeStep === 0 ? { label: classes.step_label_root } : {}
              }
              error={props.isError ? true : false}
            >
              Round Info
            </StepLabel>
            <StepContent className={classes.stepContent}>
              <div className="step-one-container">
                <div className="text-field-stepper">
                  <TextField
                    label="Golf Course*"
                    id="Golf Course"
                    variant="outlined"
                    placeholder="Augusta National"
                    name="course"
                    value={newRound.course}
                    className={formClasses.root}
                    onChange={handleChangeRound}
                    autoComplete="off"
                    helperText={props.entryError[3]}
                    error={props.entryError[3] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Par"
                    label="Par*"
                    variant="outlined"
                    placeholder="72"
                    name="par"
                    type="number"
                    className={formClasses.root}
                    value={newRound.par}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[4]}
                    error={props.entryError[4] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Holes Played"
                    label="Holes Played*"
                    variant="outlined"
                    placeholder="18"
                    name="holes"
                    type="number"
                    className={formClasses.root}
                    value={newRound.holes}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[5]}
                    error={props.entryError[5] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Score"
                    label="Score*"
                    variant="outlined"
                    placeholder="88"
                    name="score"
                    type="number"
                    className={formClasses.root}
                    value={newRound.score}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[6]}
                    error={props.entryError[6] ? true : false}
                  />
                </div>

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key="2">
            <StepLabel
              StepIconProps={{ classes: { root: iconClasses.root } }}
              classes={
                activeStep === 1 ? { label: classes.step_label_root } : {}
              }
            >
              Long Game
            </StepLabel>
            <StepContent>
              <div className="step-two-container">
                <div className="text-field-stepper">
                  <TextField
                    label="Fairways Hit"
                    id="Fairways Hit"
                    variant="outlined"
                    placeholder="8"
                    name="fairwaysHit"
                    type="number"
                    value={newRound.fairwaysHit}
                    className={formClasses.root}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[7]}
                    error={props.entryError[7] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Possible Fairways"
                    label="Possible Fairways"
                    variant="outlined"
                    placeholder="14"
                    type="number"
                    name="possibleFairways"
                    className={formClasses.root}
                    value={newRound.possibleFairways}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[8]}
                    error={props.entryError[8] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Greens in Regulation"
                    label="Greens in Regulation"
                    variant="outlined"
                    placeholder="7"
                    type="number"
                    name="greens"
                    className={formClasses.root}
                    value={newRound.greens}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[9]}
                    error={props.entryError[9] ? true : false}
                  />
                </div>

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      size="large"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key="3">
            <StepLabel
              StepIconProps={{ classes: { root: iconClasses.root } }}
              classes={
                activeStep === 2 ? { label: classes.step_label_root } : {}
              }
            >
              Short Game
            </StepLabel>
            <StepContent>
              <div className="step-two-container">
                <div className="text-field-stepper">
                  <TextField
                    label="Putts"
                    id="Putts"
                    variant="outlined"
                    placeholder="37"
                    name="putts"
                    type="number"
                    value={newRound.putts}
                    className={formClasses.root}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[10]}
                    error={props.entryError[10] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Up and Downs"
                    label="Up and Downs"
                    variant="outlined"
                    placeholder="3"
                    type="number"
                    name="upAndDowns"
                    className={formClasses.root}
                    value={newRound.upAndDowns}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[11]}
                    error={props.entryError[11] ? true : false}
                  />
                </div>

                <div className="text-field-stepper">
                  <TextField
                    id="Up and Down Attempts"
                    label="Up and Down Attempts"
                    variant="outlined"
                    placeholder="9"
                    type="number"
                    name="possibleUpAndDowns"
                    className={formClasses.root}
                    value={newRound.possibleUpAndDowns}
                    onChange={handleChangeRoundNumber}
                    autoComplete="off"
                    helperText={props.entryError[12]}
                    error={props.entryError[12] ? true : false}
                  />
                </div>

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      size="large"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNext}
                      className={classes.button}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </StepContent>
          </Step>
          {props.isError ? (
            <Step key="4" className={classes.stepContent}>
            
              <Button
                onClick={(e) => setActiveStep(0)}
                className={classes.button}
                variant="contained"
                size="large"
              >
                Back
              </Button>
          </Step>
            ) : null}
        </Stepper>
      </form>
    </div>
  );
};

export default NewRound;
