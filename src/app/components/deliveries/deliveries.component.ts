import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { DeliveriesService } from '../../services/deliveries.service';
import { Drone } from '../../classes/drone';
import { Package } from '../../classes/package';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  drones: Drone[];
  packages: Package[];
  assignments = [];

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

}
