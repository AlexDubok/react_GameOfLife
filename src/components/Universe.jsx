import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell.jsx';
import styles from './Universe.less';

class Universe extends PureComponent {
    static propTypes = {
        width : PropTypes.number,
        height: PropTypes.number,
        size  : PropTypes.number
    }

    state = {
        grid: []
    }

    componentWillMount() {
        const { size } = this.props;

        const grid = new Array(size * size)
            .fill(null)
            .map((cell, i) =>
                <Cell key={i} id={i} cells={this.state.grid} />
            );

        this.setState({ grid });
    }

    render() {
        const { width, height } = this.props;

        return (
            <div className={styles.Universe} style={{ width, height }}>
                {this.state.grid}
            </div>
        );
    }
}

export default Universe;
