import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailsRound.css";
import ReactStoreIndicator from "react-score-indicator";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom"

const DetailsRound = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const [round, setRound] = useState({});
  const history = useHistory()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    if (currentUser) {
      setRound(currentUser.recentRounds[id]);
    }
  }, [currentUser]);

  const convertDate = (roundDate) => {
    let date = new Date(roundDate);
    return (
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear()
    );
  };

  return (
    <div className="round-details-container">
      <div className="details-date">
        <div>{convertDate(round?.createdAt)}</div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={(e) =>
            setTimeout(() => history.push(`/user/round/edit/${id}`), 120)
          }
        >
          Edit
        </Button>
        
      </div>
      <div className="details-info-container">
        <div className="info-one">
          <div className="details-course">{round?.course}</div>
          <div className="details-score">{round?.score}</div>
        </div>
        <div className="info-two">
          <div className="details-par">Par {round?.par}</div>
          <div className="details-holes">{round?.holes} holes</div>
        </div>
      </div>

      <div className="details-longgame-container">
        <div className="details-label">Long Game:</div>
        <div className="details-analysis">
          <div className="details-fairways">
            Fairways:{" "}
            {round?.fairwaysHit
              ? round?.fairwaysHit + " / " + round?.possibleFairways
              : "No Data"}
          </div>
          <div><ReactStoreIndicator
        value={Math.round((round?.fairwaysHit / round?.possibleFairways) * 125)}
        maxValue={100}
        width={140}
        fadedOpacity={25}
      /></div>
        </div>
        <div className="details-analysis">
        <div className="details-greens">
          Greens: {round?.greens ? round?.greens + " / " + round?.holes : "No Data"}
          </div>
          <div><ReactStoreIndicator
                value={Math.round((round?.greens / round?.holes) * 133)}
                maxValue={100}
                width={140}
                fadedOpacity={25}
              /></div>
          </div>
      </div>

      <div className="details-longgame-container">
        <div className="details-label">Short Game:</div>
        <div className="details-analysis">
        <div className="details-fairways">
          Chipping:{" "}
          {round?.upAndDowns
            ? round?.upAndDowns + " / " + round?.possibleUpAndDowns
            : "No Data"}
          </div>
          <div><ReactStoreIndicator
                value={Math.round((round?.upAndDowns / round?.possibleUpAndDowns) * 150)}
                maxValue={100}
                width={140}
                fadedOpacity={25}
              /></div>
        </div>
        <div className="details-analysis">
        <div className="details-greens">
          Putting: {round?.putts ? round?.putts : "No Data"}
          </div>
          <div><ReactStoreIndicator
                value={Math.round(Math.pow(round?.holes / round?.putts, 2) * 250)}
                maxValue={100}
                width={140}
                fadedOpacity={25}
              /></div>
          </div>
      </div>
    </div>
  );
};

export default DetailsRound;
