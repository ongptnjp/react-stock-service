import React from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Graph = props => {
  return (
    <div className="graph">
      <LineChart width={600} height={300} data={props.historyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default Graph;
