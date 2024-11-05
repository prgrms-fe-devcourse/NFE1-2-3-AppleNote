import styled from "styled-components";
import edit from "@assets/icons/edit.svg";
import { deleteUser, getUser } from "./api/userApi";
import { useEffect, useState } from "react";
import { User } from "./api/userApi";
import ChangePw from "./ChangePw";
import { useAuth } from "@components/auth/useAuth";
import { useNavigate } from "react-router-dom";
import NameEditModal from "./modals/NameEditModal";
import ProfileEditModal from "./modals/ProfileEditModal";
import BannerEditModal from "./modals/BannerEditModal";
import { useModal } from "./Context/ModalContext";
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";
const SettingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const { isOpen, setOpen } = useModal(); // 모달 상태 관리
  const [modalType, setModalType] = useState<"none" | "image" | "name" | "banner">("none");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();

      setUser(userData);
    };

    fetchUser();
  }, [isOpen]);

  const changePw = () => {
    setStatus(true);
  };
  const signout = async () => {
    const confirmed = window.confirm(
      "Are you sure to delete your account? This action cannot be undone."
    ); // 회원탈퇴 확인

    if (confirmed) {
      try {
        const isDeleted = await deleteUser();

        if (isDeleted === true) {
          alert("Account deletion completed");
          navigate("/");
        } else {
          alert("Failed to delete the account.");
        }
      } catch {
        alert("An error occurred during account deletion.");
      }
    }
  };
  const openModal = (type: "image" | "name" | "banner") => {
    setModalType(type);
    setOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setOpen(false); // 모달 닫기
    setModalType("none"); // 모달 종류 초기화
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure to logout?"); // 로그아웃 확인

    if (confirmed) {
      logout({
        onSuccess: () => {
          alert("You have been logged out.");
          navigate("/");
        },
        onFailure: () => {
          alert("Logout failed.");
        },
      });
    }
  };

  return (
    <>
      <BtnWrapper>
        <BannerEditBtn onClick={() => openModal("banner")}>
          <img src={edit} />
        </BannerEditBtn>
      </BtnWrapper>
      {status ? (
        <ChangePw setStatus={setStatus} /> // status가 true이면 ChangePw 컴포넌트 렌더링
      ) : (
        <Wrapper>
          <ProfileWrapper>
            <ImgWrapper>
              <UserImg src={user?.profileImage ?? DEFAULT_PROFILE_IMAGE} />

              <ImgEditBtn onClick={() => openModal("image")}>
                <img src={edit} />
              </ImgEditBtn>
            </ImgWrapper>
            <UserProfile>
              <UserNameWrapper>
                <UserName>{user?.name}</UserName>
                <NameEditBtn onClick={() => openModal("name")}>
                  <img src={edit} />
                </NameEditBtn>
              </UserNameWrapper>

              <UserEmail>{user?.email}</UserEmail>
              <Button onClick={changePw}>Change Password</Button>
              <Button onClick={signout}>Delete Account</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </UserProfile>
          </ProfileWrapper>
          {isOpen && modalType === "banner" && <BannerEditModal onClose={closeModal} />}
          {isOpen && modalType === "image" && <ProfileEditModal onClose={closeModal} />}
          {isOpen && modalType === "name" && <NameEditModal onClose={closeModal} />}
        </Wrapper>
      )}
    </>
  );
};
const BtnWrapper = styled.div`
  margin-top: -2.3%;
  margin-right: -16px;
`;
const Wrapper = styled.div`
  margin-top: -3%;
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
  border: 0.5px solid gray;
`;
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`;

const BannerEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 98%;
  padding-top: 10px;
`;
const NameEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding-top: 10px;
`;
const ImgEditBtn = styled.button`
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
