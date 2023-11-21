import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMenuOpen$: Observable<boolean> = this.isMenuOpenSubject.asObservable();

  toggleMenu() {
    this.isMenuOpenSubject.next(!this.isMenuOpenSubject.value);
  }
}
