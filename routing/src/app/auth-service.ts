import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }
  constructor() {}
}
