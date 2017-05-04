import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import * as d3 from 'd3';
import Cell                     from './Cell.jsx';
import styles                   from './Universe.less';

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
        console.log(d3);
    }

    createGrid = () => {
        const { width, height, size } = this.props;

        this.scaleX = d3.scaleLinear()
            // .domain([0, size])
            .range([0, size]);

        this.scaleY = d3.scaleLinear()
            // .domain([0, size])
            .range([0, size]);

        const xAxis = d3.axisBottom()
            .scale(this.scaleX)
            .tickSizeInner(-height);

        const yAxis = d3.axisLeft()
            .scale(this.scaleY)
            .tickSizeInner(-width);

        this.svg = d3.select(styles.Universe).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'papayawhip');

        this.svg.append('g')
            .attr('class', 'y axis')
            .attr('fill', 'none')
            .attr('stroke', 'tomato')
            .call(yAxis);

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this.height})`)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .call(xAxis);
    }

    render() {
        const { width, height } = this.props;

        return (
            <svg />
        );
    }
}

export default Universe;
