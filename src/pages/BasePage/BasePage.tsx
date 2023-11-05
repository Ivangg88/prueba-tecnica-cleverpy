import "./BasePage.scss";

interface BasePageProps {
  children: JSX.Element;
}

const BasePage = ({ children }: BasePageProps) => {
  return <div className="base-page">{children}</div>;
};

const withBasePage = (WrappedComponent: JSX.Element) => {
  return <BasePage>{WrappedComponent}</BasePage>;
};

export default withBasePage;
