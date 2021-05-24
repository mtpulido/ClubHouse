import React from 'react'
import { ChartDonut } from "@patternfly/react-charts";
import { ChartLabel, ChartLegend } from "@patternfly/react-charts";
import "./Donut.css"
import { useState, useEffect } from "react"
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Donut = (props) => {
  const { value } = props
  const [donutX, setDonutX] = useState([])
  // const [chartTitles, setChartTitles] = useState(["Scoring", `${roundFilter.length} rounds`])

  useEffect(() => {
      toggleDonutX()
    
  }, [value])

  const toggleDonutX = () => {
    if (value === "0") {
      setDonutX(["100+", "90s", "80s", "70s", "60s"])
    }
    if (value === "1") {
      setDonutX(["<15%", "16-30%", "31-45%", "46-60%", "60%+"])
    }
    if (value === "2") {
      setDonutX(["<15%", "16-30%", "31-45%", "46-65%", "66%+"])
    }
    if (value === "3") {
      setDonutX(["45+", "40-44", "35-39", "30-34", "<30"])
    }
  }

  return (
    <div className="pie-chart">
      <SwitchTransition>
      <CSSTransition
          key={value}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames="fade"
      >
        <ChartDonut
          innerRadius={90}
          ariaDesc="Player Data"
          ariaTitle="Player Data"
          constrainToVisibleArea={true}
          data={[
            { x: donutX[0], y: 0 },
            { x: donutX[1], y: 10 },
            { x: donutX[2], y: 10 },
            { x: donutX[3], y: 10 },
            { x: donutX[4], y: 0 },
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
                  symbol:  {type: "circle"},
                },
                {
                  name: donutX[1],
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  symbol:  {type: "circle"},
                },
                {
                  name: donutX[2],
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  symbol:  {type: "circle"},
                },
                {
                  name: donutX[3],
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  symbol:  {type: "circle"},
                },
                {
                  name: donutX[4],
                  labels: { fill: "white", fontSize: 16, fontWeight: 600 },
                  symbol:  {type: "circle"},
                },
              ]}
              colorScale={["#b6c0cb", "#1d88b6", "#01afd6", "#dee3e5", "#1e4d79"]}
            />
          }
          padding={{
            bottom: 10,
            left: 20,
            right: 90,
          }}
          colorScale={["#b6c0cb", "#1d88b6", "#01afd6", "#dee3e5", "#1e4d79"]}
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
             </CSSTransition>
      </SwitchTransition>
      </div>
  )
}

export default Donut
