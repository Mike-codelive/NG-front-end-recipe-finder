import { Component, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  alertSubscription: Subscription;

  alerts: string[] = [];

  userData: { email: string; password: string } = {
    email: '',
    password: '',
  };

  showLoginForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.alertSubscription = alertService.getAlerts().subscribe((message) => {
      this.alerts.push(message);
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getEmail(emailInput: any): string {
    if (emailInput?.errors?.required) {
      return 'Email is required.';
    }
    return 'Enter your email';
  }

  getPassword(passwordInput: any): string {
    if (passwordInput?.errors?.required) {
      return 'Password is Required';
    }
    return 'Enter your password';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userData.email = this.loginForm.value.email;
      this.userData.password = this.loginForm.value.password;

      console.log('Form submitted with data:', this.userData);

      this.loginService
        .login(this.userData.email, this.userData.password)
        .subscribe(
          (response) => {
            localStorage.setItem('jwt', response.token);
            console.log(response);
            this.showLoginForm = false;
            this.authService.setLoggedIn(true);
          },
          (error) => {
            this.alertService.showError(error.error.message);
          }
        );
    } else {
      console.log('Form is invalid.');
    }
  }
}
