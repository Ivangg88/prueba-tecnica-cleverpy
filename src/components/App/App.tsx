import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import useData from "../../hooks/useData/useData";
import Post from "../Post/Post";

const App = (): JSX.Element => {
  const { getPosts, getUsers } = useData();
  const { postsData } = useAppSelector((state: RootState) => state.data);
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
        <Route
          path="/*"
          element={
            <>
              <span>Cleverpy</span>
              {postsData.map((post) => (
                <Post key={post.id} post={post}></Post>
              ))}
              <span>Cleverpy</span>;
              <button
                onClick={() => {
                  getUsers();
                  getPosts();
                }}
              >
                Data
              </button>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
