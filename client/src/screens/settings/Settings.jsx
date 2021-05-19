// import React from "react";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import "./NewRound.css"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     backgroundColor: "#000410",
//     display: "flex",
//     justifyContent: "center",
//   },
//   button: {
//     width: "100px"
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// const useIconStyles = makeStyles((theme) => ({
//   root: {
//     color: "#a3a3a3",
//     width: "105px",
//     fontSize: "30px"
//   },
// }));

// const useFormStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#E4E4E4",
//       opacity: 0.4,
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#4CAF50",
//       opacity: 1,
//     },
//     "& .MuiButton-label": {
//       color: "black",
//       fontSize: "16px",
//     },
//     "& .MuiStepConnector-completed": {
//       color: "red",
//     },
//   },
// }));

// const NewRound = (props) => {
//   const classes = useStyles();
//   const iconClasses = useIconStyles();
//   const formClasses = useFormStyles();
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevState) => prevState + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevState) => prevState - 1);
//   };

//   return (
//     <div className="new-round-container">
//       <Stepper
//         activeStep={activeStep}
//         alternativeLabel
//         className={classes.root}
//       >
//         <Step key={1}>
//           <StepLabel StepIconProps={{ classes: { root: iconClasses.root } }}>
//             Round Info
//           </StepLabel>
//         </Step>

//         <Step key={2}>
//           <StepLabel StepIconProps={{ classes: { root: iconClasses.root } }}>
//             Long Game
//           </StepLabel>
//         </Step>

//         <Step key={3}>
//           <StepLabel StepIconProps={{ classes: { root: iconClasses.root } }}>
//             Short Game
//           </StepLabel>
//         </Step>
//       </Stepper>

//       <div>
        
//           <Typography className={classes.instructions}>Hello</Typography>
          
//         <div className="form-buttons">
//           <div className={activeStep === 0 ? "back-button-hidden" : "back-button-form"}>
//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleBack}
//               className={classes.button}
//             >
//               Back
//             </Button>
//           </div>
//           <div>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleNext}
//               size="large"
//              className={classes.button}
//             >
//               {activeStep === 2 ? "Submit" : "Next"}
//             </Button>
//             </div>
//             </div>
//       </div>
//     </div>
//   );
// };

// export default NewRound;
