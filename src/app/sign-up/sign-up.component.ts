import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { passwordMatch } from '../password-match.directive';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    name: ['', 
          [Validators.required,
          Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmedPassword: ['', [Validators.required,
                            passwordMatch]]
  })


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    if(this.userInfo.name) this.router.navigate(['']);
  }

  get userInfo() {
    return this.userService.signedInUser;
  }

  error = '';
  n = this.signUpForm.controls.name;
  e = this.signUpForm.controls.email;
  p1 = this.signUpForm.controls.password;
  p2 = this.signUpForm.controls.confirmedPassword;

  onSubmit() {
    let user = {
      name: '',
      email: '',
      password: ''
    };

    user.name = this.signUpForm.value.name!;
    user.email = this.signUpForm.value.email!;
    user.password = this.signUpForm.value.password!;

    this.userService.createUser(user)
      .subscribe((response: string) => {
        if(response !== 'Success') {
          this.error = response;
        } else {
          this.router.navigate(['']);
        }
      })
  }

}
