import { Category } from "@components/category/categoryApi";
import SelectCategory from "@components/category/SelectCategory";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchPost,
  patchPost,
  PostPayload,
  deletePost,
  createPostCagegory,
  deletePostCategory,
} from "./postAPI";

type State = {
  previewModalOpen: boolean;
  deleteModalOpen: boolean;
  title: string;
  content: string;
  image: { files: File; urls: string } | null;
  selectedCategory: Category | null;
};
type Action =
  | { type: "TOGGLE_PREVIEW_MODAL"; payload: boolean }
  | { type: "TOGGLE_DELETE_MODAL"; payload: boolean }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_IMAGE"; payload: { files: File; urls: string } | null }
  | { type: "SET_CATEGORY"; payload: Category | null };

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
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    content: "",
    image: null,
    previewModalOpen: false,
    deleteModalOpen: false,
    selectedCategory: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchPostData = async () => {
    try {
      const data = await fetchPost(id as string);

      dispatch({ type: "SET_TITLE", payload: data.payload.title });
      dispatch({ type: "SET_CONTENT", payload: data.payload.content });
      if (data.payload.images && data.payload.images.length > 0) {
        dispatch({
          type: "SET_IMAGE",
          payload: { files: {} as File, urls: data.payload.images[0] },
        });
      }

      await deleteCategory(data.payload.categories);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  const deleteCategory = async (
    payload: {
      categoryId: string;
      name: string;
    }[]
  ) => {
    try {
      await deletePostCategory(id as string, [payload[0].categoryId]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePostData = async () => {
    try {
      const payload: PostPayload = {
        title: state.title,
        content: state.content,
        images: state.image
          ? Object.keys(state.image.files).length !== 0
            ? [state.image.files]
            : [state.image.urls]
          : undefined,
        categoryId: state.selectedCategory?.categoryId,
      };
      const data = await patchPost(id as string, payload);

      if (state.selectedCategory) {
        await createPostCagegory(data.payload.postId, [
          state.selectedCategory?.categoryId as string,
        ]);
      }

      navigate(`/posts/${data.payload.postId}`);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      if (state.image?.urls) {
        URL.revokeObjectURL(state.image.urls);
      }

      dispatch({
        type: "SET_IMAGE",
        payload: {
          files: file,
          urls: imageUrl,
        },
      });
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(id as string);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <LeftContent>
          <Title>Title</Title>
          <TitleInput
            value={state.title}
            onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            type="text"
          />

          <ImageWrapper>
            <ImageInput
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              $isModalOpen={state.previewModalOpen || state.deleteModalOpen}
            />
            {!state.image && (
              <PlaceholderText>
                <FaPlus size={50} />
                <div>Add Image</div>
              </PlaceholderText>
            )}
            {state.image && (
              <>
                <Image src={state.image.urls} alt="Uploaded preview" />
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    if (state.image?.urls) {
                      URL.revokeObjectURL(state.image.urls);
                    }
                    dispatch({ type: "SET_IMAGE", payload: null });
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                  }}>
                  x
                </DeleteIcon>
              </>
            )}
          </ImageWrapper>

          <Title>Text</Title>
          <ContentText
            value={state.content}
            onChange={(e) => dispatch({ type: "SET_CONTENT", payload: e.target.value })}
          />

          <ButtonWrapper>
            <Button
              onClick={() => {
                updatePostData();
              }}>
              Confirm
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                dispatch({ type: "TOGGLE_PREVIEW_MODAL", payload: true });
              }}>
              Preview
            </Button>
          </ButtonWrapper>
        </LeftContent>
        <RightContent>
          <SelectCategory
            selectedCategory={state.selectedCategory}
            setSelectedCategory={useCallback(
              (value: Category | null | ((prev: Category | null) => Category | null)) => {
                if (typeof value === "function") {
                  const category = value(state.selectedCategory);

                  dispatch({ type: "SET_CATEGORY", payload: category });
                } else {
                  dispatch({ type: "SET_CATEGORY", payload: value });
                }
              },
              [state.selectedCategory]
            )}
          />
        </RightContent>
      </ContentWrapper>

      {state.deleteModalOpen && (
        <ModalOverlay
          onClick={() => {
            dispatch({ type: "TOGGLE_DELETE_MODAL", payload: false });
          }}>
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div>Are you sure you want to delete this?</div>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  handleDeletePost();
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
            {state.image && <PreviewImg src={state.image.urls} />}
            {state.content !== "" && <PreviewContent>{state.content}</PreviewContent>}
          </ModalWrapper>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #979696;
  font-weight: bold;
  padding: 4px;
  cursor: pointer;
  z-index: 3;
  pointer-events: auto;
  font-size: 20px;
`;

const PreviewContent = styled.div`
  margin-top: 10px;
  width: 600px;
  margin-top: 40px;
`;
const PreviewImg = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
  margin-top: 40px;
`;
const PreviewTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
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

const ImageInput = styled.input<{ $isModalOpen: boolean }>`
  width: 600px;
  height: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
  pointer-events: ${(props) => (props.$isModalOpen ? "none" : "auto")};
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

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightContent = styled.div``;
const ContentWrapper = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
`;

export default EditPostPage;
