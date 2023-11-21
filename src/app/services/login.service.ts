import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MenuService } from '../menuservice.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenKey = 'jwt';

  showLoginForm: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private menuService: MenuService,
    private authService: AuthService
  ) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.validateToken(token);
    }
    console.log('LoginService initialized');
  }

  private validateToken(token: string) {
    if (token) {
      const tokenData = this.parseToken(token);
      if (tokenData && tokenData.exp) {
        const expirationTime = new Date(tokenData.exp * 1000).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiration = expirationTime - currentTime;

        console.log(
          'Token expiration time (UTC):',
          new Date(tokenData.exp * 1000).toUTCString()
        );
        console.log('Current time (UTC):', new Date().toUTCString());
        console.log('Time until expiration (ms):', timeUntilExpiration);

        if (timeUntilExpiration > 0) {
          setTimeout(() => {
            this.logout();
          }, timeUntilExpiration);
        }
      }
    }
    this.authService.setLoggedIn(true);
  }

  public initTokenExpirationTimer(token: string) {
    if (token) {
      const tokenData = this.parseToken(token);
      if (tokenData && tokenData.exp) {
        const expirationTime = new Date(tokenData.exp * 1000).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiration = expirationTime - currentTime;

        console.log(
          'Token expiration time (UTC):',
          new Date(tokenData.exp * 1000).toUTCString()
        );
        console.log('Current time (UTC):', new Date().toUTCString());
        console.log('Time until expiration (ms):', timeUntilExpiration);

        if (timeUntilExpiration > 0) {
          setTimeout(() => {
            this.logout();
          }, timeUntilExpiration);
        }
      }
    }
  }

  private parseToken(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password,
    };

    interface LoginResponse {
      token: string;
    }

    return this.http
      .post<LoginResponse>(
        'https://recipe-finder-appi.miguelangeldevs.repl.co/login',
        loginData
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('jwt', response.token);
          console.log(response);

          this.validateToken(response.token);
        })
      );
  }
  logout() {
    localStorage.removeItem('jwt');
    this.menuService.toggleMenu();
    this.authService.setLoggedIn(false);
    this.showLoginForm = false;
  }
}
