import { RegisterService } from './../../services/register.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';


class PasswordMustMatch {
  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if ((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  newUser: User = new User();
  registered = false;


  constructor(public registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.registerService.dataForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required]
      // acceptTerms: [false, Validators.requiredTrue]
    },
      { validators: PasswordMustMatch.passwordsMatch }
    );

    console.log(this.registerService.dataForm.errors);
  }

  get f() {
    return this.registerService.dataForm.value;
  }

  onSubmit() {


    if (this.registerService.dataForm.value.password == this.registerService.dataForm.value.confirmPassword) {
      console.log(this.registerService.dataForm.value);
      console.log(this.registered)
      if (this.registerService.dataForm.dirty && this.registerService.dataForm.valid) {
        this.newUser = this.registerService.dataForm.value;
        this.registerService.addUser(this.newUser)
          .subscribe(
            data => {
              this.registered = true;
              console.log(data);
              this.newUser = new User();
              setInterval(() => { this.router.navigateByUrl("/login"), 500 });

            },
            error => console.log(error)
          );
      }
    }
    if (this.registerService.dataForm.invalid) {

      return;
    }

  }

}

