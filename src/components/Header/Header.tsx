import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

import "./Header.scss";
import useUser from "../../hooks/useUser/useUser";

export const Header = () => {
  const { userName, isLogged } = useAppSelector(
    (state: RootState) => state.user
  );
  const { logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="header">
      <span>Cleverposts</span>

      {isLogged ? (
        <div className="header__welcome-box">
          <span>Welcome: {userName}</span>
          <NavLink
            className="header__user-action"
            onClick={handleLogout}
            to="/login"
          >
            Logout
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};
