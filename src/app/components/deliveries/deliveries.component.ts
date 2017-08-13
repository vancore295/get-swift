import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { DeliveriesService } from '../../services/deliveries.service';


// Classes
import { Drone } from '../../classes/drone';
import { Package } from '../../classes/package';
import { Marker } from '../../classes/marker';
import { Location } from '../../classes/location';
import { Assignment } from '../../classes/assignment';
import { TravelInfo } from '../../classes/travelInfo';

const depo: Location = {
  latitude: -37.816664,
  longitude: 144.963848
};

// drone speed in km/h
const droneSpeed = 50;

// For calculating radians when calculating distance between to set of cordinates
const R = 6371; // meters

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})

export class DeliveriesComponent implements OnInit {
  drones: Drone[] = [];
  assignedDrones: Drone[] = [];
  packages: Package[] = [];
  assignments: Assignment[] = [];


  constructor(private deliveriesservice: DeliveriesService) {
    this.getDrones();
    this.getPackages();
  }

  ngOnInit() {
  }

  getDrones(): void {
    this.deliveriesservice.getDrones().then(drones => this.drones = drones);
  }
  getPackages(): void {
    this.deliveriesservice.getPackages().then(packages => this.packages = packages);
  }

  assignDrones(drones: Drone[]): void {
    // scan list of drones that have packages already and move them to the assignments array
    this.drones = this.assignDronesWithPackages(drones);

    console.log(this.assignments);
  }

  queueUpDrones(drones: Drone[], packages: Package[]): void {
    // Get travel times for each drone back to the depo
    this.getTravelTimes(drones);

    // sort drones by travel time
    this.sortDronesByTravelTime(drones);

    // give sorted drones a package
    drones = this.giveDronePackage(drones, packages);
  }

  // calculate distance to the depo by using the haversine formula
  findTravelTimeToDepo(drone: Drone): TravelInfo {
    let travelInfo: TravelInfo;

    const distance = this.calculateDistance(drone.location.latitude, drone.location.longitude, depo.latitude, depo.longitude);

    const travelTime = this.calculateTravelTime(distance);

    travelInfo = {
      distance: distance,
      travelTime: travelTime
    };

    return travelInfo;
  }

  // assign drones
  assignDronesWithPackages(drones: Drone[]): Drone[] {
    for (let i = 0; i < drones.length; i++) {
      if ( drones[i].packages.length > 0) {
        // take unassigned drone and add it to the assignements array
        this.assignments.push(this.createAssignment(drones[i]));

        // add drone to assigned drones
        this.assignedDrones.push(drones[i]);
      }
    }

    // remove drone from main drones array
    for (let i = 0; i < this.assignedDrones.length; i++) {
      drones = this.removeAssignedDrone(this.assignedDrones[i], drones);
    }

    return drones;
  }

  // give drones with out packages a package and remove it from the packages array
  giveDronePackage(drones: Drone[], packages: Package[]): Drone[] {
    for (let i = 0; i < drones.length; i++) {
      drones[i].packages = [packages[0]];
      this.removeAssignedPackage(packages[0]);
    }

    return drones;
  }

  // find travel infor for each drone in the field
  getTravelTimes(drones: Drone[]): Drone[] {
    drones.forEach(drone => drone.travelInfo = this.findTravelTimeToDepo(drone));

    return drones;
  }

  // sort drones by travel time from current postion to depo
  sortDronesByTravelTime(drones: Drone[]): Drone[] {
    // drones.sort(this.compaireTravelTimes());
    drones.sort(function(a, b){
      if (a.travelInfo.travelTime < b.travelInfo.travelTime) {
        return -1;
      }
      if (a.travelInfo.travelTime > b.travelInfo.travelTime) {
        return 1;
      }
      return 0;
    });

    return drones;
  }

  // create a new assignemnt for a loaded drone and add it to the assignments array
  createAssignment(loadedDrone: Drone): Assignment {
    let newAssignment: Assignment;

    newAssignment = {
      droneId: loadedDrone.droneId,
      packageId: loadedDrone.packages[0].packageId
    };

    return newAssignment;
  }

  // remove assigned drones from base drones array
  removeAssignedDrone(assignedDrone: Drone, drones: Drone[]): Drone[] {
    const index = drones.findIndex( drone => drone.droneId === assignedDrone.droneId);
    drones.splice(index, 1);

    return drones;
  }

  // remove assigned package form package array
  removeAssignedPackage(assignedPackage: Package): void {
    const index = this.packages.findIndex(newPackage => newPackage.packageId === assignedPackage.packageId);
    this.packages.splice(index, 1);
  }

  // Calculates destance between two sets of geocordinates in kilometers
  calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
    const lat1 = this.toRadians(latitude1);
    const lat2 = this.toRadians(latitude2);
    const deltaLat = this.toRadians(lat2 - lat1);
    const deltaLong = this.toRadians(longitude2 - longitude1);

    const haversine = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                    Math.cos(lat1)  * Math.cos(lat2) *
                    Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

    const distance = R * c;

    return distance;
  }

  // calcuate travel time in hours
  calculateTravelTime(distance: number): number {
    const time = distance / droneSpeed;

    return time;
  }

  // convert latitude/longitude cordinates into radians
  toRadians(num: number): number {
    const radians = num * (Math.PI / 180);

    return radians;
  }

  // compare travel times for sorting
  compaireTravelTimes(travelInfo1: TravelInfo, travelInfo2: TravelInfo) {
    if (travelInfo1.travelTime < travelInfo2.travelTime) {
      return -1;
    }
    if (travelInfo1.travelTime > travelInfo2.travelTime) {
      return 1;
    }

    return 0;
  }

}
