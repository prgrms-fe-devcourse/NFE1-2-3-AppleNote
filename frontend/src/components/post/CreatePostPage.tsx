import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
    }
  };

  return (
    <Wrapper>
      <Title>제목</Title>
      <TitleInput onChange={(e) => setTitle(e.target.value)} type="text" />

      <ImageWrapper>
        <ImageInput type="file" accept="image/*" onChange={handleImageUpload} />
        {!image && <PlaceholderText>이미지 추가하기</PlaceholderText>}
        {image && <PreviewImage src={image} alt="Uploaded preview" />}
      </ImageWrapper>

      <Title>본문</Title>
      <ContentText onChange={(e) => setContent(e.target.value)} />

      <ButtonWrapper>
        <Button
          onClick={() => {
            // API 추후 적용 예정 + 페이지 이동
            // eslint-disable-next-line no-console
            console.log(title, image, content);
          }}>
          확인
        </Button>
        <Button
          onClick={() => {
            setDeleteModalOpen(true);
          }}>
          삭제
        </Button>
        <Button>임시저장</Button>
        <Button
          onClick={() => {
            setPreviewModalOpen(true);
          }}>
          미리보기
        </Button>
      </ButtonWrapper>

      {deleteModalOpen && (
        <ModalOverlay
          onClick={() => {
            setDeleteModalOpen(false);
          }}>
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div>삭제하시겠습니까?</div>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  navigate("/");
                }}>
                Yes
              </Button>
              <Button
                onClick={() => {
                  setDeleteModalOpen(false);
                }}>
                No
              </Button>
            </ButtonWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
      {previewModalOpen && (
        <ModalOverlay
          onClick={() => {
            setPreviewModalOpen(false);
          }}>
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}></ModalWrapper>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

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
`;

const Button = styled.div`
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const PlaceholderText = styled.div`
  color: white;
  font-size: 18px;
  position: absolute;
  z-index: 1;
`;

const ContentText = styled.textarea`
  width: 100%;
  height: 300px;
  resize: none;
`;

const TitleInput = styled.input`
  width: 100%;
`;

const Title = styled.div`
  font-size: 20px;
  color: gray;
`;

const Wrapper = styled.div`
  width: 600px;
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
`;

export default CreatePostPage;
