import { expect } from 'chai';
import GameOfLife from '../src/components/Chart.js';

describe('Should generate 2-dimentional array of zeroes', () => {
    const grid = utils.generateGrid(50);

    it('should create an Array of length 50', () => {
        expect(grid.length).to.equal(50);
    });

    it('should create an Array of arrays', () => {
        grid.forEach(row => {
            expect(Array.isArray(row)).to.equal(true);
        });
    });

    it('every row should contain only zeroes', () => {
        grid.forEach(row => {
            row.forEach(cell =>
                expect(cell).to.equal(0));
        });
    });
});
