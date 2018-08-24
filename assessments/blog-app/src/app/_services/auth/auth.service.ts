import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authCheck = new Subject<any>();
  constructor(private _router: Router) { }

  signUp() {

  }

  login(credentials) {
    if (credentials.username === 'a' && credentials.password === 'a') {
      this.$authCheck.next(true);
      this._router.navigate(['/home']);
    } else {
      alert('Access denied.');
    }
  }

}
