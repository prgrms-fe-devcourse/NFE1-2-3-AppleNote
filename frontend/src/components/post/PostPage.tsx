import { useParams } from "react-router-dom";
import { fetchPost } from "./postAPI";
import { useEffect } from "react";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const fetchPostData = async () => {
    try {
      const data = await fetchPost(id as string);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return <></>;
};

export default PostPage;
