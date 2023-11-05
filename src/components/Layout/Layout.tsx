import { Header } from "../Header/Header";
import "./Layout.scss";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

const withLayout = (component: JSX.Element) => {
  return <Layout>{component}</Layout>;
};

export default withLayout;
