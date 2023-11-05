import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../../styles/sass/styles.scss";
import useData from "../../hooks/useData/useData";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostPage from "../../pages/PostPage/PostPage";
import DetailPage from "../../pages/DetailPage/DetailPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import withCredentials from "../CredentialRoutes/CredentialRoutes";

const App = (): JSX.Element => {
  const { getPosts, getUsers } = useData();
  const { isLogged } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLogged) {
      getUsers();
      getPosts();
    }
  }, [getPosts, getUsers, isLogged]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={withCredentials(<Navigate to={"/home"} />)} />
        <Route path="/home" element={withCredentials(<PostPage />)} />
        <Route
          path="/posts/:postId"
          element={withCredentials(<DetailPage />)}
        />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/*" element={<Navigate to={"/notfound"} />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
