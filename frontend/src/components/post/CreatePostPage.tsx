import React, { useState } from "react";
import styled from "styled-components";

const CreatePostPage: React.FC = () => {
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

  // eslint-disable-next-line no-console
  console.log(title, content);

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
    </Wrapper>
  );
};

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
