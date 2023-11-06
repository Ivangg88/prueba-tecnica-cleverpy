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
import { toast } from "react-toastify";

const tipicodeRepository = TypicodeRepository.getInstance();
const useData = () => {
  const dispatch = useAppDispatch();
  const getPosts = useCallback(async () => {
    try {
      const posts = await tipicodeRepository.getPosts();

      if (typeof posts === "string") throw new Error(posts);

      dispatch(loadPostsActionCreator(posts));
      toast.success("Posts loaded successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [dispatch]);

  const updatePost = async (postToUpdate: PostData) => {
    try {
      dispatch(openLoadingModalActionCreator);
      const updatedPost = await tipicodeRepository.updatePost(postToUpdate);
      dispatch(closeLoadingModalActionCreator);

      if (typeof updatedPost === "string") throw new Error(updatedPost);

      dispatch(updatePostActionCreator(updatedPost));
      toast.success("Post updated successfully");
    } catch (error) {
      dispatch(closeLoadingModalActionCreator());
      toast.error((error as Error).message);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      dispatch(openLoadingModalActionCreator());
      const deleteResult = await tipicodeRepository.deletePost(
        postId.toString()
      );

      if (typeof deleteResult === "string") throw new Error(deleteResult);

      dispatch(deletePostActionCreator(postId));
      toast.success("Post deleted successfully");
      dispatch(closeLoadingModalActionCreator());
    } catch (error) {
      dispatch(closeLoadingModalActionCreator());
      toast.error((error as Error).message);
    }
  };

  const getUsers = useCallback(async () => {
    try {
      const users = await tipicodeRepository.getUsers();

      if (typeof users === "string") throw new Error(users);

      dispatch(loadUsersActionCreator(users));
      toast.success("Users loaded successfully");
    } catch (error) {
      dispatch(closeLoadingModalActionCreator());
      toast.error((error as Error).message);
    }
  }, [dispatch]);
  return { getPosts, getUsers, updatePost, deletePost };
};

export default useData;
