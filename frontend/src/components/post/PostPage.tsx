import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return <></>;
};

export default PostPage;
