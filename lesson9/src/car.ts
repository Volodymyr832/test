import { Vehicle } from './vehicle';

export class Car extends Vehicle {
    private fuel: number;

    constructor(name: string, speed: number, fuel: number) {
        super(name, speed);
        this.fuel = fuel;
    }

    move(): void {
        if (this.fuel > 0) {
            console.log(`${this.name} is driving at ${this.speed} km/h.`);
            this.fuel--;
        } else {
            console.log(`${this.name} cannot drive — no fuel.`);
        }
    }

    refuel(amount: number): void {
        this.fuel += amount;
        console.log(`${this.name} has been refueled with ${amount} liters.`);
    }
}
