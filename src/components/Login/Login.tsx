import { useState } from "react";
import "./Login.scss";
import { LoginUser } from "../../types/interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useUser from "../../hooks/useUser/useUser";

const initialUser: LoginUser = { password: "", userName: "" };

const Login = () => {
  const { loginUser } = useUser();
  const navigator = useNavigate();

  const [currentUser, setCurrentUser] = useState<LoginUser>(initialUser);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentUser({
      ...currentUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser.password === "admin" && currentUser.userName === "admin") {
      loginUser(currentUser);
      navigator("/home");
      return;
    }
    toast.error("User or password incorrect.");
    return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="form-container"
      data-testid="loginForm"
    >
      <h1 className="form-container__login-text">Welcome to Cleverposts</h1>

      <div className="form-container__input-field">
        <label htmlFor="userName"></label>
        <input
          className="form-container__input"
          id="userName"
          name="userName"
          placeholder="username"
          type="text"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-container__input-field">
        <label htmlFor="password"></label>
        <input
          className="form-container__input"
          id="password"
          name="password"
          placeholder="********"
          type="password"
          onChange={handleInputChange}
        />
      </div>
      <button className="form-container__button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
