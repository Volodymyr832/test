import { Vehicle } from './vehicle.js';

export class Car extends Vehicle {
    private fuel: number;

    constructor(name: string, speed: number, fuel: number) {
        super(name, speed);
        this.fuel = fuel;
    }

    move(): string {
        if (this.fuel > 0) {
            this.fuel--;
            return `${this.name} is driving at ${this.speed} km/h.`;
        } else {
            throw new Error(`${this.name} cannot drive — no fuel.`);
        }
    }

    stop(): string {
        return `${this.name} has stopped.`;
    }

    refuel(amount: number): void {
        this.fuel += amount;
    }
}
