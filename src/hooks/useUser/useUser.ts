import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../redux/slices/userSlice/userSlice";
import { LoginUser, UserLoged } from "../../types/interfaces";

const useUser = () => {
  const dispatch = useAppDispatch();

  const loginUser = (user: LoginUser) => {
    try {
      const token = JSON.stringify(user);
      localStorage.setItem("token", token);

      const userToLogin: UserLoged = {
        isLogged: true,
        token,
        userName: user.userName,
      };

      dispatch(loginUserActionCreator(userToLogin));
      toast.success(`User: ${user.userName} logged successfully`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logoutUserActionCreator());
    toast.success("User logged out successfully \n See you soon");
  };
  return { loginUser, logoutUser };
};

export default useUser;
