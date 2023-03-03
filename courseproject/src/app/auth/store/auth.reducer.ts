import { User } from '../user.model';
import { AuthActions, Login, LOGIN, LOGOUT } from './auth.actions';

export interface AuthState {
  user: User;
}
const initialState: AuthState = {
  user: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case LOGIN:
      let loginPayload = (<Login>action).payload;
      const expiresDate = new Date(
        new Date().getTime() + +loginPayload.expiresIn * 1000
      );
      const user = new User(
        loginPayload.email,
        loginPayload.email,
        loginPayload.token,
        expiresDate
      );
      return {
        ...state,
        user: user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
