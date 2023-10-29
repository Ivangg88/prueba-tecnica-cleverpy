import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Post from "../Post/Post";
import "./PostList.scss";

const PostList = () => {
  const { postsData } = useAppSelector((state: RootState) => state.data);

  return (
    <ul className="posts-list">
      {postsData.map((post) => (
        <li className="posts-list__post" key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
