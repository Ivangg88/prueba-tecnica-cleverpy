import { InitialDataState, PostData } from "../../../types/interfaces";
import {
  mockInitialDataState,
  mockPostData,
  mockUserData,
} from "../../../utils/mockData";
import {
  dataReducer,
  deletePostActionCreator,
  loadPostsActionCreator,
  loadUsersActionCreator,
  updatePostActionCreator,
} from "./dataSlice";

describe("Given a loadPostsActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type data/loadPosts", () => {
      const actionType = "data/loadPosts";
      const expectedAction = {
        type: actionType,
        payload: [mockPostData],
      };

      const action = loadPostsActionCreator([mockPostData]);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a updatePostActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type data/updatePost", () => {
      const actionType = "data/updatePost";
      const expectedAction = {
        type: actionType,
        payload: mockPostData,
      };

      const action = updatePostActionCreator(mockPostData);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a deletePostActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type data/deletePost", () => {
      const actionType = "data/deletePost";
      const expectedAction = {
        type: actionType,
        payload: 0,
      };

      const action = deletePostActionCreator(0);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a loadUsersActionCreator", () => {
  describe("When is called", () => {
    test("Then it should return an action with the type data/loadUsers", () => {
      const actionType = "data/loadUsers";
      const expectedAction = {
        type: actionType,
        payload: [mockUserData],
      };

      const action = loadUsersActionCreator([mockUserData]);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a dataReducer function", () => {
  describe("When is called with an action type 'data/loadPosts' and a payload with an array of PostData", () => {
    test("Then it should return a copy of the loaded Posts", () => {
      const action = loadPostsActionCreator([mockPostData]);
      const expectedState: InitialDataState = {
        ...mockInitialDataState,
        postsData: [mockPostData],
      };

      const receivedstate = dataReducer(mockInitialDataState, action);

      expect(receivedstate).toStrictEqual(expectedState);
    });
  });

  describe("When is called with an action type 'data/updatePost' and a payload with a PostData", () => {
    test("Then it should return the new state with the updated post", () => {
      const updatedPost: PostData = { ...mockPostData, title: "Updated post" };
      const action = updatePostActionCreator(updatedPost);
      const initialState: InitialDataState = {
        ...mockInitialDataState,
        postsData: [mockPostData],
      };

      const expectedState: InitialDataState = {
        ...mockInitialDataState,
        postsData: [updatedPost],
      };

      const receivedstate = dataReducer(initialState, action);

      expect(receivedstate).toStrictEqual(expectedState);
    });
  });

  describe("When is called with an action type 'data/deletePost' and a payload with an id", () => {
    test("Then it should delete the given post", () => {
      const action = deletePostActionCreator(mockPostData.id);
      const initialState: InitialDataState = {
        ...mockInitialDataState,
        postsData: [mockPostData],
      };

      const { postsData } = dataReducer(initialState, action);

      expect(postsData.length).toBe(0);
    });
  });

  describe("When is called with an action type 'data/loadUsers' and a payload with an array of UserData", () => {
    test("Then it should return a copy of the loaded Users", () => {
      const action = loadUsersActionCreator([mockUserData]);
      const initialState: InitialDataState = {
        ...mockInitialDataState,
        usersData: [],
      };
      const expectedState: InitialDataState = {
        ...mockInitialDataState,
        usersData: [mockUserData],
      };

      const receivedstate = dataReducer(initialState, action);

      expect(receivedstate).toStrictEqual(expectedState);
    });
  });
});
