import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import useUser from "./useUser";
import Wrapper from "../../utils/testUtils/Wrapper";
import { LoginUser, UserLoged } from "../../types/interfaces";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../redux/slices/userSlice/userSlice";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

afterEach(() => {
  localStorage.clear();
});

describe("Given a function loginUser", () => {
  describe("When is called with an user with userName and password 'test'", () => {
    test("Then it should store a token with the user data, dispatch an action with userForm token, call the toast with 'User: 'userName' logged successfully.'.", () => {
      const userLogin: LoginUser = {
        userName: "test",
        password: "test",
      };
      const successMessage = `User: ${userLogin.userName} logged successfully`;

      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      loginUser(userLogin);
      const token = localStorage.getItem("token")!;

      const userToDispatch: UserLoged = {
        isLogged: true,
        userName: userLogin.userName,
        token,
      };

      const action = loginUserActionCreator(userToDispatch);

      expect(token).not.toBeNull();
      expect(toast.success).toHaveBeenCalledWith(successMessage);
      expect(mockDispatch).toHaveBeenCalledWith(action);
    });
  });
});

describe("Given a function logoutUser", () => {
  describe("When is called", () => {
    test("Then it should remove the token from localStorage, call the dispatch with an logOut action and the toast.success with the message 'User logged out successfully  See you soon'", () => {
      const successmessage = "User logged out successfully \n See you soon";
      const action = logoutUserActionCreator();
      localStorage.setItem("token", "testToken");

      const {
        result: {
          current: { logoutUser },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      logoutUser();

      const localStorageResponse = localStorage.getItem("token");

      expect(localStorageResponse).toBeNull();
      expect(mockDispatch).toHaveBeenCalledWith(action);
      expect(toast.success).toHaveBeenCalledWith(successmessage);
    });
  });
});
