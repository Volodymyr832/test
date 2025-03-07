import { expect } from 'chai';
import sinon from 'sinon';
import { Bicycle } from '../../src/bicycle.js';

describe('Bicycle Class', () => {
    let bicycle: Bicycle;
    let moveSpy: sinon.SinonSpy;
    let stopSpy: sinon.SinonSpy;

    beforeEach(() => {
        bicycle = new Bicycle('Giant', 20);
        moveSpy = sinon.spy(bicycle, 'move');
        stopSpy = sinon.spy(bicycle, 'stop');
    });

    afterEach(() => {
        moveSpy.restore();
        stopSpy.restore();
    });

    it('should move correctly', () => {
        const result = bicycle.move();
        expect(result).to.equal('Giant is moving at 20 km/h using pedals.');
        expect(moveSpy.calledOnce).to.be.true;
    });

    it('should stop correctly', () => {
        const result = bicycle.stop();
        expect(result).to.equal('Giant has stopped.');
        expect(stopSpy.calledOnce).to.be.true;
    });

    it('should increase speed', () => {
        bicycle.increaseSpeed(10);
        expect(bicycle.speed).to.equal(30);
    });

    it('should throw an error when increasing speed by a negative value', () => {
        expect(() => bicycle.increaseSpeed(-5)).to.throw('Amount must be greater than zero');
    });
});
