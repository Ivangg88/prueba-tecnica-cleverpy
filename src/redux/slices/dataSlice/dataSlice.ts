import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialDataState,
  PostData,
  UserData,
} from "../../../types/interfaces";

const initialDataState: InitialDataState = {
  postsData: [],
  usersData: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    loadPosts: (previousState, action: PayloadAction<Array<PostData>>) => ({
      ...previousState,
      postsData: action.payload,
    }),

    updatePost: (previousState, action: PayloadAction<PostData>) => {
      const updatedPosts = previousState.postsData.map((post) => {
        if (post.id === action.payload.id) post = action.payload;
        return post;
      });

      return {
        ...previousState,
        postsData: updatedPosts,
      };
    },

    deletePost: (previousState, action: PayloadAction<number>) => {
      const updatedPosts = previousState.postsData.filter(
        (post) => post.id !== action.payload
      );

      return {
        ...previousState,
        postsData: updatedPosts,
      };
    },

    loadUsers: (previousState, action: PayloadAction<Array<UserData>>) => ({
      ...previousState,
      usersData: action.payload,
    }),
  },
});

export const dataReducer = dataSlice.reducer;

export const {
  loadPosts: loadPostsActionCreator,
  loadUsers: loadUsersActionCreator,
  updatePost: updatePostActionCreator,
  deletePost: deletePostActionCreator,
} = dataSlice.actions;
