import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface ProtectorRoutesProps {
  children: JSX.Element;
}

const CredentialsRoutes = ({ children }: ProtectorRoutesProps) => {
  const { isLogged } = useAppSelector((state: RootState) => state.user);
  return isLogged ? children : <Navigate to={"/login"} />;
};

const withCredentials = (component: JSX.Element) => {
  return <CredentialsRoutes>{component}</CredentialsRoutes>;
};

export default withCredentials;
