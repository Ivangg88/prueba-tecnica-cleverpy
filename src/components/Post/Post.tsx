import { PostData } from "../../types/interfaces";
import useData from "../../hooks/useData/useData";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import "./Post.scss";
import { useNavigate } from "react-router";
import { FiTrash } from "react-icons/fi";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps): JSX.Element => {
  const { deletePost } = useData();
  const { usersData } = useAppSelector((state: RootState) => state.data);
  const userPost = usersData.filter((user) => user.id === post.userId)[0];
  const navigator = useNavigate();
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    deletePost(post.id);
  };

  const handleCardClick = () => {
    navigator(`/posts/${post.id}`);
  };
  return (
    <div className="post u--fadeInLeft" onClick={handleCardClick}>
      <h2 className="post__title">{post.title}</h2>
      <h3 className="post__author">By {userPost?.name}</h3>
      <p className="post__body">{post.body}</p>
      <div className="buttons-container">
        <button
          aria-label="delete"
          onClick={handleDeleteClick}
          type="button"
          className="action-button"
        >
          <FiTrash className="action-button__icon" />
        </button>
      </div>
    </div>
  );
};

export default Post;
