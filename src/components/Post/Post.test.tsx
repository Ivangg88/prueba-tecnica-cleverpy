import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPostData, mockUserData } from "../../utils/mockData";
import Post from "./Post";
import Wrapper from "../../utils/testUtils/Wrapper";

const mockDelete = {
  deletePost: jest.fn(),
};

jest.mock("../../hooks/useData/useData", () => () => mockDelete);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a component Post", () => {
  describe("When rendered with a post", () => {
    test("Then it should show a header with the title from the post, a header with the author, a parraf with the content and a button", () => {
      const expectedTitle = mockPostData.title;
      const expectedContent = mockPostData.body;
      const expectedAuthor = `By ${mockUserData.name}`;
      render(<Post post={mockPostData} />, { wrapper: Wrapper });

      const receivedTitle = screen.getByRole("heading", {
        name: expectedTitle,
      });
      const receivedContent = screen.getByText(expectedContent);
      const receivedAuthor = screen.getByRole("heading", {
        name: expectedAuthor,
      });

      const button = screen.getByLabelText("delete");

      expect(receivedTitle).toBeInTheDocument();
      expect(receivedAuthor).toBeInTheDocument();
      expect(receivedContent).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    describe("When the user click on the button delete", () => {
      test("Then it should call the function deletePost", async () => {
        render(<Post post={mockPostData} />, { wrapper: Wrapper });

        const button = screen.getByLabelText("delete");

        await userEvent.click(button);
        expect(mockDelete.deletePost).toHaveBeenCalledWith(mockPostData.id);
      });
    });
  });
});
