import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getGroup } from "../../services/group"
import GroupMember from "../../components/groupMember/GroupMember"
import FilterGroup from "../../components/FilterGroup/FilterGroup"
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/lab/TabList";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import "./Group.css"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      color: "white",
    },
  },
}));

const OneGroup = (props) => {
  const classes = useStyles();
  const { id } = useParams()
  const { group, setGroup } = props
  const [value, setValue] = useState("scoring");
  const [roundsTimeframe, setRoundsTimeframe] = useState("last30Days");
  const [memberOrder, setMemberOrder] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchGroup = async () => {
      const newGroup = await getGroup(id)
      setGroup(newGroup)
      setMemberOrder(newGroup.members.slice())
    }
    fetchGroup()
  }, [id])

  useEffect(() => {
    setMemberOrder((prevState) => {
      prevState.sort((a, b) => {
        return a[roundsTimeframe][value] - b[roundsTimeframe][value]
      })
      return prevState
    })
  }, [value, roundsTimeframe])

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
    setValue(newValue);
  };

  const groupMemberJSX = memberOrder?.map((member) => (
    <GroupMember member={member} category={value} roundsTimeframe={roundsTimeframe}/>
  ))
  
  return (
    <div className="group-container">
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
              <Tab label="Scoring" value="scoring" style={{ zIndex: 9 }} />
              <Tab label="Driving" value="driving" style={{ zIndex: 9 }} />
              <Tab label="Greens" value="greens" style={{ zIndex: 9 }} />
              <Tab label="Putting" value="putting" style={{ zIndex: 9 }} />
            </Tabs>
          </AppBar>
        </TabContext>
      </div>

        <FilterGroup handleFilter={handleFilter}/>

      <div>{groupMemberJSX}</div>
    </div>
  )
}

export default OneGroup
