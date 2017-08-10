import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Drone } from './../classes/drone';
import { Package } from './../classes/package';

@Injectable()
export class DeliveriesService {
  drones: Drone[];
  packages: Package[];

  private _urls: any = {
    drones: '/deliveries/drones',
    packages: '/deliveries/packages'
  };

  constructor(private http: Http) {}

  async getDrones(): Promise<Drone[]> {
    try {
      let response = await this.http
        .get(this._urls.drones)
        .toPromise();
        console.log(response);
        let data = JSON.parse(response['_body']);
        return data as Drone[];
    } catch (error) {
        await console.log(error);
      }
  }

    async getPackages(): Promise<Package[]> {
    try {
      let response = await this.http
        .get(this._urls.packages)
        .toPromise();
        console.log(response);
        let data = JSON.parse(response['_body']);
        return data as Package[];
    } catch (error) {
        await console.log(error);
      }
  }

}
