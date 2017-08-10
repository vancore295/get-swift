import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../classes/package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  @Input() package: Package;

  constructor() { }

  ngOnInit() {
  }

}
