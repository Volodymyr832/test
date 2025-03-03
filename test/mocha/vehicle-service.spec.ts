import { expect } from 'chai';
import sinon from 'sinon';
import { useVehicle } from '../../src/vehicle-service.js';
import { IVehicle } from '../../src/interfaces.js';

describe('VehicleService', () => {
    const mockVehicle: IVehicle = {
        name: 'TestVehicle',
        speed: 50,
        move: () => 'TestVehicle is moving.',
        stop: () => 'TestVehicle has stopped.'
    };

    it('should call move and stop methods', () => {
        const result = useVehicle(mockVehicle);
        expect(result).to.equal('TestVehicle is moving. Then, TestVehicle has stopped.');
    });
});
