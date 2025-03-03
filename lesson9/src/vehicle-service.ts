import { Vehicle } from './vehicle';

export function useVehicle(vehicle: Vehicle): void {
    vehicle.move();
    vehicle.stop();
}
