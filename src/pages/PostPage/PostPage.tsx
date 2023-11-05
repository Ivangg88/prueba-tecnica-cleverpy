import withLayout from "../../components/Layout/Layout";
import PostList from "../../components/PostList/PostList";
import withBasePage from "../BasePage/BasePage";

const PostPage = () => {
  return withLayout(withBasePage(<PostList />));
};

export default PostPage;
