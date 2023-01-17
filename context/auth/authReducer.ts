import { IUser } from "../../interfaces";
import { AuthState } from "./";

type authActionType =
  | { type: "[Auth] - Login"; payload: IUser }
  | { type: "[Auth] - Logout" }
  | { type: "[Auth] - Url";payload:string };

export const authReducer = (
  state: AuthState,
  action: authActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    //break;
    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    //break;

    case "[Auth] - Url":
      return {
        ...state,
        urlDestination:action.payload
      };
    //break;




    default:
      return state;
  }
};
