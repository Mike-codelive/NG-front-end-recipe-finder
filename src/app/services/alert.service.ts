import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<string>();

  getAlerts() {
    return this.alertSubject.asObservable();
  }

  showError(message: string) {
    this.alertSubject.next(message);
  }
}
