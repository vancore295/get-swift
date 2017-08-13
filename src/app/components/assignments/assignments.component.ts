import { Component, OnInit, Input } from '@angular/core';

import { Marker } from '../../classes/marker';
import { Assignment } from '../../classes/assignment';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  @Input() markers: Marker[] = [];
  @Input() assignments: Assignment[] = [];

   depo = {
    latitude: -37.816664,
    longitude: 144.963848
  };

  constructor() { }

  ngOnInit() { }

  }
