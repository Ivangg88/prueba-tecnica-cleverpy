import { UserLoged } from "../../../types/interfaces";
import { getInitialUser } from "../../../utils/initialStates";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
  userReducer,
} from "./userSlice";

describe("Given a loginUserActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type user/loginUser", () => {
      const userToLogin: UserLoged = {
        isLogged: true,
        token: "",
        userName: "",
      };
      const actionType = "user/loginUser";
      const expectedAction = {
        type: actionType,
        payload: userToLogin,
      };

      const action = loginUserActionCreator(userToLogin);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a logoutUserActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type user/logoutUser", () => {
      const actionType = "user/logoutUser";
      const expectedAction = {
        type: actionType,
        payload: undefined,
      };

      const action = logoutUserActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given an userReducer function", () => {
  describe("When is called with an action type 'user/loginUser' and a payload with the user to login", () => {
    test("Then it should set the property isLogged of the state at true", () => {
      const userToLogin: UserLoged = {
        isLogged: true,
        token: "",
        userName: "",
      };
      const initialUser = getInitialUser();

      const action = loginUserActionCreator(userToLogin);
      const userLogged = userReducer(initialUser, action);

      expect(userLogged.isLogged).toBe(true);
    });
  });

  describe("When is called with an action type 'user/logoutUser'", () => {
    test("Then it should set the property isLogged of the state at false", () => {
      const initialUser: UserLoged = {
        isLogged: true,
        token: "",
        userName: "",
      };

      const action = logoutUserActionCreator();
      const userLogged = userReducer(initialUser, action);

      expect(userLogged.isLogged).toBe(false);
    });
  });
});
