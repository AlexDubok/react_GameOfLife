import * as d3 from 'd3';

export default function (el, props, size) {
    const gL = {};
    const totalCellNum = size * size;
    const cellSize = props.width / size;
    const dataSets = [Array(totalCellNum).fill(null).map(() => 0), Array(totalCellNum).fill(null).map(() => 0)];
    let currentIndex = 0;
    let firstGen = dataSets[currentIndex];

    gL.getCol = (d) =>  d % size;
    gL.getRow = (d) => Math.floor(d / size);


    gL.getValue = (d) => dataSets[currentIndex][d];
    gL.setValue = (dataIndex, cellIndex, val) => dataSets[dataIndex][cellIndex] = val;

    gL.setRandomDataSet = (population) => {
        dataSets[currentIndex] = Array(totalCellNum).fill(null).map(() => Math.random() > 1 - population ? 1 : 0);
        firstGen = dataSets[currentIndex];
        gL.update();
    };

    gL.stopGame = () => {
        dataSets[currentIndex] = firstGen;
        gL.update();
    };

    gL.clearBoard = () => {
        dataSets[currentIndex] = Array(totalCellNum).fill(null).map(() => 0);
        firstGen = dataSets[currentIndex];
        gL.update();
    };

    const svg = d3.select(el).append('svg')
        .attr('width', props.width)
        .attr('height', props.height)
        .attr('class', 'd3Grid');


    const rects = svg.append('g')
        .selectAll('rect')
        .data(d3.range(0, totalCellNum))
        .enter().append('rect')
        .attr('x', (d) => gL.getCol(d) * (cellSize))
        .attr('y', (d) => gL.getRow(d) * (cellSize))
        .attr('width', cellSize - 1)
        .attr('height', cellSize - 1)
        .classed('cell', true)
        .classed('active', d => gL.getValue(d) === 1)
        .on('click', d => switchState(d));

    gL.update = () => {
        rects.classed('active', d => gL.getValue(d) === 1);
    };

    gL.nextGen = () => {
        dataSets[currentIndex - 1] = dataSets[currentIndex].map((point, i) => {
            const col = gL.getCol(i);
            const row = gL.getRow(i);

            const sum = getNeighbourState(row - 1, col - 1) +
                getNeighbourState(row - 1, col) +
                getNeighbourState(row - 1, col + 1) +
                getNeighbourState(row, col - 1) +
                getNeighbourState(row, col + 1) +
                getNeighbourState(row + 1, col - 1) +
                getNeighbourState(row + 1, col) +
                getNeighbourState(row + 1, col + 1);

            if (sum <= 1 || sum > 3) return 0;
            if (sum === 2) return point;

            return 1;
        });
        currentIndex = currentIndex - 1;
        gL.update();
    };

    function switchState(d) {
        gL.setValue(currentIndex, d, gL.getValue(d) === 1 ? 0 : 1);
        gL.update();
    }

    function getNeighbourState(r, c) {
        let row = r;
        let col = c;

        if (r === -1) row = size - 1;
        if (r === size) row = 0;

        if (c === -1) col = size - 1;
        if (c === size) col = 0;

        const id = row * size + col;

        return dataSets[currentIndex][id];
    }

    return gL;
}
