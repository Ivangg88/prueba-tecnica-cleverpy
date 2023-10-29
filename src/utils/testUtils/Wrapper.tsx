import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RootState, setupStore } from "../../redux/store";

import { mockPostData, mockUserData } from "../mockData";
import { PreloadedState } from "redux";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}
const preloadStore: PreloadedState<RootState> = {
  data: {
    postsData: [mockPostData],
    usersData: [mockUserData],
  },
  ui: { isLoading: false },
};
const store = setupStore(preloadStore);
const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <BrowserRouter>
      {" "}
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default Wrapper;
