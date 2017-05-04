import React, { Component } from 'react';

class Cells extends Component {
    renderCircles = (props) => {
        const rects = props.data.map((r, rowIndex) =>
            r.map((c, colIndex) => {
                return (
                    <rect
                        key={`${rowIndex}.${colIndex}`}
                        x={props.xScale(colIndex)}
                        y={props.yScale(rowIndex)}
                        width={this.props.cellSize}
                        height={this.props.cellSize}
                        fill='blue'
                    />
                );
            })
        );

        return rects;
    };

    render() {
        return (
            <g>
                {this.renderCircles(this.props)}
            </g>
        );
    }
}

export default Cells;
