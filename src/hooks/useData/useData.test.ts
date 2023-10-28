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

const mockDispatch = jest.fn();
jest.mock("../../redux/hooks", () => ({
  ...jest.requireActual("../../redux/hooks"),
  useAppDispatch: () => mockDispatch,
}));

const repository = TypicodeRepository.getInstance();
const mockGetPosts = jest.spyOn(repository, "getPosts");
const mockGetUsers = jest.spyOn(repository, "getUsers");
const mockUpdatePost = jest.spyOn(repository, "updatePost");
const mockDeletePost = jest.spyOn(repository, "deletePost");

describe("Given a hook useData", () => {
  describe("When the function getPosts is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/loadPosts", async () => {
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
      });
    });
  });

  describe("When the function updatePost is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/updatePost", async () => {
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
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the dispatch with the action uiData/closeLoadingModal", async () => {
        mockUpdatePost.mockResolvedValueOnce("Error with the update.");

        const {
          result: {
            current: { updatePost },
          },
        } = renderHook(useData);

        await updatePost(mockPostData);

        expect(mockDispatch).toHaveBeenCalledWith(
          closeLoadingModalActionCreator()
        );
      });
    });
  });

  describe("When the function deletePost is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/deletePost", async () => {
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
      });
    });

    describe("And have any error in the response", () => {
      test("Then it should call the dispatch with the action uiData/closeLoadingModal", async () => {
        mockDeletePost.mockResolvedValueOnce("Error with the delete.");

        const {
          result: {
            current: { deletePost },
          },
        } = renderHook(useData);

        await deletePost(mockPostData.id);

        expect(mockDispatch).toHaveBeenCalledWith(
          closeLoadingModalActionCreator()
        );
      });
    });
  });
  describe("When the function getUsers is called", () => {
    describe("And have a successfull response", () => {
      test("Then it should call the dispatch with the action data/loadUsers", async () => {
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
      });
    });
  });
});
