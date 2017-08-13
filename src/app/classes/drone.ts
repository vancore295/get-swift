import { Destination } from './destination';
import { Package } from './package';
import { Location } from './location';
import { TravelInfo } from './travelInfo';

export class Drone {
    droneId: number;
    location: Location;
    packages: Package[] = [];
    travelInfo: TravelInfo;
}

