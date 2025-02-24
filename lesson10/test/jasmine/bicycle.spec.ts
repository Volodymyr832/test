import { Bicycle } from '../../src/bicycle';

describe('Bicycle Class', () => {
    let bicycle: Bicycle;

    beforeEach(() => {
        bicycle = new Bicycle('Giant', 20);
    });

    it('should create a bicycle with a name and speed', () => {
        expect(bicycle.name).toBe('Giant');
        expect(bicycle.speed).toBe(20);
    });

    it('should move and return correct message', () => {
        const message = bicycle.move();
        expect(message).toBe('Giant is moving at 20 km/h');
    });

    it('should stop and return correct message', () => {
        const message = bicycle.stop();
        expect(message).toBe('Giant has stopped');
    });

    it('should increase speed by a given amount', () => {
        bicycle.increaseSpeed(10);
        expect(bicycle.speed).toBe(30);
    });

    it('should throw an error when increasing speed by zero or negative amount', () => {
        expect(() => bicycle.increaseSpeed(0)).toThrowError('Amount must be greater than zero');
        expect(() => bicycle.increaseSpeed(-5)).toThrowError('Amount must be greater than zero');
    });
});
