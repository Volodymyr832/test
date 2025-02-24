export interface IVehicle {
    name: string;
    speed: number;
    move(): void;
    stop(): void;
}
