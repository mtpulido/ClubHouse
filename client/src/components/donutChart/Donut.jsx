import React from "react";
import { ChartDonut } from "@patternfly/react-charts";
import { ChartLabel, ChartLegend } from "@patternfly/react-charts";
import "./Donut.css";
import { useState, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { populateScoring, populateDriving, populateGreens, populatePutting } from "../../utils/donutChart"
import CircularProgress from '@material-ui/core/CircularProgress';

const Donut = (props) => {
  const { value, userRounds } = props;
  const [donutX, setDonutX] = useState([]);
  const [donutTitle, setDonutTitle] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    toggleDonutX()
  }, [value, userRounds]);

  const toggleDonutX = () => {
      if (value === "0") {
        setDonutX(["100+", "90s", "80s", "70s", "60s"]);
        setDonutTitle("Scoring")
        setData(populateScoring(userRounds))
      }
      if (value === "1") {
        setDonutX(["<15%", "16-30%", "31-45%", "46-60%", "60%+"]);
        setDonutTitle("Driving")
        setData(populateDriving(userRounds))
      }
      if (value === "2") {
        setDonutX(["<15%", "16-30%", "31-45%", "46-65%", "66%+"]);
        setDonutTitle("Greens")
        setData(populateGreens(userRounds))
      }
      if (value === "3") {
        setDonutX(["45+", "40-44", "35-39", "30-34", "<30"]);
        setDonutTitle("Putting")
        setData(populatePutting(userRounds))
      }
  };
  
  return (
    <div className="pie-chart">
      {props.loading ? <div className="loading-container"> <CircularProgress color="primary" /></div> :
      <SwitchTransition>
        <CSSTransition
          key={value}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          <ChartDonut
            innerRadius={90}
            ariaDesc="Player Data"
            ariaTitle="Player Data"
            constrainToVisibleArea={true}
            data={[
              { x: donutX[0], y: data[0] },
              { x: donutX[1], y: data[1] },
              { x: donutX[2], y: data[2] },
              { x: donutX[3], y: data[3] },
              { x: donutX[4], y: data[4] },
            ]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            legendOrientation="vertical"
            legendPosition="right"
            legendComponent={
              <ChartLegend
                data={[
                  {
                    name: donutX[0],
                    labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                    symbol: { type: "circle" },
                  },
                  {
                    name: donutX[1],
                    labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                    symbol: { type: "circle" },
                  },
                  {
                    name: donutX[2],
                    labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                    symbol: { type: "circle" },
                  },
                  {
                    name: donutX[3],
                    labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                    symbol: { type: "circle" },
                  },
                  {
                    name: donutX[4],
                    labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                    symbol: { type: "circle" },
                  },
                ]}
                colorScale={[
                  "#b6c0cb",
                  "#1d88b6",
                  "#01afd6",
                  "#dee3e5",
                  "#1e4d79",
                ]}
              />
            }
            padding={{
              bottom: 10,
              left: 20,
              right: 90,
            }}
            colorScale={["#b6c0cb", "#1d88b6", "#01afd6", "#dee3e5", "#1e4d79"]}
            title={donutTitle}
            width={370}
            titleComponent={
              <ChartLabel
                style={[
                  { fill: "white", fontSize: 30, fontWeight: 500 },
                ]}
              />
            }
          />
        </CSSTransition>
      </SwitchTransition>
      }
    </div >
  );
};

export default Donut;
