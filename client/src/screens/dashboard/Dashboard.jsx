import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import Round from "../../components/round/Rounds";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Donut from "../../components/donutChart/Donut";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      color: "white",
    },
  },
}));

const Dashboard = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value);

  const roundJSX = props.currentUser?.recentRounds.map((round, index) => (
    <Round
      course={round.course}
      score={round.score}
      holes={round.holes}
      id={index}
      open={props.open}
    />
  ));

  return (
    <div className="dashboard-container">
      <div className="app-bar-">
        <TabContext value={value}>
          <AppBar
            position="static"
            style={{ marginTop: "-5px", marginBottom: "20px" }}
          >
            <Tabs
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
              indicatorColor="secondary"
              TabIndicatorProps={{
                style: {
                  height: "100%",
                  opacity: 0.3,
                  backgroundColor: "black",
                },
              }}
              className={classes.root}
            >
              <Tab label="Scoring" value="1" style={{ zIndex: 9 }} />
              <Tab label="Driving" value="2" style={{ zIndex: 9 }} />
              <Tab label="Greens" value="3" style={{ zIndex: 9 }} />
              <Tab label="Putting" value="4" style={{ zIndex: 9 }} />
            </Tabs>
          </AppBar>

              <TabPanel value="1">
                
                <Donut />
              </TabPanel>
              <TabPanel value="2">
                
                <Donut />
              </TabPanel>
              <TabPanel value="3">
                
                <Donut />
              </TabPanel>
              <TabPanel value="4">
                
                <Donut />
              </TabPanel>
        </TabContext>
      </div>

      <div className="rounds-container-dashboard">{roundJSX}</div>

      <div className="add-button">
        <Fab
          color="primary"
          aria-label="add"
          disabled={props.open}
          onClick={(e) =>
            setTimeout(() => history.push("/user/new-round"), 120)
          }
          style={{ height: "70px", width: "70px" }}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Dashboard;
