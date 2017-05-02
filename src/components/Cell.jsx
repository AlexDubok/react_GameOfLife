import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Cell.less';

class Cell extends PureComponent {
    static propTypes = {
        id     : PropTypes.number,
        onClick: PropTypes.func,
        cells  : PropTypes.array
    }

    state = {
        isAlive: Math.random() > 0.75 ? 1 : 0
    }

    componentDidMount() {
        this.nextState = 0;
        this.props.cells[this.props.id] = this;
        document.addEventListener('getNextState', () => {
            this.getNextState();
        });
        document.addEventListener('renderNext', () => {
            this.renderNextState();
        });

        document.addEventListener('clearGrid', () => {
            this.setState({ isAlive: 0 });
        });
    }

    componentWillUnmount() {
        document.removeEventListener('renderNext');
        document.removeEventListener('getNextState');
    }

    handleCellClick = () => {
        // console.log(this.props.id);
        this.setState({ isAlive: this.state.isAlive ? 0 : 1 });
    }

    getNextState = () => {
        const size = Math.sqrt(this.props.cells.length);
        const row = Math.floor(this.props.id / size);
        const col = this.props.id - row * size;

        const neighboursSum = (
            this.isCellAlive(row - 1, col) +
            this.isCellAlive(row - 1, col + 1) +
            this.isCellAlive(row - 1, col - 1) +

            this.isCellAlive(row, col - 1) +
            this.isCellAlive(row, col + 1) +

            this.isCellAlive(row + 1, col - 1) +
            this.isCellAlive(row + 1, col) +
            this.isCellAlive(row + 1, col + 1)
        );

        let nextState = 0;

        if (this.state.isAlive) {
            if (neighboursSum < 4 && neighboursSum > 1) nextState = 1;
            if (neighboursSum > 3 || neighboursSum <= 1) nextState = 0;
            if (neighboursSum === 3) nextState = 1;
        } else if (neighboursSum === 3) nextState = 1;

        if (this.nextState !== nextState) {
            this.nextState = nextState;
        }
    }

    isCellAlive = (r, c) => {
        const size = Math.sqrt(this.props.cells.length);
        let row = r;
        let col = c;

        if (r === -1) row = size - 1;
        if (r === size) row = 0;

        if (c === -1) col = size - 1;
        if (c === size) col = 0;

        const id = row * size + col;

        return this.props.cells[id].state.isAlive;
    };

    renderNextState = () => {
        if (this.state.nextState !== this.state.isAlive) {
            this.setState({ isAlive: this.nextState });
        }
    };

    render() {
        const { isAlive } = this.state;
        const cellStyles = classnames(styles.Cell, {
            [styles.isAlive]: isAlive
        });

        return (
            <div ref={el => this.cell = el} className={cellStyles} onClick={this.handleCellClick} />
        );
    }
}

export default Cell;
