import { useCallback } from "react";
import TypicodeRepository from "../../repositories/typicodeRepository";
import { useAppDispatch } from "../../redux/hooks";
import {
  deletePostActionCreator,
  loadPostsActionCreator,
  loadUsersActionCreator,
  updatePostActionCreator,
} from "../../redux/slices/dataSlice/dataSlice";
import { PostData } from "../../types/interfaces";
import {
  closeLoadingModalActionCreator,
  openLoadingModalActionCreator,
} from "../../redux/slices/uiSlice/uiSlice";

const tipicodeRepository = TypicodeRepository.getInstance();
const useData = () => {
  const dispatch = useAppDispatch();
  const getPosts = useCallback(async () => {
    try {
      const posts = await tipicodeRepository.getPosts();

      if (typeof posts === "string") throw new Error(posts);

      dispatch(loadPostsActionCreator(posts));
      //TODO:Success toast
    } catch (error) {
      //TODO:Error toast
    }
  }, [dispatch]);

  const updatePost = async (postToUpdate: PostData) => {
    try {
      dispatch(openLoadingModalActionCreator);
      const updatedPost = await tipicodeRepository.updatePost(postToUpdate);
      dispatch(closeLoadingModalActionCreator);

      if (typeof updatedPost === "string") throw new Error(updatedPost);

      dispatch(updatePostActionCreator(updatedPost));
      //TODO:Success toast
    } catch (error) {
      dispatch(closeLoadingModalActionCreator());
      //TODO: Error toast
    }
  };

  const deletePost = async (postId: number) => {
    try {
      dispatch(openLoadingModalActionCreator());
      const deleteResult = await tipicodeRepository.deletePost(
        postId.toString()
      );

      if (typeof deleteResult === "string") throw new Error(deleteResult);
      dispatch(closeLoadingModalActionCreator);

      dispatch(deletePostActionCreator(postId));
      //TODO:Success toast
    } catch (error) {
      dispatch(closeLoadingModalActionCreator());
      //TODO:Error toast
    }
  };

  const getUsers = useCallback(async () => {
    try {
      const users = await tipicodeRepository.getUsers();

      if (typeof users === "string") throw new Error(users);

      dispatch(loadUsersActionCreator(users));
      //TODO:Success toast
    } catch (error) {
      //TODO:Error toast
    }
  }, [dispatch]);
  return { getPosts, getUsers, updatePost, deletePost };
};

export default useData;
