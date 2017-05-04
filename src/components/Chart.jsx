import React, { Component } from 'react';
import Grid from './Grid.jsx';

const styles = {
    width : 800,
    height: 800
};

// The number of data points for the chart.
const numDataPoints = 200;
const cellSize = (styles.width / numDataPoints) - 1;

// A function that returns a random number from 0 to 1000
function randomNum() {
    return Math.floor(Math.round(Math.random()));
}

// A function that creates an array of 50 elements of (x, y) coordinates.
function randomDataSet() {
    return Array(numDataPoints).fill(Array(numDataPoints).fill(0).map(() => randomNum()));
}

export default class Chart extends Component {
    state = { data: randomDataSet() };

    randomizeData() {
        console.log(randomDataSet());
        this.setState({ data: randomDataSet() });
    }

    render() {
        return (<div>
            <h1>Playing With React and D3</h1>
            <Grid {...this.state} {...styles} cellSize={cellSize} />
            <div className='controls'>
                <button className='btn randomize' onClick={() => this.randomizeData()}>
                    Randomize Data
        </button>
            </div>
        </div>);
    }
}
