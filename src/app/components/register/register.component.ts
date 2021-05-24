import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  errors: string[];


  constructor(public userService: UserService, private formBuilder: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  get f() {
    return this.registerForm.value;
  }

  onSubmit() {
    this.userService.addUser(this.registerForm.value).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      this.errors = error.errors;

    }
    )
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.userService.getUserByEmail(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      )
    }
  }

}

function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
