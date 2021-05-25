import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Filter.css"

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

const Filter = (props) => {
  const [query, setQuery] = useState("All rounds");
  const classes = useStyles();

  useEffect(() => {
    if (props.currentUser) {
      props.handleFilter(query)
    }
  }, [query, props.currentUser])

  const onChange = (e) => {
    props.setLoading(true)
    setQuery(e.target.value)
    setTimeout(() => {
      props.setLoading(false)
    }, (Math.random() * 1500))
  }
  return (
    <div className="filter-container">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={query}
        onChange={onChange}
        style={{ width: "125px", height: "45px", marginTop: "10px" }}
        className={classes.select}
        inputProps={{
          classes: { icon: classes.icon },
        }}
      >
        <MenuItem
          value="5 rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
            marginTop: "-10px"
          }}
        >
          5 Rounds
        </MenuItem>
        <MenuItem
          value="10 rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
          10 Rounds
        </MenuItem>
        <MenuItem
          value="15 rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
          15 Rounds
        </MenuItem>
        <MenuItem
          value="25 rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
          25 Rounds
        </MenuItem>
        <MenuItem
          value="50 rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
          }}
        >
          50 Rounds
        </MenuItem>
        <MenuItem
          value="All rounds"
          style={{
            backgroundColor: "#303539",
            borderBottom: "1px solid rgba(193, 193, 193, 0.2)",
            marginBottom: "-10px"
          }}
        >
          All Rounds
        </MenuItem>
      </Select>
    </div>
  );
};

export default Filter;
