import renderWithProviders from "../../utils/testUtils/testStore";
import DetailPost from "./DetailPost";
import { mockPostData, mockUserData } from "../../utils/mockData";
import { screen } from "@testing-library/react";
import { RootState } from "../../redux/store";
import { PreloadedState } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

const mockUseData = {
  deletePost: jest.fn(),
  updatePost: jest.fn(),
};

jest.mock("../../hooks/useData/useData", () => () => mockUseData);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const preloadedState: PreloadedState<RootState> = {
  data: { usersData: [mockUserData], postsData: [mockPostData] },
};
describe("Given a component DetailPost", () => {
  describe("When rendered with a post", () => {
    test("it should show a component DetailPost", () => {
      const expectedTitle = mockPostData.title;
      const expectedContent = mockPostData.body;
      const expectedAuthor = `By ${mockUserData.name}`;

      renderWithProviders(<DetailPost post={mockPostData} />, {
        preloadedState,
      });

      const receivedTitle = screen.getByRole("heading", {
        name: expectedTitle,
      });
      const receivedContent = screen.getByText(expectedContent);
      const receivedAuthor = screen.getByRole("heading", {
        name: expectedAuthor,
      });

      const deleteButton = screen.getByLabelText("delete");
      const editButton = screen.getByLabelText("edit");

      expect(receivedTitle).toBeInTheDocument();
      expect(receivedAuthor).toBeInTheDocument();
      expect(receivedContent).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
    });

    describe("When the user click on the button delete", () => {
      test("Then it should call the function deletePost", async () => {
        renderWithProviders(<DetailPost post={mockPostData} />, {
          preloadedState,
        });

        const button = screen.getByLabelText("delete");

        await userEvent.click(button);
        expect(mockUseData.deletePost).toHaveBeenCalledWith(mockPostData.id);
      });
    });

    describe("When the user click on the button edit", () => {
      test("Then it should open an edit form with an input, a select, a textArea, a button Submit and a button Cancel", async () => {
        const titleInputText = "Title:";
        const selectLabelText = "Author:";
        const contentLabelText = "Content:";
        const submitButtonText = "Submit";
        const cancelButtonText = "Cancel";

        renderWithProviders(<DetailPost post={mockPostData} />, {
          preloadedState,
        });

        const editButton = screen.getByLabelText("edit");

        await userEvent.click(editButton);

        const titleInput = screen.getByLabelText(titleInputText);
        const select = screen.getByLabelText(selectLabelText);
        const contentTextArea = screen.getByLabelText(contentLabelText);
        const submitButton = screen.getByRole("button", {
          name: submitButtonText,
        });
        const cancelButton = screen.getByRole("button", {
          name: cancelButtonText,
        });

        expect(titleInput).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        expect(contentTextArea).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
      });

      describe("When the user type on the inputs", () => {
        test("Then it should update the input value with the typed data from user.", async () => {
          const expectedNewTitle = "New updated title";
          const expectedNewContent = "New updated content";
          const expectedNewSelectValue = "Mock user 2";

          preloadedState.data?.usersData.push({
            ...mockUserData,
            name: expectedNewSelectValue,
            id: 2,
          });

          renderWithProviders(<DetailPost post={mockPostData} />, {
            preloadedState,
          });

          const editButton = screen.getByLabelText("edit");

          await userEvent.click(editButton);

          const titleInput: HTMLInputElement = screen.getByLabelText("Title:");
          const select: HTMLSelectElement = screen.getByLabelText("Author:");
          const contentTextArea: HTMLInputElement =
            screen.getByLabelText("Content:");

          const previousTitleInput = titleInput.value;
          const previousContentTextAreaValue = contentTextArea.value;

          await userEvent.type(titleInput, expectedNewTitle);
          await userEvent.type(contentTextArea, expectedNewContent);
          await userEvent.selectOptions(select, expectedNewSelectValue);

          expect(titleInput.value).toBe(previousTitleInput + expectedNewTitle);
          expect(contentTextArea.value).toBe(
            previousContentTextAreaValue + expectedNewContent
          );
          expect(select.value).toBe(expectedNewSelectValue);
        });
      });

      describe("When the user click on submit", () => {
        test("Then it should call the function updatePost", async () => {
          renderWithProviders(<DetailPost post={mockPostData} />, {
            preloadedState,
          });

          const editButton = screen.getByLabelText("edit");

          await userEvent.click(editButton);

          const submitButton = screen.getByRole("button", { name: "Submit" });

          await userEvent.click(submitButton);

          expect(mockUseData.updatePost).toHaveBeenCalled();
        });
      });

      describe("When the user click on cancel", () => {
        test("Then it should close the form", async () => {
          const expectedTitle = mockPostData.title;

          renderWithProviders(<DetailPost post={mockPostData} />, {
            preloadedState,
          });

          const editButton = screen.getByLabelText("edit");

          await userEvent.click(editButton);

          const cancelButton = screen.getByRole("button", { name: "Cancel" });

          await userEvent.click(cancelButton);

          const postTitle = screen.getByText(expectedTitle);

          expect(postTitle).toBeInTheDocument();
        });
      });
    });
  });
});
