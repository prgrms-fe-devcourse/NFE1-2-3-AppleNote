import { Category } from "@components/category/categoryApi";
import SelectCategory from "@components/category/SelectCategory";
import { useEffect, useReducer, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  createPost,
  createPostCagegory,
  deletePost,
  Post,
  PostPayload,
  tempCreatePost,
  tempPostList,
} from "./postAPI";
import { getThumbnailSrc } from "@common/utils/getThumbnailSrc";

type State = {
  previewModalOpen: boolean;
  deleteModalOpen: boolean;
  title: string;
  content: string;
  image: { files: File; urls: string } | null;
};
type Action =
  | { type: "TOGGLE_PREVIEW_MODAL"; payload: boolean }
  | { type: "TOGGLE_DELETE_MODAL"; payload: boolean }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_IMAGE"; payload: { files: File; urls: string } | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_PREVIEW_MODAL":
      return { ...state, previewModalOpen: !state.previewModalOpen };
    case "TOGGLE_DELETE_MODAL":
      return { ...state, deleteModalOpen: !state.deleteModalOpen };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    content: "",
    image: null,
    previewModalOpen: false,
    deleteModalOpen: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [tempModalOpen, setTempModalOpen] = useState(false);

  const savePostData = async () => {
    try {
      const payload: PostPayload = {
        title: state.title,
        content: state.content,
        images: state.image ? [state.image.files] : undefined,
      };
      const data = await createPost(payload);

      if (selectedCategory) {
        await createPostCagegory(data.payload.postId, [selectedCategory?.categoryId as string]);
        navigate(`/posts/${data.payload.postId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tempSavePostData = async () => {
    try {
      const payload: PostPayload = {
        title: state.title,
        content: state.content,
        images: state.image ? [state.image.files] : undefined,
        temp: true,
      };

      await tempCreatePost(payload);
      await fetchTempPostList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      dispatch({
        type: "SET_IMAGE",
        payload: {
          files: file,
          urls: imageUrl,
        },
      });
    }
  };

  const fetchTempPostList = async () => {
    try {
      const data = await tempPostList();

      setPostList(data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTempPost = async (id: string) => {
    try {
      await deletePost(id);
      await fetchTempPostList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTempPostList();
  }, []);

  return (
    <Wrapper>
      <LeftContent>
        <Title>제목</Title>
        <TitleInput
          onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
          type="text"
          value={state.title}
        />

        <ImageWrapper>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            isModalOpen={state.previewModalOpen || state.deleteModalOpen || tempModalOpen}
          />
          {!state.image && (
            <PlaceholderText>
              <FaPlus size={50} />
              <div>이미지 추가하기</div>
            </PlaceholderText>
          )}
          {state.image && <Image src={state.image.urls} alt="Uploaded preview" />}
        </ImageWrapper>

        <Title>본문</Title>
        <ContentText
          onChange={(e) => dispatch({ type: "SET_CONTENT", payload: e.target.value })}
          value={state.content}
        />

        <ButtonWrapper>
          <Button
            onClick={() => {
              savePostData();
            }}>
            확인
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "TOGGLE_DELETE_MODAL", payload: true });
            }}>
            삭제
          </Button>
          <TempButton>
            <div
              onClick={() => {
                tempSavePostData();
              }}>
              임시저장
            </div>
            {postList.length !== 0 && (
              <TempCount onClick={() => setTempModalOpen(true)}>| {postList.length}</TempCount>
            )}
          </TempButton>
          <Button
            onClick={() => {
              dispatch({ type: "TOGGLE_PREVIEW_MODAL", payload: true });
            }}>
            미리보기
          </Button>
        </ButtonWrapper>
      </LeftContent>
      <RightContent>
        <SelectCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </RightContent>

      {tempModalOpen && (
        <ModalOverlay onClick={() => setTempModalOpen(false)}>
          <TempPostModal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>임시 저장된 글 목록</ModalTitle>
            {postList.map((post) => (
              <PostRow key={post.postId}>
                <PostInfo
                  onClick={() => {
                    dispatch({ type: "SET_TITLE", payload: post.title });
                    dispatch({ type: "SET_CONTENT", payload: post.content });
                    dispatch({
                      type: "SET_IMAGE",
                      payload:
                        post.images.length > 0 ? { files: {} as File, urls: post.images[0] } : null,
                    });
                    setTempModalOpen(false);
                  }}>
                  <PostTitle>{post.title || "제목없음"}</PostTitle>
                  <PostDate>
                    {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </PostDate>
                </PostInfo>
                <DeleteButton
                  onClick={() => {
                    deleteTempPost(post.postId);
                  }}>
                  x
                </DeleteButton>
              </PostRow>
            ))}
          </TempPostModal>
        </ModalOverlay>
      )}
      {state.deleteModalOpen && (
        <ModalOverlay
          onClick={() => {
            dispatch({ type: "TOGGLE_DELETE_MODAL", payload: false });
          }}>
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div>삭제하시겠습니까?</div>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  navigate(-1);
                }}>
                Yes
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: "TOGGLE_DELETE_MODAL", payload: false });
                }}>
                No
              </Button>
            </ButtonWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
      {state.previewModalOpen && (
        <ModalOverlay
          onClick={() => {
            dispatch({ type: "TOGGLE_PREVIEW_MODAL", payload: false });
          }}>
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}>
            {state.title !== "" && <PreviewTitle>{state.title}</PreviewTitle>}
            {state.image ? (
              <PreviewImg src={state.image.urls} />
            ) : (
              <PreviewImg src={getThumbnailSrc(undefined)} />
            )}
            {state.content !== "" && <PreviewContent>{state.content}</PreviewContent>}
          </ModalWrapper>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

const TempPostModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 70vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.span`
  font-weight: bold;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: gray;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const TempButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  gap: 5px;
`;

const TempCount = styled.div``;

const RightContent = styled.div``;

const LeftContent = styled.div``;

const PreviewContent = styled.div`
  margin-top: 10px;
`;
const PreviewImg = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
`;
const PreviewTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
`;

const ModalWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
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

const Button = styled.div`
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  width: 600px;
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageInput = styled.input<{ isModalOpen: boolean }>`
  width: 600px;
  height: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
  pointer-events: ${(props) => (props.isModalOpen ? "none" : "auto")};
`;

const Image = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
`;

const PlaceholderText = styled.div`
  color: white;
  font-size: 18px;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ContentText = styled.textarea`
  width: 600px;
  height: 300px;
  resize: none;
`;

const TitleInput = styled.input`
  width: 600px;
`;

const Title = styled.div`
  width: 600px;
  font-size: 20px;
  color: gray;
`;

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export default CreatePostPage;
