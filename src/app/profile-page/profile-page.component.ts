import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface EditProfile {
  [key: string]: boolean;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(
      private router: Router,
      private user: UserService
  ) {}



  get userInfo() {
    return this.user.signedInUser;
  }

  editProfile: EditProfile = {
    Name: false,
    Email: false,
    Password: false
  }

  p1 = '';
  p2 = '';
  emailError = '';

  ngOnInit() {
    if(!this.userInfo.name) {
      this.router.navigate(['login'], {queryParams: {arg: 'Please sign in to view your profile.'} });
    }
  }

  showEditor(field: string) {
    for (const [key, value] of Object.entries(this.editProfile)) {
      if(key === field) {
        this.editProfile[key] = true;
      } else {
        this.editProfile[key] = false;
      }
    }
  }

  hideAllEditorFields() {
    for (const [key] of Object.entries(this.editProfile)) {
      this.editProfile[key] = false;
    }
  }

  saveProfile() {
    this.user.updateUserInfo();
    this.hideAllEditorFields();
  }

  updateEmailAddress() {
    this.user.updateEmailAddress(this.userInfo.email)
      .subscribe((response: any) => {
        if(response !== 'success') {
          this.emailError = response;
        } else {
          this.emailError = '';
          this.hideAllEditorFields();
          this.router.navigate(['']);
        }
      })
  }

  onCancel() {
    this.user.reloadSavedUserData();
    this.hideAllEditorFields();
  }

  deleteAccount() {
    this.user.toggleConfirmationModal();
  }

}
