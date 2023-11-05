import { PostData } from "../../types/interfaces";
import useData from "../../hooks/useData/useData";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import "./DetailPost.scss";
import { useNavigate } from "react-router";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoReturnDownBack } from "react-icons/io5";
import { useState } from "react";

interface DetailPostProps {
  post: PostData;
}
const initialPost: PostData = { body: "", id: 0, title: "", userId: 0 };

const DetailPost = ({ post }: DetailPostProps): JSX.Element => {
  const { deletePost, updatePost } = useData();
  const { usersData } = useAppSelector((state: RootState) => state.data);

  const [isEditable, setIsEditable] = useState(false);
  const [editablePost, setEditablePost] = useState<PostData>(initialPost);
  const navigator = useNavigate();
  const userPost = usersData.filter((user) => user.id === post.userId)[0];
  const userOptions = usersData.map((user) => (
    <option key={user.id}>{user.name}</option>
  ));

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    deletePost(post.id);
    navigator("/");
  };

  const handleEditClick = () => {
    setEditablePost(post);
    setIsEditable(true);
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditablePost({
      ...editablePost,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserName = event.target.value;
    const newUserId = usersData.filter((user) => user.name === newUserName)[0]
      .id;
    setEditablePost({ ...editablePost, userId: newUserId });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePost(editablePost);
    setIsEditable(false);
  };

  return (
    <div className="detail-post u--fadeInRight">
      {isEditable ? (
        <form className="form-container" onSubmit={handleFormSubmit}>
          <div className="form-container__input-container">
            <label className="form-container--label" htmlFor="title-input">
              Title:
            </label>
            <input
              id="title-input"
              className="form-container__input form-container__input--title"
              name="title"
              value={editablePost.title}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-container__input-container">
            <label className="form-container--label" htmlFor="select">
              Author:
            </label>
            <select
              id="select"
              className="form-container__input form-container__input--select"
              onChange={handleSelect}
              defaultValue={userPost.name}
            >
              {userOptions}
            </select>
          </div>
          <div className="form-container__input-container">
            <label className="form-container--label" htmlFor="input-content">
              Content:
            </label>
            <textarea
              id="input-content"
              rows={10}
              className="form-container__input form-container__input--content"
              name="body"
              value={editablePost.body}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-container__buttons-container">
            <button className="form-button" type="submit">
              Submit
            </button>
            <button
              className="form-button"
              onClick={() => setIsEditable(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <button className="detail-post__return" onClick={() => navigator(-1)}>
            <IoReturnDownBack />
          </button>
          <h2 className="detail-post__title">{post.title}</h2>
          <p className="detail-post__body">{post.body}</p>
          <h3 className="detail-post__author">By {userPost?.name}</h3>
          <div className="detail-post__buttons-container">
            <button
              aria-label="delete"
              onClick={handleDeleteClick}
              type="button"
              className="detail-action-button"
            >
              <FiTrash className="detail-action-button__icon" />
            </button>
            <button
              aria-label="edit"
              onClick={handleEditClick}
              type="button"
              className="action-button"
            >
              <FiEdit className="detail-action-button__icon" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPost;
