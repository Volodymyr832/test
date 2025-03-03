import { expect } from 'chai';
import sinon from 'sinon';
import { Car } from '../../src/car.js';

describe('Car Class', () => {
    let car: Car;

    beforeEach(() => {
        car = new Car('Toyota', 120, 10);
    });

    it('should drive if there is fuel', () => {
        expect(car.move()).to.equal('Toyota is driving at 120 km/h.');
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
