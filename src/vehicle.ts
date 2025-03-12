import { IVehicle } from './interfaces.js';

export abstract class Vehicle implements IVehicle {
    constructor(
        public name: string,
        public speed: number
    ) {}

    abstract move(): string;

    stop(): string {
        return `${this.name} has stopped.`;
    }
}
