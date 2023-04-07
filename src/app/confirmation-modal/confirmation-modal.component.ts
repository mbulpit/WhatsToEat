import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  constructor(private user: UserService,
              private router: Router) {}

  deleteAccount() {
    this.user.deleteSignedInAccount();
    this.router.navigate(['']);
    this.user.toggleConfirmationModal();
  }

  onCancel() {
    this.user.toggleConfirmationModal();
  }

}
