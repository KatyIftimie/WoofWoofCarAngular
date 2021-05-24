import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'woofwoofcarangular';
  myLocalStorage;
  isLoggedin;


  public constructor(private userService: UserService, private router: Router) {
    this.myLocalStorage = localStorage;
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    console.log("token from app component : " + token);
    this.userService.loadTokenIntoHeaders(token).subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    });
  }
}
