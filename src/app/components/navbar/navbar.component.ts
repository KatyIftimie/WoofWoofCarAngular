import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myLocalStorage;


  constructor(public loginService: LoginService) {
    this.myLocalStorage = localStorage;
  }

  ngOnInit(): void {
  }


  onClick(): void {
    if (this.loginService.checkLogin()) {
      this.loginService.logout();
    }
  }
}
