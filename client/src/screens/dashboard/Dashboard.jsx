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
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Donut from "../../components/donutChart/Donut";
import Filter from "../../components/Filter/Filter";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

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
  const [value, setValue] = useState("0");
  const [userRounds, setUserRounds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = (type) => {
    switch (type) {
      case "5 rounds":
        setUserRounds(props.currentUser.recentRounds?.slice(0, 5));
        break;
      case "10 rounds":
        setUserRounds(props.currentUser.recentRounds?.slice(0, 10));
        break;
      case "15 rounds":
        setUserRounds(props.currentUser.recentRounds?.slice(0, 15));
        break;
      case "25 rounds":
        setUserRounds(props.currentUser.recentRounds?.slice(0, 25));
        break;
      case "50 rounds":
        setUserRounds(props.currentUser.recentRounds?.slice(0, 50));
        break;
      case "All rounds":
        setUserRounds(props.currentUser.recentRounds);
        break;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const roundJSX = userRounds?.map((round, index) => (
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
          <AppBar position="static" style={{ marginTop: "-5px" }}>
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
              <Tab label="Scoring" value="0" style={{ zIndex: 9 }} />
              <Tab label="Driving" value="1" style={{ zIndex: 9 }} />
              <Tab label="Greens" value="2" style={{ zIndex: 9 }} />
              <Tab label="Putting" value="3" style={{ zIndex: 9 }} />
            </Tabs>
          </AppBar>
        </TabContext>
      </div>

      <Filter
        handleFilter={handleFilter}
        currentUser={props.currentUser}
        setLoading={setLoading}
      />

      {props.currentUser?.recentRounds?.length > 0 ? (
        <Donut value={value} userRounds={userRounds} loading={loading} />
      ) : null}

      <div className="add-button">
        {props.currentUser?.recentRounds?.length === 0 ? (
          <div className="bounce-5 pointer-arrow">
            <ArrowRightAltIcon style={{ fontSize: "150px", color: "red" }} />
          </div>
        ) : null}
        <Fab
          color="primary"
          aria-label="add"
          disabled={
            props.open && props.currentUser?.displayName?.length > 0
              ? true
              : false
          }
          onClick={(e) =>
            setTimeout(() => history.push("/user/new-round"), 120)
          }
          style={{ height: "70px", width: "70px" }}
        >
          <AddIcon />
        </Fab>
      </div>

      {loading ? (
        <div className="loading-container">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="rounds-container-dashboard">{roundJSX}</div>
      )}
    </div>
  );
};

export default Dashboard;
