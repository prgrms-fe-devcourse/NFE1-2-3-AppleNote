import React, { useState } from "react";
import styled from "styled-components";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");

  // eslint-disable-next-line no-console
  console.log(title);

  return (
    <Wrapper>
      <Title>제목</Title>
      <TitleInput onChange={(e) => setTitle(e.target.value)} type="text" />
    </Wrapper>
  );
};

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
