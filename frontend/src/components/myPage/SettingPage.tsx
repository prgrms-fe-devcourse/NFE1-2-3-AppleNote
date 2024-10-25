import Banner from "@components/main/Banner";
import styled from "styled-components";
import edit from "@assets/icons/edit.svg";
const SettingPage = () => {
  return (
    <>
      <Banner />
      <Wrapper>
        <ProfileWrapper>
          <ImgWrapper>
            <UserImg>
              <img src="" alt="사용자이미지" />
            </UserImg>
            <EditBtn>
              <img src={edit} />
            </EditBtn>
          </ImgWrapper>
          <UserProfile>
            <UserName>유저 이름</UserName>
            <EditBtn>
              <img src={edit} />
            </EditBtn>

            <UserEmail>유저 이메일</UserEmail>

            <Button>비밀번호 수정</Button>
            <Button>회원 탈퇴</Button>
            <Button>로그아웃</Button>
          </UserProfile>
        </ProfileWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
const ImgWrapper = styled.div`
  position: relative;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.div`
  border-radius: 50%;
  width: 250px;
  height: 250px;
  object-fit: cover;
  background-color: aliceblue;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`;

const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 79%;
  margin-top: -10%;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 15%;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 160%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SettingPage;
