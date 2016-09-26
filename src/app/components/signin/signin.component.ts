import { Component } from '@angular/core';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

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
  selector: 'fs-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: [
    './signin.component.css'
  ]
})
export class SignInComponent {
  public errMessage = '';
  public loading = false;
  public signinForm: FormGroup;
  public email = new FormControl('', [
    Validators.required,
    naiveEmailValidation
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signinForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  submit($event) {
    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    this.errMessage = '';

    const credentials = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService
        .signIn(credentials)
        .then(() => {
          this.loading = false;
          this.router.navigate(['/']);
        }, err => {
          this.loading = false;
          this.errMessage = err.message;
        });
  }
}
