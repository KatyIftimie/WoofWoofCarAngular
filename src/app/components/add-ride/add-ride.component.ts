import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {

  newRide: Ride;
  animals: any[] = [];
  isArray: any[] = [];
  cars: any[] = [];
  userId: string;
  user: any[] = [];
  formattedDepartureAddress: string;
  formattedArrivalAddress: string;
  @ViewChild('select') select: MatSelect;

  options = {
    strictBounds: false,
    bounds: undefined,
    types: ['geocode'],
    fields: undefined,
    origin: undefined,
    componentRestrictions: {
      country: 'Ro'
    }
  }


  constructor(private rideService: RideService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.newRide = new Ride();
    this.rideService.getCarTypes().subscribe((data: []) => {
      this.cars.push(data);
    })
    this.rideService.getAnimalTypes().subscribe((data: []) => {
      this.animals.push(data);
      for (let animal of this.animals[0]) {
        animal.name = animal.name.replace("_", " ");
      }
    })
    this.userService.getUserByEmail(localStorage.getItem("userEmail")).subscribe((data) => {
      this.user.push(data);
      this.userId = this.user[0].userId;
      this.newRide.userId = this.userId;
    })

  }
  allSelected = false;

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      for (let animal of this.animals[0]) {
        let ani = animal.animalId.toString();
        if (this.isArray.indexOf(ani) > -1) {
          continue;
        }
        this.isArray.push(animal.animalId.toString());
      }
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
      this.isArray = [];
    }
  }


  optionClick() {
    let newStatus = true;
    this.isArray = []

    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
      if (item.selected) {
        this.isArray.push(item.value.toString());

      }
    });

    this.allSelected = newStatus;
  }

  getDeparture(place: any) {
    this.formattedDepartureAddress = place.formatted_address;
  }

  getArrival(place: any) {
    this.formattedArrivalAddress = place.formatted_address;
  }





  addRide() {
    this.newRide.departure = this.formattedDepartureAddress;
    this.newRide.arrival = this.formattedArrivalAddress;
    for (let animal of this.isArray) {
      this.newRide.animalTypeIds.push(animal);
    }
    this.rideService.addRide(this.newRide).subscribe(
      data => {
        this.newRide = new Ride();
        this.router.navigateByUrl("/rides");
      }
    )
  }

}
