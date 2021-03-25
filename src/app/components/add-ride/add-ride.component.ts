import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/models/ride';
import { User } from 'src/app/models/user';
import { RideService } from 'src/app/services/ride.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {

  newRide: Ride;
  animals: any[] = [];
  cars: any[] = [];
  userId: string;
  user: any[] = [];


  constructor(private rideService: RideService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.newRide = new Ride();
    // this.animals.push(this.rideService.getAnimalTypes());
    this.rideService.getCarTypes().subscribe((data: []) => {
      this.cars.push(data);
      console.log(this.cars);
    })
    this.rideService.getAnimalTypes().subscribe((data: []) => {
      this.animals.push(data);
      console.log(this.animals);
    })
    this.userService.getUserByEmail().subscribe((data) => {
      // const e = data.toString();
      // console.log(e);
      // console.log(data);
      this.user.push(data);
      this.userId = this.user[0].userId;
      this.newRide.userId = this.userId;
      console.log(this.userId);
      // console.log(this.userId);
      // this.userId = data.valueOf()
    })

  }


  addRide() {
    console.log(this.newRide);
    this.rideService.addRide(this.newRide).subscribe(
      data => {
        console.log(data);
        this.newRide = new Ride();
        this.router.navigateByUrl("/rides");
      }
    )
  }
}
