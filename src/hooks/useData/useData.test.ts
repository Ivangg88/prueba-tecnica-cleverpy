import { renderHook } from "@testing-library/react";
import TypicodeRepository from "../../repositories/typicodeRepository";
import useData from "./useData";
import { mockPostData, mockUserData } from "../../utils/mockData";
import {
  deletePostActionCreator,
  loadPostsActionCreator,
  loadUsersActionCreator,
  updatePostActionCreator,
} from "../../redux/slices/dataSlice/dataSlice";
import { closeLoadingModalActionCreator } from "../../redux/slices/uiSlice/uiSlice";
import { PostData } from "../../types/interfaces";
import { toast } from "react-toastify";

const mockDispatch = jest.fn();
jest.mock("../../redux/hooks", () => ({
  ...jest.requireActual("../../redux/hooks"),
  useAppDispatch: () => mockDispatch,
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const repository = TypicodeRepository.getInstance();
const mockGetPosts = jest.spyOn(repository, "getPosts");
const mockGetUsers = jest.spyOn(repository, "getUsers");
const mockUpdatePost = jest.spyOn(repository, "updatePost");
const mockDeletePost = jest.spyOn(repository, "deletePost");

describe("Given a hook useData", () => {
  describe("When the function getPosts is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/loadPosts and the toast with the message 'Posts loaded successfully'", async () => {
        const successMessage = "Posts loaded successfully";
        const {
          result: {
            current: { getPosts },
          },
        } = renderHook(useData);

        mockGetPosts.mockResolvedValueOnce([mockPostData]);
        await getPosts();

        expect(mockDispatch).toHaveBeenCalledWith(
          loadPostsActionCreator([mockPostData])
        );

        expect(toast.success).toHaveBeenCalledWith(successMessage);
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the toast with the message 'Error with the loading'", async () => {
        const errorMessage = "Error with the loading";
        mockGetPosts.mockResolvedValueOnce(errorMessage);

        const {
          result: {
            current: { getPosts },
          },
        } = renderHook(useData);

        await getPosts();

        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe("When the function updatePost is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/updatePost and call the toast with the message: 'Post updated successfully'", async () => {
        const successMessage = "Post updated successfully";
        const mockUpdatedPost: PostData = {
          ...mockPostData,
          title: "Updated post",
        };
        mockUpdatePost.mockResolvedValueOnce(mockUpdatedPost);

        const {
          result: {
            current: { updatePost },
          },
        } = renderHook(useData);

        await updatePost(mockPostData);

        expect(mockDispatch).toHaveBeenCalledWith(
          updatePostActionCreator(mockUpdatedPost)
        );
        expect(toast.success).toHaveBeenCalledWith(successMessage);
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the dispatch with the action uiData/closeLoadingModal and the toast with the mesage: 'Error with the update.'", async () => {
        const errorMessage = "Error with the update.";
        mockUpdatePost.mockResolvedValueOnce(errorMessage);

        const {
          result: {
            current: { updatePost },
          },
        } = renderHook(useData);

        await updatePost(mockPostData);

        expect(mockDispatch).toHaveBeenCalledWith(
          closeLoadingModalActionCreator()
        );
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe("When the function deletePost is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/deletePost and call the toast with the message: 'Post deleted successfully", async () => {
        const successMessage = "Post deleted successfully";
        mockDeletePost.mockResolvedValueOnce(true);

        const {
          result: {
            current: { deletePost },
          },
        } = renderHook(useData);

        await deletePost(mockPostData.id);

        expect(mockDispatch).toHaveBeenCalledWith(
          deletePostActionCreator(mockPostData.id)
        );
        expect(toast.success).toHaveBeenCalledWith(successMessage);
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the dispatch with the action uiData/closeLoadingModal and call the toast with the message: 'Error deleting the post, try again", async () => {
        const errorMessage = "Error deleting the post, try again";
        mockDeletePost.mockResolvedValueOnce(errorMessage);

        const {
          result: {
            current: { deletePost },
          },
        } = renderHook(useData);

        await deletePost(mockPostData.id);

        expect(mockDispatch).toHaveBeenCalledWith(
          closeLoadingModalActionCreator()
        );
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });
  describe("When the function getUsers is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/loadUsers and call the toast with the message: 'Users loaded successfuly", async () => {
        const successMessage = "Users loaded successfully";
        const {
          result: {
            current: { getUsers },
          },
        } = renderHook(useData);

        mockGetUsers.mockResolvedValueOnce([mockUserData]);
        await getUsers();

        expect(mockDispatch).toHaveBeenCalledWith(
          loadUsersActionCreator([mockUserData])
        );
        expect(toast.success).toHaveBeenCalledWith(successMessage);
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the toast with the message 'Error with the loading'", async () => {
        const errorMessage = "Error with the loading";
        mockGetUsers.mockResolvedValueOnce(errorMessage);

        const {
          result: {
            current: { getUsers },
          },
        } = renderHook(useData);

        await getUsers();

        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });
});
