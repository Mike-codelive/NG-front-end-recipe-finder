import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

  constructor(private http: HttpClient) {}

  public checkLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
  }

  isRecipeSaved(recipeId: number): Observable<boolean> {
    const isSavedUrl = `https://recipe-finder-appi.miguelangeldevs.repl.co/recipes/user${recipeId}`;

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<boolean>(isSavedUrl, { headers });
  }
}
