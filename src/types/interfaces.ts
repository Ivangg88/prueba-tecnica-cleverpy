export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface InitialDataState {
  postsData: Array<PostData>;
  usersData: Array<UserData>;
}
