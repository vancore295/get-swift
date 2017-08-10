import { Destination } from './destination';
import { Package } from './package';
import { Location } from './location';

export class Drone {
    droneId: number;
    location: Location;
    pacakges: Package[];
}

