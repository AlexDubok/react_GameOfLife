import * as d3 from 'd3';

class Utils {
    getRandomNum = (probability) => {
        return Math.random() > 1 - probability ? 1 : 0;
    };

    randomDataSet = (size, probability) => {
        return d3.range(0, size * size).map((x, i) => {
            const row = Math.floor(i / size);
            const col = i - row * size;

            return { x: col, y: row, value: this.getRandomNum(probability) };
        });
    }

    emptyDataSet = (size) => {
        return d3.range(0, size * size).map((x, i) => {
            const row = Math.floor(i / size);
            const col = i - row * size;

            return { x: col, y: row, value: 0 };
        });
    }

    getCellNextState = (value, index, size, data) => {
        const row = Math.floor(index / size);
        const col = index - row * size;
        const nextCellState = { x: col, y: row, value: 0 };

        const sum = this.getNeighbourState(row - 1, col - 1, size, data) +
            this.getNeighbourState(row - 1, col, size, data) +
            this.getNeighbourState(row - 1, col + 1, size, data) +
            this.getNeighbourState(row, col - 1, size, data) +
            this.getNeighbourState(row, col + 1, size, data) +
            this.getNeighbourState(row + 1, col - 1, size, data) +
            this.getNeighbourState(row + 1, col, size, data) +
            this.getNeighbourState(row + 1, col + 1, size, data);

        if (value === 1) {
            if (sum < 4 && sum > 1) nextCellState.value = 1;
            if (sum > 3 || sum <= 1) nextCellState.value = 0;
            if (sum === 3) nextCellState.value = 1;
        } else if (sum === 3) nextCellState.value = 1;

        return nextCellState;
    }

    getNeighbourState = (r, c, size, data) => {
        let row = r;
        let col = c;

        if (r === -1) row = size - 1;
        if (r === size) row = 0;

        if (c === -1) col = size - 1;
        if (c === size) col = 0;

        const id = row * size + col;

        return data[id].value;
    }

    getNextGeneration(data) {
        const size = Math.sqrt(data.length);
        const nextData = data.map((item, index) => {
            return this.getCellNextState(item.value, index, size, data);
        });

        return nextData;
    }
}

export default new Utils();
