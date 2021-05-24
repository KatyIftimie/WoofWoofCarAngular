import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myLocalStorage;

  loginStatus$: Observable<boolean>;
  currentUser$: Observable<any>;


  constructor(public userService: UserService, private router: Router) {
    this.myLocalStorage = localStorage;
    this.loginStatus$ = this.userService.isLoggedIn;

  }


  ngOnInit(): void {
    this.loginStatus$ = this.userService.isLoggedIn;

    this.currentUser$ = this.userService.getUserByEmail(localStorage.getItem("userEmail"));
  }





  onLogout() {
    if (this.userService.isLoggedIn) {

      this.userService.logout();
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });

    }

  }

}


