import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
      <span>Cleverpy</span>;
    </>
  );
};

export default App;
