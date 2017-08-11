import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { DeliveriesService } from './services/deliveries.service';
import { MapsService } from './services/maps.service';

import { DronesComponent } from './components/drones/drones.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { PackagesComponent } from './components/packages/packages.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';

const ROUTES = [
  { path: '', redirectTo: 'deliveries', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveriesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DronesComponent,
    DeliveriesComponent,
    PackagesComponent,
    AssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNLqqTMG3wmPrkor9FI7jxpdlUFJhrcsI'
    })
    // RouterModule.forRoot(ROUTES)
  ],
  providers: [DeliveriesService, MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
