import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

const App = (): JSX.Element => {
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
        <Route path="/*" element={<span>Cleverpy</span>}></Route>
      </Routes>
    </>
  );
};

export default App;
