import { expect } from 'chai';
import sinon from 'sinon';
import { useVehicle } from '../../src/vehicle-service.js';
import { IVehicle } from '../../src/interfaces.js';

describe('VehicleService', () => {
    let mockVehicle: IVehicle;
    let moveStub: sinon.SinonStub;
    let stopStub: sinon.SinonStub;

    beforeEach(() => {
        moveStub = sinon.stub().returns('TestVehicle is moving.');
        stopStub = sinon.stub().returns('TestVehicle has stopped.');

        mockVehicle = {
            name: 'TestVehicle',
            speed: 50,
            move: moveStub,
            stop: stopStub
        };
    });

    it('should call move and stop methods', () => {
        const result = useVehicle(mockVehicle);
        expect(result).to.equal('TestVehicle is moving. Then, TestVehicle has stopped.');

        expect(moveStub.calledOnce).to.be.true;
        expect(stopStub.calledOnce).to.be.true;
    });
});
