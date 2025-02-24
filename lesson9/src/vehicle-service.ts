import { IVehicle } from './interfaces';

export function useVehicle(vehicle: IVehicle): void {
    vehicle.move();
    vehicle.stop();
}
