import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Cells from './Cells.jsx';

function xScale(props) {
    return d3.scaleLinear()
        .domain([0, (props.data[0].length)])
        .range([0, props.width]);
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
function yScale(props) {
    return d3.scaleLinear()
        .domain([0, (props.data.length)])
        .range([0, props.height]);
}

function Grid(props) {
    const scales = { xScale: xScale(props), yScale: yScale(props) };


    return (<svg width={props.width} height={props.height}>
        <Cells  {...props} {...scales} cellSize={props.cellSize} />
    </svg>);
}

Grid.propTypes = {
    width : PropTypes.number,
    height: PropTypes.number
};


export default Grid;
