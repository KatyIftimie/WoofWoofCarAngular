import { RegisterService } from './../../services/register.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  newUser: User = new User();
  registered = false;


  constructor(public registerService: RegisterService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.registerService.dataForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      // acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.registerService.dataForm.value;
  }

  onSubmit() {


    if (this.registerService.dataForm.value.password == this.registerService.dataForm.value.confirmPassword) {
      console.log(this.registerService.dataForm.value);
      if (this.registerService.dataForm.dirty && this.registerService.dataForm.valid) {
        this.newUser = this.registerService.dataForm.value;
        this.registerService.addUser(this.newUser)
          .subscribe(
            data => {
              this.registered = true;
              this.newUser = new User();
            },
            error => console.log(this.registerService.dataForm.value.error)
          );
      }
    }
    if (this.registerService.dataForm.invalid) {

      return;
    }

  }
  // onReset() {
  //   this.registered = false;
  //   this.registerService.dataForm.reset();
  // }


}



//   // // custom validator to check that two fields match
//   MustMatch(controlName: string, matchingControlName: string) {
//     return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//         // return if another validator has already found an error on the matchingControl
//         return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//         matchingControl.setErrors({ mustMatch: true });
//       } else {
//         matchingControl.setErrors(null);
//       }
//     }
//   }
// }
