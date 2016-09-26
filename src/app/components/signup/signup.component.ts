import { Component } from '@angular/core';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

function matchesOtherControl(control: FormControl) {
  return (otherControl) => {
    if (control.value !== otherControl.value) {
      return {
        noMatch: true
      }
    }

    return null;
  };
}

function naiveEmailValidation(control: FormControl) {
  if (/(.+)@(.+){2,}\.(.+){2,}/.test(control.value)) {
    return null;
  } else {
    return {
      email: true
    };
  }
}

@Component({
  selector: 'fs-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css'
  ]
})
export class SignUpComponent {
  public errMessage = '';
  public saving = false;
  public signupForm: FormGroup;
  public email = new FormControl('', [
    Validators.required,
    naiveEmailValidation
  ]);
  public confirmEmail = new FormControl('', [
    Validators.required,
    naiveEmailValidation,
    matchesOtherControl(this.email)
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  public confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    matchesOtherControl(this.password)
  ]);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      email: this.email,
      confirmEmail: this.confirmEmail,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  submit($event) {
    if (this.signupForm.invalid) {
      return;
    }

    this.saving = true;
    this.errMessage = '';

    const credentials = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService
        .createUser(credentials)
        .then(() => {
          this.saving = false;
          this.router.navigate(['/']);
        }, err => {
          this.saving = false;
          this.errMessage = err.message;
        });
  }
}
