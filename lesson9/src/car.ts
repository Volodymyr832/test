import { Vehicle } from './vehicle';
import { IMotorVehicle } from './motor-vehicle';

export class Car extends Vehicle implements IMotorVehicle {
    private fuel: number;
    private engineCapacity: number;

    constructor(name: string, speed: number, fuel: number, engineCapacity: number) {
        super(name, speed);
        this.fuel = fuel;
        this.engineCapacity = engineCapacity;
    }

    getEngineCapacity(): number {
        return this.engineCapacity;
    }

    move(): void {
        if (this.fuel > 0) {
            console.log(`${this.name} is driving at ${this.speed} km/h.`);
            this.fuel--;
        } else {
            throw new Error(`${this.name} cannot drive — no fuel.`);
        }
    }

    refuel(amount: number): void {
        this.fuel += amount;
        console.log(`${this.name} has been refueled with ${amount} liters.`);
    }
}
