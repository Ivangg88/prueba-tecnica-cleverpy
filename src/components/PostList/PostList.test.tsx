import { render, screen } from "@testing-library/react";
import PostList from "./PostList";
import Wrapper from "../../utils/testUtils/Wrapper";
import renderWithProviders from "../../utils/testUtils/testStore";
import { mockPostData, mockUserData } from "../../utils/mockData";
import { PreloadedState } from "redux";
import { RootState } from "../../redux/store";

describe("Given a component PostList", () => {
  const preloadStore: PreloadedState<RootState> = {
    data: {
      postsData: [mockPostData],
      usersData: [mockUserData],
    },
    ui: { isLoading: false },
  };
  describe("When rendered", () => {
    test("Then should show a list with too many components as post are in the store", () => {
      const expectedLength = 1;

      renderWithProviders(<PostList />, { preloadedState: preloadStore });

      const expectedPostsElements = screen.getAllByRole("listitem");

      expect(expectedPostsElements.length).toBe(expectedLength);
    });
  });
});
