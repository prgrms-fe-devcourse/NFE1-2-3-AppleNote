import Banner from "@components/main/Banner";
import Header from "@components/main/Header";

const SettingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="setting-profile">
        <div className="user-img">
          <img src="" alt="사용자이미지" />
          <button className="img-edit">edit</button>
        </div>
        <div className="user-profile">
          <p className="user-name">유저 이름</p>
          <button className="name-edit">edit</button>
          <p className="user-email">유저 이메일</p>
        </div>
        <button className="user-password">비밀번호 수정</button>
        <button className="user-delete">회원 탈퇴</button>
        <button className="user-logout">로그아웃</button>
      </div>
    </>
  );
};

export default SettingPage;
