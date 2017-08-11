import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
   depo = {
    latitude: -37.816664,
    longitude: 144.963848
  };

  constructor() { }

  ngOnInit() { }

  }
