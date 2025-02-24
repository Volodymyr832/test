import { IVehicle } from './interfaces';

export abstract class Vehicle implements IVehicle {
    constructor(
        public name: string,
        public speed: number
    ) {}

    abstract move(): void;

    stop(): void {
        console.log(`${this.name} has stopped.`);
    }
}
