import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginModalService {
  private showSubject = new Subject<void>();

  /**
   * Observable of requests to show the login modal.
   */
  get shows(): Observable<void> {
    return this.showSubject.asObservable();
  }

  /**
   * Ask anyone listening (AppComponent) to show the login modal.
   */
  show(): void {
    this.showSubject.next(null);
  }
}
