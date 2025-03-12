import { useVehicle } from '../../src/vehicle-service';
import { IVehicle } from '../../src/interfaces';

describe('VehicleService', () => {
    const mockVehicle = {
        name: 'TestVehicle',
        speed: 50,
        move: jest.fn(() => 'TestVehicle is moving.'),
        stop: jest.fn(() => 'TestVehicle has stopped.')
    } as unknown as IVehicle;

    it('should call move and stop methods', () => {
        const result = useVehicle(mockVehicle);
        expect(result).toBe('TestVehicle is moving. Then, TestVehicle has stopped.');
        expect(mockVehicle.move).toHaveBeenCalled();
        expect(mockVehicle.stop).toHaveBeenCalled();
    });
});
