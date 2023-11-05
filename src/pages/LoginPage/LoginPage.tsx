import withLayout from "../../components/Layout/Layout";
import Login from "../../components/Login/Login";
import withBasePage from "../BasePage/BasePage";

const LoginPage = () => {
  return withLayout(withBasePage(<Login />));
};

export default LoginPage;
