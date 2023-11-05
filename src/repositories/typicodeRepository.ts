import { PostData, UserData } from "../types/interfaces";

export default class TypicodeRepository {
  private static instance: TypicodeRepository;

  private endpoints = { users: "/users", posts: "/posts" };
  private url = "https://jsonplaceholder.typicode.com";

  private constructor() {}

  public static getInstance(): TypicodeRepository {
    if (!TypicodeRepository.instance) {
      TypicodeRepository.instance = new TypicodeRepository();
    }
    return TypicodeRepository.instance;
  }

  public async getPosts(): Promise<Array<PostData> | string> {
    try {
      const postsResponse: Response = await fetch(
        this.url + this.endpoints.posts
      );

      if (postsResponse.status !== 200) {
        throw new Error(postsResponse.statusText);
      }
      const posts: Array<PostData> = await postsResponse.json();

      return posts;
    } catch (error) {
      return (error as Error).message;
    }
  }

  public async updatePost(postToUpdate: PostData): Promise<PostData | string> {
    try {
      const updateResponse: Response = await fetch(
        this.url + this.endpoints.posts + "/" + postToUpdate.id,
        {
          method: "PATCH",
          body: JSON.stringify(postToUpdate),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (updateResponse.status !== 200) {
        throw new Error(updateResponse.statusText);
      }

      const posts: PostData = await updateResponse.json();
      return posts;
    } catch (error) {
      return (error as Error).message;
    }
  }

  public async deletePost(postId: string): Promise<boolean | string> {
    const responseStatus = 204;
    try {
      //simulation of the method delete

      if (responseStatus !== 204) {
        throw new Error("Error with delete");
      }

      return true;
    } catch (error) {
      return (error as Error).message;
    }
  }

  public async getUsers(): Promise<Array<UserData> | string> {
    try {
      const usersResponse: Response = await fetch(
        this.url + this.endpoints.users
      );

      if (usersResponse.status !== 200) {
        throw new Error(usersResponse.statusText);
      }

      const users: Array<UserData> = await usersResponse.json();
      return users;
    } catch (error) {
      return (error as Error).message;
    }
  }
}
