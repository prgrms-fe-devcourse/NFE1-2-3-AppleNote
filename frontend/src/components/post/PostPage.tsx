import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPost } from "./postAPI";
import styled from "styled-components";

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

  return (
    <Wrapper>
      <Title>임시데이터</Title>
      <PostInfoWrapper>
        <PostInfo>카테고리 임시</PostInfo>
        <PostInfo>생성일 임시</PostInfo>
      </PostInfoWrapper>
      <Image src="/default-banner-image.png" />
      <Content>임시데이터</Content>
    </Wrapper>
  );
};

const Content = styled.div``;
const Image = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
`;

const PostInfo = styled.div`
  font-size: 15px;
  color: gray;
`;
const PostInfoWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  gap: 20px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
`;
const Wrapper = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default PostPage;
