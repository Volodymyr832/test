import { expect } from 'chai';
import { Bicycle } from '../../src/bicycle.js';

describe('Bicycle Class', () => {
    let bicycle: Bicycle;

    beforeEach(() => {
        bicycle = new Bicycle('Giant', 20);
    });

    it('should move correctly', () => {
        expect(bicycle.move()).to.equal('Giant is moving at 20 km/h using pedals.');
    });

    it('should stop correctly', () => {
        expect(bicycle.stop()).to.equal('Giant has stopped.');
    });

    it('should increase speed', () => {
        bicycle.increaseSpeed(10);
        expect(bicycle.speed).to.equal(30);
    });

    it('should throw an error when increasing speed by a negative value', () => {
        expect(() => bicycle.increaseSpeed(-5)).to.throw('Amount must be greater than zero');
    });
});
