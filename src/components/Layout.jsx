import React, { PureComponent } from 'react';
import GameOfLife from './Chart.js';
import styles from './Layout.less';

const WIDTH = 800;
const HEIGHT = 800;
const SIZE = 200;
const FRQ = 1000; // default update frequency


class Layout extends PureComponent {
    state = {
        population: 0.15,
        frequency : FRQ / 5,
        speed     : 5
    }

    componentDidMount() {
        this.chart = GameOfLife('.grid', { width: WIDTH, height: HEIGHT }, SIZE);
    }

    handleChangePopulation(e) {
        const population = parseFloat((e.target.value / 100).toFixed(2));

        console.log(population);
        this.setState({ population });
    }

    handleClearBoard() {
        clearTimeout(this.timeout);
        this.chart.clearBoard();
    }

    handleStartGame() {
        this.chart.nextGen();
        this.timeout = setTimeout(() => this.handleStartGame(), this.state.frequency);
    }

    handlePauseGame() {
        clearTimeout(this.timeout);
    }

    handleStopGame() {
        clearTimeout(this.timeout);
        this.chart.stopGame();
    }

    handleSpeedChange(e) {
        const speed = e.target.value;

        this.setState({ frequency: FRQ / speed, speed });
    }

    handleRandomize() {
        clearTimeout(this.timeout);
        this.chart.setRandomDataSet(this.state.population);
    }

    render() {
        const { speed, population } = this.state;
        const percentPopolation = Math.round(population * 100);

        return (
            <div className={styles.Layout} >
                <div className={styles.controls}>
                    <div className={styles.mainButtons}>
                        <button className={styles.start} onClick={this.handleStartGame.bind(this)}>Start</button>
                        <button className={styles.pause} onClick={this.handlePauseGame.bind(this)}>Pause</button>
                        <button className={styles.stop} onClick={this.handleStopGame.bind(this)}>Stop</button>
                    </div>

                    <div>
                        <div className={styles.inputLabel}>Speed: </div>
                        <div className={styles.rangeInputContainer}>
                            <label htmlFor='speed'> x{speed}</label>
                            <input
                                id='speed'
                                type='range'
                                min='1'
                                max='10'
                                step='1'
                                value={speed}
                                onChange={this.handleSpeedChange.bind(this)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className={styles.inputLabel}>Population: </div>
                        <div className={styles.rangeInputContainer}>
                            <label htmlFor='population'>{percentPopolation}%</label>
                            <input
                                id='population'
                                type='range'
                                min='1'
                                max='100'
                                step='1'
                                value={percentPopolation}
                                onChange={this.handleChangePopulation.bind(this)}
                            />
                        </div>
                    </div>

                    <button className={styles.btn} onClick={this.handleRandomize.bind(this)}>Set random cell distribution</button>
                    <button className={styles.btn} onClick={this.handleClearBoard.bind(this)}>Clear board</button>
                </div>
                <div className='grid' style={{ width: WIDTH, height: HEIGHT }} />
            </div>
        );
    }
}

export default Layout;
