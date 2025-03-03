import { Car } from './car.js';
import { Bicycle } from './bicycle.js';
import { useVehicle } from './vehicle-service.js';

const myCar = new Car('Toyota', 120, 50);
const myBicycle = new Bicycle('Giant', 20);

console.log(useVehicle(myCar));
console.log(useVehicle(myBicycle));
