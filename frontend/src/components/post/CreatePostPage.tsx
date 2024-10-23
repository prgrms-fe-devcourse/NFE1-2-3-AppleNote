import React, { useState } from "react";
import styled from "styled-components";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // eslint-disable-next-line no-console
  console.log(title, content);

  return (
    <Wrapper>
      <Title>제목</Title>
      <TitleInput onChange={(e) => setTitle(e.target.value)} type="text" />
      <Title>본문</Title>
      <ContentText onChange={(e) => setContent(e.target.value)} />
    </Wrapper>
  );
};

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
`;

export default CreatePostPage;
