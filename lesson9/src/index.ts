import { Car } from './car';
import { Bicycle } from './bicycle';
import { useVehicle } from './vehicle-service';

const myCar = new Car('Toyota', 120, 50);
const myBicycle = new Bicycle('Giant', 20);

useVehicle(myCar);
useVehicle(myBicycle);

myCar.refuel(20);
myCar.move();
myCar.stop();

myBicycle.move();
myBicycle.stop();
