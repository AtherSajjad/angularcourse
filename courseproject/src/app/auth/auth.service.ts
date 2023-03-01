import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private logoutInterval: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleErrorMessage),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleErrorMessage),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    if (this.logoutInterval) {
      clearInterval(this.logoutInterval);
    }
    this.logoutInterval = null;
  }

  autoLogin() {
    let userData: {
      name: string;
      id: string;
      _idToken: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }

    const loggedUser = new User(
      userData.name,
      userData.id,
      userData._idToken,
      new Date(userData._tokenExpirationDate)
    );

    if (loggedUser.token) {
      // token is still valid
      let expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.user.next(loggedUser);
      this.autoLogout(expirationDuration);
    } else {
      //this.logout();
    }
  }

  autoLogout(expirationDuration: number) {
    this.logoutInterval = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expiresDate);

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handleErrorMessage(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not registered, please sign up first';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account disabled by the app adminstrators.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        errorMessage = 'An error occured';
    }
    return throwError(errorMessage);
  }
}
