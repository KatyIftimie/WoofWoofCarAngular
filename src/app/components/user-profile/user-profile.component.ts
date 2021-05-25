import { RideService } from 'src/app/services/ride.service';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  usersRides: any[] = [];
  editedUser: any;

  constructor(private userService: UserService, private rideService: RideService) { }

  ngOnInit() {
    this.getUser();
    this.userService.getUserByEmail(localStorage.getItem("userEmail")).subscribe((data) => {
      this.user = data;
      console.log(this.user);


      this.rideService.getRidesByUserId(this.user.userId.toString()).subscribe((data: []) => {
        this.usersRides = data;
      })
    })

  }

  getUser(): void {
    this.userService.getUserByEmail(localStorage.getItem("userEmail")).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    })
  }

  countRides() {
    let counter: number = 0;
    if (this.usersRides && this.usersRides.length > 0) {
      for (let e of this.usersRides) {
        counter++;
      }
    }
    return counter;
  }

  firstPostedRide() {
    let firstDate: string;
    if (this.usersRides && this.usersRides.length > 0) {
      firstDate = this.usersRides[0].departureTime.split("T");
      console.log(firstDate[0]);
    }

    return firstDate[0];
  }

  public calculateAge() {
    if (this.user.birthDate) {
      let birthDate = new Date(this.user.birthDate);

      let timeDiff = Math.abs(Date.now() - birthDate.getTime());

      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

  }


  updateUser(user: Object): void {
    this.userService.updateUser(user).subscribe((response: Object) => {
      console.log(response);
      this.getUser();
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }
    )
  }

  onOpenModal(user: Object): void {
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = "none";
    button.setAttribute('data-toggle', 'modal');
    this.editedUser = user;
    button.setAttribute('data-target', '#updateEmployeeModal');
    console.log(this.editedUser);

    container.appendChild(button);
    button.click();

  }

}


