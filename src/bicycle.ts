import { Vehicle } from './vehicle.js';

export class Bicycle extends Vehicle {
    constructor(name: string, speed: number) {
        super(name, speed);
    }

    move(): string {
        return `${this.name} is moving at ${this.speed} km/h using pedals.`;
    }

    stop(): string {
        return `${this.name} has stopped.`;
    }

    increaseSpeed(amount: number): void {
        if (amount <= 0) throw new Error('Amount must be greater than zero');
        this.speed += amount;
    }
}
