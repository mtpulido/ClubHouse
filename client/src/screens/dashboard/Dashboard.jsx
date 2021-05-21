import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import Round from "../../components/round/Rounds";
import { ChartDonut } from "@patternfly/react-charts";
import { ChartLabel, ChartLegend } from "@patternfly/react-charts";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";

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
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <AppBar position="static" style={{ marginTop: '-5px' }}
          >
            <Tabs
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
              indicatorColor="secondary"
              TabIndicatorProps={{
                style: {
                  height: "100%",
                  opacity: .3,
                  backgroundColor: 'black'
                }
              }}
              className={classes.root}
            >
              <Tab label="Scoring" value="1" style={{ zIndex: 9 }}/>
              <Tab label="Driving" value="2" style={{ zIndex: 9 }}/>
              <Tab label="Greens" value="3" style={{ zIndex: 9 }}/>
              <Tab label="Putting" value="4" style={{ zIndex: 9 }}/>
            </Tabs>
          </AppBar>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
        </TabContext>
      </div>

      <div className="pie-chart">
        <ChartDonut
          innerRadius={85}
          ariaDesc="Player Data"
          ariaTitle="Player Data"
          constrainToVisibleArea={true}
          data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 55 },
            { x: "Birds", y: 10 },
          ]}
          labels={({ datum }) => `${datum.x}: ${datum.y}%`}
          legendOrientation="vertical"
          legendPosition="right"
          legendComponent={
            <ChartLegend
              data={[
                {
                  name: "< 70",
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  type: "circle",
                },
                {
                  name: "70-79",
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  type: "circle",
                },
                {
                  name: "80-89",
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  type: "circle",
                },
                {
                  name: "90-99",
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  type: "circle",
                },
                {
                  name: "> 100",
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  type: "circle",
                },
              ]}
              colorScale={["red", "green", "yellow", "pink", "orange"]}
            />
          }
          padding={{
            bottom: 10,
            left: 20,
            right: 125,
          }}
          colorScale={["red", "green", "yellow", "pink", "orange"]}
          subTitle="5 rounds"
          title="Scoring"
          width={350}
          titleComponent={
            <ChartLabel
              style={[
                { fill: "white", fontSize: 27, fontWeight: 500 },
                { fill: "#979696", fontSize: 18 },
              ]}
            />
          }
        />
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
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Dashboard;
