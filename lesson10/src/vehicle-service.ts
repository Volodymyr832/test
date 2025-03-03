import { IVehicle } from './interfaces';

export function useVehicle(vehicle: IVehicle): string {
    vehicle.move();
    vehicle.stop();
    return `${vehicle.name} has finished moving.`;
}

export function sumSpeeds(vehicles: IVehicle[]): number {
    return vehicles.reduce((total, vehicle) => total + vehicle.speed, 0);
}
