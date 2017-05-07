import * as d3 from 'd3';

class Chart {
    create = (el, props, data) => {
        this.svg = d3.select(el).append('svg')
            .attr('width', props.width)
            .attr('height', props.height)
            .attr('class', 'd3Grid');

        this.cellSize = props.width / Math.sqrt(data.length);
        this.cells = this.svg.append('g');
        this.update(data);
    }

    update = (data) => {
        const point = this.cells.selectAll('rect')
            .data(data);

        point.enter().append('rect')
            .attr('x', (d) => d.x * (this.cellSize))
            .attr('y', (d) => d.y * (this.cellSize))
            .attr('width', this.cellSize - 1)
            .attr('height', this.cellSize - 1)
            .classed('cell', true)
            .classed('active', d => d.value === 1);
        point.classed('active', d => d.value === 1);
        point.exit()
            .remove();
    }
}

export default new Chart();
