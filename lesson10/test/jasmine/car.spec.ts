import { Car } from '../../src/car';

describe('Car Class', () => {
    it('should drive when there is fuel', () => {
        const car = new Car('Toyota', 120, 10);
        expect(() => car.move()).not.toThrow();
    });

    it('should not drive without fuel', () => {
        const car = new Car('Toyota', 120, 0);
        expect(() => car.move()).toThrowError('Toyota cannot drive — no fuel.');
    });

    it('should refuel the car', () => {
        const car = new Car('Toyota', 120, 0);
        car.refuel(20);
        expect(() => car.move()).not.toThrow();
    });
});
