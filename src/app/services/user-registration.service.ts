import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://recipe-finder-appi.miguelangeldevs.repl.co/register';

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}`, userData);
  }
}
