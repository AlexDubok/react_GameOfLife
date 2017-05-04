import React from 'react';
import * as d3 from 'd3';
import Cells from './Cells.jsx';

// Returns the largest X coordinate from the data set
const xMax = (data) => data.length;

// Returns the higest Y coordinate from the data set
const yMax = (data) => data.length;

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
    return d3.scaleLinear()
        .domain([0, xMax(props.data)])
        .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
    return d3.scaleLinear()
        .domain([0, yMax(props.data)])
        .range([props.height - props.padding, props.padding]);
};

function ScatterPlot(props) {
    const scales = { xScale: xScale(props), yScale: yScale(props) };


    return (<svg width={props.width} height={props.height}>
        <Cells {...props} {...scales} />
    </svg>);
}

export default ScatterPlot;
