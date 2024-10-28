import styled from "styled-components";
import edit from "@assets/icons/edit.svg";
import { deleteUser, getUser } from "./userApi";
import { useEffect, useState } from "react";
import { User } from "./userApi";
import ChangePw from "./ChangePw";
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";
const SettingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();

      setUser(userData);
    };

    fetchUser();
  }, []);
  const changePw = () => {
    setStatus(true);
  };
  const signout = async () => {
    try {
      const isDeleted = await deleteUser(); // 회원 탈퇴 API 호출

      if (isDeleted) {
        alert("회원탈퇴 완료"); // 모달창 혹은 alert로 변경 예정
      } else {
        alert("회원 탈퇴에 실패했습니다."); // 모달창 혹은 alert로 변경 예정
      }
    } catch {
      alert("회원 탈퇴 중 오류 발생"); // 모달창 혹은 alert로 변경 예정
    }
  };
  const logout = () => {};

  const editImg = () => ({});
  const editName = () => ({});

  return (
    <>
      {status ? (
        <ChangePw setStatus={setStatus} /> // status가 true이면 ChangePw 컴포넌트 렌더링
      ) : (
        <Wrapper>
          <ProfileWrapper>
            <ImgWrapper>
              <UserImg src={user?.profileImg || DEFAULT_PROFILE_IMAGE} />

              <ImgEditBtn onClick={editImg}>
                <img src={edit} />
              </ImgEditBtn>
            </ImgWrapper>
            <UserProfile>
              <UserName>{user?.name}</UserName>
              <NameEditBtn onClick={editName}>
                <img src={edit} />
              </NameEditBtn>

              <UserEmail>{user?.email}</UserEmail>
              <Button onClick={changePw}>비밀번호 변경</Button>
              <Button onClick={signout}>회원 탈퇴</Button>
              <Button onClick={logout}>로그아웃</Button>
            </UserProfile>
          </ProfileWrapper>
        </Wrapper>
      )}
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
  margin-right: 100px;
  display: flex;
  flex-direction: column;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.div<{ src: string }>`
  border-radius: 50%;
  width: 250px;
  height: 250px;
  background-color: aliceblue;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
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

const ImgEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 79%;
  margin-top: -10%;
`;
const NameEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 60%;
  margin-top: -15%;
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
