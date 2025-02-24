import { Vehicle } from './vehicle';

export class Bicycle extends Vehicle {
    constructor(name: string, speed: number) {
        super(name, speed);
    }

    move(): void {
        console.log(`${this.name} is moving at ${this.speed} km/h using pedals.`);
    }
}
