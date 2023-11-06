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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import withCredentials from "../CredentialRoutes/CredentialRoutes";
import "./App.scss";
import Loading from "../Loading/Loading";
import {
  closeLoadingModalActionCreator,
  openLoadingModalActionCreator,
} from "../../redux/slices/uiSlice/uiSlice";

const App = (): JSX.Element => {
  const { getPosts, getUsers } = useData();
  const { isLogged } = useAppSelector((state: RootState) => state.user);
  const { isLoading } = useAppSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogged) {
      dispatch(openLoadingModalActionCreator());
      getUsers();
      getPosts();
    }
    setTimeout(() => {
      dispatch(closeLoadingModalActionCreator());
    }, 1500);
  }, [getPosts, getUsers, isLogged, dispatch]);

  return (
    <>
      <ToastContainer
        bodyClassName="toast-body"
        toastClassName="toast"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
      />
      {isLoading ? <Loading /> : null}
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
