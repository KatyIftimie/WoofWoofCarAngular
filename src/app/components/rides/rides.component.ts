
import { Ride } from './../../models/ride';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {
  rides: any[];


  constructor(private rideService: RideService) { }

  ngOnInit() {
    this.rideService.getAllRides().subscribe((data: []) => {
      this.rides = data;
    })
  }

  getDay(dateTime: string) {
    const day = dateTime.split("T");
    return day[0];
  }

  getTime(dateTime: string) {
    const time = dateTime.split("T");
    return time[1].slice(0, 5);
  }
}
