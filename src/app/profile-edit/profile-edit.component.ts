import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  profile = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  changesSaved = false;

  profileForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(3)],
      confirmPassword: [''],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  updateProfile() {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      const apiUrl = 'https://recipe-finder-appi.miguelangeldevs.repl.co/users';
      const jwt = localStorage.getItem('jwt');

      if (!jwt) {
        console.error('JWT token is missing in local storage');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

      this.http.put(apiUrl, profileData, { headers }).subscribe(
        (response) => {
          this.profileForm.reset();
          console.log('Profile updated successfully', response);
          this.changesSaved = true;
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

  accountSettingsElements = new QueryList<ElementRef>();

  ngAfterViewInit() {
    this.accountSettingsElements.changes.subscribe(() => {
      if (this.accountSettingsElements.first) {
        this.accountSettingsElements.first.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }

  onSubmit() {
    this.updateProfile();
  }
}
