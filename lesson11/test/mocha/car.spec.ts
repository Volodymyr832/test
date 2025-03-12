import { expect } from 'chai';
import sinon from 'sinon';
import { Car } from '../../src/car.js';

describe('Car Class', () => {
    let car: Car;
    let moveSpy: sinon.SinonSpy;
    let stopSpy: sinon.SinonSpy;

    beforeEach(() => {
        car = new Car('Toyota', 120, 10);
        moveSpy = sinon.spy(car, 'move');
        stopSpy = sinon.spy(car, 'stop');
    });

    afterEach(() => {
        moveSpy.restore();
        stopSpy.restore();
    });

    it('should drive if there is fuel', () => {
        const result = car.move();
        expect(result).to.equal('Toyota is driving at 120 km/h.');
        expect(moveSpy.calledOnce).to.be.true;
    });

    it('should stop correctly', () => {
        const result = car.stop();
        expect(result).to.equal('Toyota has stopped.');
        expect(stopSpy.calledOnce).to.be.true;
    });

    it('should not drive if there is no fuel', () => {
        car.refuel(-10);
        expect(() => car.move()).to.throw(Error, 'Toyota cannot drive — no fuel.');
    });

    it('should refuel correctly', () => {
        car.refuel(20);
        expect((car as any).fuel).to.equal(30);
    });
});
