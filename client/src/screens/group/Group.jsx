import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGroup } from "../../services/group";
import GroupMember from "../../components/groupMember/GroupMember";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/lab/TabList";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import "./Group.css";
import { sortGroupMembers } from "../../utils/sort"
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      color: "white",
    },
  },
}));

const OneGroup = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const { group, setGroup } = props;
  const [category, setCategory] = useState("scoring");
  const [roundsTimeframe, setRoundsTimeframe] = useState("last30Days");
  // const [members, setMembers] = useState([])
  const [memberOrder, setMemberOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      const newGroup = await getGroup(id);
      setGroup(newGroup);
      // setMembers(newGroup.members.slice())
      setMemberOrder(newGroup.members.slice().sort((a, b) => {
        return a[roundsTimeframe][category] - b[roundsTimeframe][category]
      }))
    };
    fetchGroup();
  }, [id]);

  useEffect(() => {
    setMemberOrder((prevState) => {
      let order = []
      if (category === "driving" || category === "greens") {
        order = prevState.slice().sort((a, b) => {
          return b[roundsTimeframe][category] - a[roundsTimeframe][category];
        });
      } else {
       order = prevState.slice().sort((a, b) => {
          return a[roundsTimeframe][category] - b[roundsTimeframe][category];
        });
      }
      return order
    })
  }, [category, roundsTimeframe]);

  const handleFilter = (type) => {
    switch (type) {
      case "last30Days":
        setRoundsTimeframe("last30Days");
        break;
      case "last60Days":
        setRoundsTimeframe("last60Days");
        break;
      case "last90Days":
        setRoundsTimeframe("last90Days");
        break;
      case "last6Months":
        setRoundsTimeframe("last6Months");
        break;
    }
  };

  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  const groupMemberJSX = memberOrder?.map((member) => (
    <GroupMember
      member={member}
      category={category}
      roundsTimeframe={roundsTimeframe}
    />
  ));

  return (
    <div className="group-container">
      <div className="app-bar-">
        <TabContext value={category}>
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
              <Tab label="Scoring" value="scoring" style={{ zIndex: 9 }} />
              <Tab label="Driving" value="driving" style={{ zIndex: 9 }} />
              <Tab label="Greens" value="greens" style={{ zIndex: 9 }} />
              <Tab label="Putting" value="putting" style={{ zIndex: 9 }} />
            </Tabs>
          </AppBar>
        </TabContext>
      </div>

      <FilterGroup handleFilter={handleFilter} roundsTimeframe={roundsTimeframe} setLoading={setLoading}/>
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div>{groupMemberJSX}</div>
      )}
    </div>
  );
};

export default OneGroup;
