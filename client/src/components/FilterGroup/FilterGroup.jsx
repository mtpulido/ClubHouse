import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./FilterGroup.css"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    "&:before": {
      borderColor: "#fafafa",
    },
    "&:after": {
      borderColor: "#4CAF50",
    },
  },
  icon: {
    fill: "#fafafa",
  },
}));

const FilterGroup = (props) => {
  // const [query, setQuery] = useState("last30Days");
  const classes = useStyles();

  useEffect(() => {
      props.handleFilter("last30Days")
  
  }, [])

  const onChange = (e) => {
    props.handleFilter(e.target.value)
    // props.setLoading(true)
    // setQuery(e.target.value)
    // setTimeout(() => {
    //   props.setLoading(false)
    // }, (Math.random() * 1000) + 500)
  }
  return (
    <div className="filter-container-group">
      <div className="leaderboard-group">Leaderboard:</div>
      <div><Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.roundsTimeframe}
        onChange={onChange}
        style={{ width: "125px", height: "45px", marginTop: "10px" }}
        className={classes.select}
        inputProps={{
          classes: { icon: classes.icon },
        }}
      >
        <MenuItem
          value="last30Days"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
            marginTop: "-10px"
          }}
        >
        Last 30 Days
        </MenuItem>
        <MenuItem
          value="last60Days"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
        Last 60 Days
        </MenuItem>
        <MenuItem
          value="last90Days"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
          Last 90 Days
        </MenuItem>
        <MenuItem
          value="last6Months"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
            marginBottom: "-10px"
          }}
        >
          Last 6 Months
        </MenuItem>
      </Select>
      </div>
    </div>
  );
};

export default FilterGroup;