import { Token, UserLoged } from "../types/interfaces";

export const getInitialUser = (): UserLoged => {
  const token = localStorage.getItem("token");

  if (token) {
    const user: Token = JSON.parse(token);

    const userLoged: UserLoged = {
      userName: user.userName,
      isLogged: true,
      token: token,
    };

    return userLoged;
  }
  return {
    isLogged: false,
    userName: "",
    token: "",
  };
};

export const initialLoggedUser = getInitialUser();
