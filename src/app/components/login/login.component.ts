import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  currentUser;


  constructor(public loginService: LoginService, private router: Router) {
    this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginService.sendUser(this.user).subscribe(
      data => {
        this.currentUser = this.user.email;
        localStorage.setItem('currentUser', this.user.email);
        console.log(localStorage.getItem('currentUser'));

        this.user.email = "";
        this.user.password = "";
        setInterval(() => { this.router.navigateByUrl("/"), 500 });
      },
      error => console.log(error)
    );
  }

}
