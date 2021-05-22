import React from 'react'
import { ChartDonut } from "@patternfly/react-charts";
import { ChartLabel, ChartLegend } from "@patternfly/react-charts";
import "./Donut.css"

const Donut = () => {
  return (
    <div className="pie-chart">
        <ChartDonut
          innerRadius={85}
          ariaDesc="Player Data"
          ariaTitle="Player Data"
          constrainToVisibleArea={true}
          data={[
            { x: "60s", y: 0 },
            { x: "70s", y: 10 },
            { x: "80s", y: 10 },
            { x: "90s", y: 10 },
            { x: "100s", y: 0 },
          ]}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
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
              colorScale={["#b6c0cb", "#1d88b6", "#01afd6", "#dee3e5", "#1e4d79"]}
            />
          }
          padding={{
            bottom: 10,
            left: 20,
            right: 125,
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
      </div>
  )
}

export default Donut
