import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  errorMessage?: string;
  arg?: string | null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    this.arg = this.route.snapshot.queryParamMap.get('arg');
  }

  

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    let loginInfo = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.userService.userSignIn(loginInfo)
      .subscribe((response: string) => {
      if (response === 'success') {
        this.location.back();
      } else {
        this.errorMessage = response;
      }
    });
  }

}
