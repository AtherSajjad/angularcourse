import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type: string = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expiresIn: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthActions = Login | Logout;
