import { Navigate, useParams } from "react-router-dom";
import DetailPost from "../../components/DetailPost/DetailPost";
import withLayout from "../../components/Layout/Layout";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import withBasePage from "../BasePage/BasePage";

const DetailPage = () => {
  const { postsData } = useAppSelector((state: RootState) => state.data);
  const { postId } = useParams();
  const post = postsData.find((post) => post.id === parseInt(postId!));

  if (!post) return <Navigate to={"/notfound"} />;

  return withLayout(withBasePage(<DetailPost post={post} />));
};

export default DetailPage;
