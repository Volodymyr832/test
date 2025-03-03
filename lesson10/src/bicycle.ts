export class Bicycle {
    constructor(
        public name: string,
        public speed: number
    ) {}

    move(): string {
        return `${this.name} is moving at ${this.speed} km/h`;
    }

    stop(): string {
        return `${this.name} has stopped`;
    }

    increaseSpeed(amount: number): void {
        if (amount <= 0) throw new Error('Amount must be greater than zero');
        this.speed += amount;
    }
}
