import TypicodeRepository from "../repositories/typicodeRepository";
import { mockPostData, mockUserData } from "../utils/mockData";

describe("Given a repository typicodeRepository", () => {
  const repository = TypicodeRepository.getInstance();

  describe("When the method getPost is called", () => {
    test("Then it should return a list of Posts", async () => {
      const expectedPosts = [mockPostData];
      const mockResponse = {
        json: async () => expectedPosts,
        status: 200,
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const receivedResponse = await repository.getPosts();

      expect(receivedResponse).toEqual(expectedPosts);
    });

    describe("When occur an error with the request", () => {
      test("Then it should return an error message", async () => {
        const expectedErrorMessage = "mock error";
        const mockResponse = {
          status: 400,
          statusText: expectedErrorMessage,
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const receivedResponse = await repository.getPosts();

        expect(receivedResponse).toEqual(expectedErrorMessage);
      });
    });
  });

  describe("When the method update is called", () => {
    const expectedUpdatedPost = mockPostData;
    expectedUpdatedPost.body = "Updated post";
    test("Then it should return the updated post", async () => {
      const mockResponse = {
        json: async () => expectedUpdatedPost,
        status: 200,
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const receivedResponse = await repository.updatePost(expectedUpdatedPost);

      expect(receivedResponse).toEqual(expectedUpdatedPost);
    });

    describe("When occur an error with the request", () => {
      test("Then it should return an error message", async () => {
        const expectedErrorMessage = "mock error";
        const mockResponse = {
          status: 400,
          statusText: expectedErrorMessage,
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const receivedResponse = await repository.updatePost(
          expectedUpdatedPost
        );

        expect(receivedResponse).toEqual(expectedErrorMessage);
      });
    });
  });

  describe("When the method getUsers is called", () => {
    test("Then it should return a list of Users", async () => {
      const expectedUsers = [mockUserData];
      const mockResponse = {
        json: async () => expectedUsers,
        status: 200,
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const receivedResponse = await repository.getUsers();

      expect(receivedResponse).toEqual(expectedUsers);
    });

    describe("When occur an error with the request", () => {
      test("Then it should return an error message", async () => {
        const expectedErrorMessage = "mock error";
        const mockResponse = {
          status: 400,
          statusText: expectedErrorMessage,
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const receivedResponse = await repository.getUsers();

        expect(receivedResponse).toEqual(expectedErrorMessage);
      });
    });
  });
});
