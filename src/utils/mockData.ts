import { PostData, UserData } from "../types/interfaces";

export const mockUserData: UserData = {
  id: 1,
  username: "mock username",
  name: "mock name",
  address: {
    city: "mock city",
    geo: { lat: "0", lng: "0" },
    street: "mock street",
    suite: "mock suite",
    zipcode: "04000",
  },
  email: "mock@mail.mock",
};

export const mockPostData: PostData = {
  id: 0,
  title: "mock post",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel libero vestibulum, tristique urna vel, auctor massa. Quisque euismod mauris nec nunc tristique.",
  userId: 0,
};
