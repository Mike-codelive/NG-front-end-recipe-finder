import { Component, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';
import { NgForm, NgModel } from '@angular/forms';

import { UserService } from '../services/user-registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class RegistrationComponent {
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'info' = 'success';
  displayAlert: boolean = false;

  @ViewChild('registrationForm') registrationForm!: NgForm;
  @ViewChild('usernameInput')
  usernameInput!: NgModel;

  userData: { username: string; email: string; password: string } = {
    username: '',
    email: '',
    password: '',
  };

  username: any;

  showRegistrationForm: boolean = true;

  constructor(private userService: UserService) {}

  getUsernamePlaceholder(usernameInput: NgModel): string {
    if (usernameInput) {
      if (usernameInput.errors?.['required']) {
        return 'Username is required.';
      } else if (usernameInput.errors?.['minlength']) {
        this.username = '';
        return 'Username must be at least 3 characters long.';
      }
    }
    return '';
  }

  getUseremailPlaceholder(useremailInput: NgModel): string {
    if (useremailInput) {
      if (useremailInput.errors?.['required']) {
        return 'Email is required.';
      }
    }
    return '';
  }

  getUserpasswordPlaceholder(userpasswordInput: NgModel): string {
    if (userpasswordInput) {
      if (userpasswordInput.errors?.['required']) {
        return 'password is required.';
      }
    }
    return '';
  }

  onSubmit() {
    console.log('Form submitted with data:', this.userData);

    this.userService.registerUser(this.userData).subscribe(
      (response) => {
        this.alertMessage = 'Registration successful!';
        this.alertType = 'success';
        this.displayAlert = true;

        console.log('Registration successful:', response);
      },
      (error) => {
        this.alertMessage = `${error.error.error}`;
        this.alertType = 'error';
        this.displayAlert = true;
        console.error('Registration error:', error);
      }
    );
  }
}
