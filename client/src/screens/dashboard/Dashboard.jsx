import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";

const Dashboard = (props) => {
  const history = useHistory();
  return (
    <div className="dashboard-container">
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshad;kgljhlglgfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      <div> ;uwhaelfkhasldhfshadfawefuhase;fha;sehflasehf;ashef</div>
      
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
