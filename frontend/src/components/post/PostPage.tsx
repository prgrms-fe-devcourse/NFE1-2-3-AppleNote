import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, fetchPost, FetchPostResponse } from "./postAPI";
import styled from "styled-components";
import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchAllPosts } from "@components/main/postApi";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState<FetchPostResponse>();
  const [idList, setIdList] = useState<string[]>([]);

  const fetchPostData = async () => {
    try {
      const data = await fetchPost(id as string);

      setPostInfo(data);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  const deletePostData = async () => {
    try {
      await deletePost(id as string);
      navigate("/home");
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  const fetchPostList = async () => {
    try {
      const data = await fetchAllPosts();
      const postIds = data.map((post: { postId: string }) => post.postId);

      setIdList(postIds);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const goToPreviousPost = () => {
    const currentIndex = idList.indexOf(id as string);

    if (currentIndex > 0) {
      navigate(`/posts/${idList[currentIndex - 1]}`);
    }
  };

  const goToNextPost = () => {
    const currentIndex = idList.indexOf(id as string);

    if (currentIndex < idList.length - 1) {
      navigate(`/posts/${idList[currentIndex + 1]}`);
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchPostList();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Wrapper>
      <Title>{postInfo?.payload.title}</Title>
      <PostInfoWrapper>
        <PostInfo>{postInfo?.payload.categories[0].name}</PostInfo>
        <PostInfo>
          {new Date(postInfo?.payload.createdAt as Date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </PostInfo>
      </PostInfoWrapper>
      <Image src={postInfo?.payload.images[0]} />
      <Content>{postInfo?.payload.content}</Content>
      <IconWrapper>
        <LuPencilLine
          onClick={() => {
            navigate(`/edit-post/${id}`);
          }}
          size={30}
        />
        <FaRegTrashCan
          onClick={() => {
            deletePostData();
          }}
          size={30}
        />
      </IconWrapper>
      <NaviWrapper>
        <NaviContent>
          <IoIosArrowBack onClick={goToPreviousPost} size={50} color="#fff" />
        </NaviContent>
        <NaviContent>
          <IoIosArrowForward onClick={goToNextPost} size={50} color="#fff" />
        </NaviContent>
      </NaviWrapper>
    </Wrapper>
  );
};

const NaviContent = styled.div`
  width: 50px;
  background-color: black;
`;
const NaviWrapper = styled.div`
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const IconWrapper = styled.div`
  width: 600px;
  display: flex;
  gap: 15px;
`;

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
  width: 600px;
  display: inline-flex;
  justify-content: flex-end;
  gap: 20px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default PostPage;
