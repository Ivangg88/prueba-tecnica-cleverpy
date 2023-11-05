import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUserActionCreator } from "../../redux/slices/userSlice/userSlice";
import "./Header.scss";

export const Header = () => {
  const { isLogged, userName } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logoutUserActionCreator());
  };

  return (
    <div className="header">
      <span>CleverPy</span>

      {isLogged ? (
        <div className="header__welcome-box">
          <span>Welcome: {userName}</span>
          <NavLink
            className="header__user-action"
            onClick={logOutUser}
            to="/home"
          >
            Logout
          </NavLink>
        </div>
      ) : (
        <NavLink className="header__user-action" to={"/login"}>
          Login
        </NavLink>
      )}
    </div>
  );
};
