import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myLocalStorage;
  userName: string;
  userDetails: any[] = [];
  loginStatus$: Observable<boolean>;


  constructor(public loginService: LoginService, public userService: UserService, private router: Router) {
    this.myLocalStorage = localStorage;

  }


  ngOnInit() {
    this.loginStatus$ = this.loginService.isLoggedIn;
    this.getCurrentUserFullName();
  }





  onLogout(): void {
    if (this.loginService.checkLogin()) {
      this.loginService.logout();
      this.router.navigateByUrl("/");
    }

  }

  getCurrentUserFullName() {
    console.log(this.myLocalStorage.currentUser.length);
    this.loginService.isLoggedIn.subscribe((data) => {
      console.log("logged in: " + data);
      if (data) {
        this.userService.getUserByEmail().subscribe((data) => {
          this.userDetails.push(data);
          this.userName = this.userDetails[0].firstName + " " + this.userDetails[0].lastName;
          console.log(this.userName);
        });
      }
    });
  }
}


