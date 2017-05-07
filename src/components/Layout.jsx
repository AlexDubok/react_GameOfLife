import React, { PureComponent } from 'react';
import utils from '../components/utils.js';
import Chart from '../Chart.js';
import './Layout.less';

const width = 800;
const height = 800;
const numDataPoints = 100;


class Layout extends PureComponent {
    state = {
        frequency: 50
    }

    componentDidMount() {
        this.chartData = utils.randomDataSet(numDataPoints, 0.2);
        this.firstGen = this.chartData;
        Chart.create('.grid', { width, height }, this.chartData);
    }

    handleStartGame() {
        this.getNextData();
        this.timeout = setTimeout(() => this.handleStartGame(), this.state.frequency);
    }

    handlePauseGame() {
        clearTimeout(this.timeout);
    }

    handleStopGame() {
        clearTimeout(this.timeout);

        Chart.update(this.firstGen);
        this.chartData = this.firstGen;
    }

    handleRandomize() {
        this.firstGen = utils.randomDataSet(numDataPoints, 0.2);

        Chart.update(this.firstGen);
        this.chartData = this.firstGen;
    }

    getNextData() {
        const nextChartData = utils.getNextGeneration(this.chartData);

        Chart.update(nextChartData);
        this.chartData = nextChartData;
    }

    render() {
        return (
            <div className='Layout' >
                <div className='controls'>
                    <button onClick={this.handleStartGame.bind(this)}>Start</button>
                    <button onClick={this.handlePauseGame.bind(this)}>Pause</button>
                    <button onClick={this.handleStopGame.bind(this)}>Stop</button>
                    <button onClick={this.handleRandomize.bind(this)}>Set random cell distribution</button>
                </div>
                <div className='grid' style={{ width, height }} />
            </div>
        );
    }
}

export default Layout;
