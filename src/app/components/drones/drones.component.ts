import { Component, OnInit, Input } from '@angular/core';
import { Drone } from '../../classes/drone';
import { Package } from '../../classes/package';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css']
})
export class DronesComponent implements OnInit {
  @Input() drone: Drone;

  constructor() { }

  ngOnInit() {
  }

}
