import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, fetchPost, FetchPostResponse } from "./postAPI";
import styled from "styled-components";
import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchAllPosts } from "@components/main/postApi";
import { getThumbnailSrc } from "@common/utils/getThumbnailSrc";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState<FetchPostResponse>();
  const [idList, setIdList] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        {postInfo?.payload.categories.length !== 0 && (
          <PostInfo>{postInfo?.payload.categories[0].name}</PostInfo>
        )}
        <PostInfo>
          {new Date(postInfo?.payload.createdAt as Date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </PostInfo>
      </PostInfoWrapper>
      <Image src={getThumbnailSrc(postInfo?.payload.images)} />
      <Content>{postInfo?.payload.content}</Content>
      <IconWrapper>
        <LuPencilLine
          onClick={() => {
            navigate(`/edit-post/${id}`);
          }}
          size={25}
        />
        <FaRegTrashCan
          // onClick={() => {
          //   deletePostData();
          // }}
          // size={30}
          onClick={() => setDeleteModalOpen(true)} // Update this line
          size={23}
        />
      </IconWrapper>

      {deleteModalOpen && (
        <ModalOverlay onClick={() => setDeleteModalOpen(false)}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <div>삭제하시겠습니까?</div>
            <ButtonWrapper>
              <Button onClick={deletePostData}>Yes</Button>
              <Button onClick={() => setDeleteModalOpen(false)}>No</Button>
            </ButtonWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
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
  width: 70px;
  display: flex;
  margin-left: 650px;
  gap: 15px;
  margin-bottom: 70px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.div`
  cursor: pointer;
  padding: 5px 15px;
`;

const Content = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  width: 750px;
  height: auto;
`;

const Image = styled.img`
  margin-top: 70px;
  width: 600px;
  height: 400px;
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
  margin-top: 100px;
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
