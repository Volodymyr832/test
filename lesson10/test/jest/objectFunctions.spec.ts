import { sumSpeeds } from '../../src/vehicle-service';
import { Car } from '../../src/car';
import { Bicycle } from '../../src/bicycle';

describe('Object Functions', () => {
    test('should sum speeds correctly', () => {
        const car = new Car('Toyota', 120, 50);
        const bicycle = new Bicycle('Giant', 20);
        const result = sumSpeeds([car, bicycle]);
        expect(result).toBe(140);
    });
});
