import { expect } from 'chai';
import { useVehicle, sumSpeeds } from '../../src/vehicle-service';
import { Car } from '../../src/car';
import { Bicycle } from '../../src/bicycle';

describe('Vehicle Service', () => {
    it('should use vehicle and return correct message', () => {
        const car = new Car('Toyota', 120, 50);
        const result = useVehicle(car);
        expect(result).to.equal('Toyota has finished moving.');
    });

    it('should sum speeds of multiple vehicles', () => {
        const car = new Car('Toyota', 120, 50);
        const bicycle = new Bicycle('Giant', 20);
        const result = sumSpeeds([car, bicycle]);
        expect(result).to.equal(140);
    });
});
