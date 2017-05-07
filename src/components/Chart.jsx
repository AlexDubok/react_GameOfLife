import React, { Component } from 'react';
import Grid from './Grid.jsx';
import isEqual from 'lodash.isequal';

const styles = {
    width : 800,
    height: 800
};

// The number of data points for the chart.
const numDataPoints = 15;
const cellSize = (styles.width / numDataPoints) - 1;

function randomNum() {
    return Math.random() > 0.8 ? 1 : 0;
}


function randomDataSet() {
    return Array(numDataPoints).fill(Array(numDataPoints).fill(0)).map(x =>
        x.map(() => randomNum())
    );
}

class Chart extends Component {
    state = {
        data: randomDataSet()
    }

    componentWillMount() {
        this.data = randomDataSet();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }


    handleRecalc() {
        const { data } = this.state;
        const nextData = data.map((r, rowIndex) =>
            r.map((c, cIndex) => this.getCellNextState(rowIndex, cIndex, c))
        );

        this.data = nextData;
        this.forceUpdate();
    }

    getCellNextState = (row, col, state) => {
        const sum = this.getNeighbourState(row - 1, col - 1) +
            this.getNeighbourState(row - 1, col) +
            this.getNeighbourState(row - 1, col + 1) +
            this.getNeighbourState(row, col - 1) +
            this.getNeighbourState(row, col + 1) +
            this.getNeighbourState(row + 1, col - 1) +
            this.getNeighbourState(row + 1, col) +
            this.getNeighbourState(row + 1, col + 1);

        if (state === 1) {
            if (sum < 4 && sum > 1) return 1;
            if (sum > 3 || sum <= 1) return 0;
        }
        if (sum === 3) return 1;

        return 0;
    }


    getNeighbourState = (r, c) => {
        const { data } = this.state;
        const size = data.length;
        let row = r;
        let col = c;

        if (r === -1) row = size - 1;
        if (r === size) row = 0;

        if (c === -1) col = size - 1;
        if (c === size) col = 0;

        return data[row][col];
    }

    randomizeData() {
        this.setState({ data: randomDataSet() });
    }

    render() {
        return (<div>
            <h1>Playing With React and D3</h1>
            <Grid {...this.state} {...styles} cellSize={cellSize} />
            <div className='controls'>
                <button className='btn randomize' onClick={this.randomizeData.bind(this)}>
                    Randomize Data
        </button>
                <button onClick={this.handleRecalc.bind(this)}>START</button>
            </div>
        </div>);
    }
}

export default Chart;
