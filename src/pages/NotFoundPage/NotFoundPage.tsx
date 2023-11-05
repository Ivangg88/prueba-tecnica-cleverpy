import { NavLink } from "react-router-dom";
import withBasePage from "../BasePage/BasePage";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const notFoundPage = (
    <div className="notfound-page">
      <h1>Cleverposts</h1>
      <h2>Page not found</h2>
      <p>
        Sorry, the page you are looking for does not exist or has been removed.
        You can return to the home page by clicking on the following link:
      </p>
      <NavLink to={"/home"}>Go to home</NavLink>
    </div>
  );

  return withBasePage(notFoundPage);
};

export default NotFoundPage;
