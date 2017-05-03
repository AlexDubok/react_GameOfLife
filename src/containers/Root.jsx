import React from 'react';
import PropTypes from 'prop-types';
// import utils from '../utils.js';
import Universe from '../components/Universe.jsx';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        this.interval = null;
    }


    handleClear = () => {
        const clearGrid = new Event('clearGrid');

        document.dispatchEvent(clearGrid);
    }

    handleStart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.interval = requestAnimationFrame(this.recalc);
    }

    handleStop = () => {
        console.log('stop!');
        cancelAnimationFrame(this.interval);
    }

    recalc = () => {
        const getNextState = new Event('getNextState');
        const renderNext = new Event('renderNext');

        document.dispatchEvent(getNextState);
        document.dispatchEvent(renderNext);

        this.interval = requestAnimationFrame(this.recalc);
    }

    render() {
        const size = 10;
        // const grid = utils.generateGrid(size);

        return (
            <div>
                <Universe
                    width={81}
                    height={81}
                    size={size}
                />
                <button onClick={this.handleStart}>START</button>
                <button onClick={this.handleClear}>Clear</button>
                <button onClick={this.handleStop}>STOP</button>
            </div>
        );
    }
}
