import React, { PureComponent } from 'react';
import {
    ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
    Line
  } from 'recharts';

export default class WinRateChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
        <ComposedChart
            width={280}
            height={280}
            data={this.props.data}
            margin={{
            top: 20, right: 0, bottom: 0, left: 0,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" domain= {[0, 100]}/>
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="rate" fill="#8884d8" stroke="#8884d8" />
            <Line yAxisId="right" dataKey="sum" barSize={20} fill="#413ea0" />
            {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
        </ComposedChart>
        );
    }
}
