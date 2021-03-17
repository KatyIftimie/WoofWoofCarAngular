import { RideService } from './../../services/ride.service';
import { Ride } from './../../models/ride';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {


  // newRide : Ride;
  // animals: any[];
  // cars: any[];

  constructor() { }
  // constructor(private rideService: RideService, private router:Router) { }

  // ngOnInit() {
  //   this.animals.push(this.rideService.getAnimalTypes());
  //   this.cars.push(this.rideService.getCarTypes());
  //   this.newRide = new Ride();
  // }
  ngOnInit() {

  }

}
