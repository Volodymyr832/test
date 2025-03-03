import { IVehicle } from './interfaces.js';

export function useVehicle(vehicle: IVehicle): string {
    return `${vehicle.move()} Then, ${vehicle.stop()}`;
}

export function sumSpeeds(vehicles: IVehicle[]): number {
    return vehicles.reduce((total, vehicle) => total + vehicle.speed, 0);
}
