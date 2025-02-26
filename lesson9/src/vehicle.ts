export abstract class Vehicle {
    constructor(public name: string, public speed: number) {}

    abstract move(): void;

    stop(): void {
        console.log(`${this.name} has stopped.`);
    }
}
