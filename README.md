# AppleNote(Team 8: AppleNote)

![image](https://github.com/user-attachments/assets/cefcf93d-c9e7-4f3d-a810-1dab5a135c81)

> 자유롭게 카테고리를 관리하고 포스트를 작성하세요! <br>
> 어떠한 컨셉이든 원하는 대로 표현할 수 있도록 <br>
> 개인 아카이빙 블로그 'AppleNote'가 여러분과 함께 합니다!

<br>

## 🗓️ 프로젝트 기간

### 2024. 10. 22 - 2024. 11. 05 (총 11일) (수정 필요)

<br>

## 🕵️ 구성원 및 담당 업무

<table>
  <tr>
    <td align="center">
      <strong>김동성(TL)</strong><br>
    </td>
    <td align="center">
      <strong>방정배(PM)</strong><br>
    </td>
     <td align="center">
      <strong>전나영</strong><br>
    </td>
     <td align="center">
      <strong>최윤성</strong><br>
    </td>
     <td align="center">
      <strong>한지영</strong><br>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/sun__glitter" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/170076713?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jeongbaebang" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/57677452?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jny4867" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/147975027?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/cho1ys" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/148849516?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/OpenS3same" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/175666731?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
  </tr>
    <tr>
      <td align="center">
        <strong>FE 개발</strong><br>
      </td>
      <td align="center">
        <strong>BE & FE 개발</strong><br>
      </td>
        <td align="center">
        <strong> FE 개발</strong><br>
      </td>
        <td align="center">
        <strong>BE & FE 개발</strong><br>
      </td>
        </td>
        <td align="center">
        <strong> FE 개발</strong><br>
      </td>
    </tr>
</table>

#### 김동성

- 프론트엔드
  - 메인 페이지 구현
  - 최신 포스트(3개) 및 전체 포스트(카테고리 무관) 조회
  - 카테고리별 최신 포스트(4개) 및 카테고리별 전체 포스트 조회
  - 카테고리 컴포넌트 내 카테고리 선택 및 연동 기능 구현
  - 검색 기능
  - 최종 테스트

#### 방정배

- 백엔드

  - 백엔드 아키텍처 설계
  - 데이터 스키마 설계
  - 블로그 포스트 API 작업
  - 카테고리 API 작업

- 프론트엔드
  - 사용자 로그인
  - 회원가입
  - 로그인 상태에 따른 페이지 보호

#### 전나영

- 프론트엔드
  - 카테고리 조회, 생성, 수정, 삭제
  - 랜딩 페이지 구현
  - 회원가입 시 기본 카테고리(Others) 생성 및 포스트 작성 시 자동 선택
  - 폰트 설정
  - 로고 수정

#### 최윤성

- 백엔드

  - 인증 API 작업
  - 사용자 API 작업

- 프론트엔드
  - 설정 페이지 구현
  - 배너 및 프로필 이미지 변경
  - 사용자 닉네임 변경
  - 비밀번호 변경
  - 회원탈퇴
  - 로그아웃

#### 한지영

- 프론트엔드
  - 포스트 생성, 수정, 삭제
  - 상세 포스트 조회
  - 포스트 간 슬라이딩(포스트 작성일 기준)
  - 포스트 임시저장
  - 작성 중 포스트 미리보기

### 기술스택

`TypeScript` `Express@4` `MongoDB` `Firebase Storage` (수정 필요)

<br><br><br>

# Apple Note

Apple Note는 사용자가 개인 블로그를 작성하고 관리할 수 있는 애플리케이션입니다.

## 시작하기

해당 문서는 프로젝트를 로컬 환경에서 실행하는 방법을 안내합니다.

### 필수 조건

- Node.js (버전 20 이상)
- npm (Node 패키지 매니저)

## 개발 가이드

### 설치

1. 리포지토리를 클론합니다.

```bash
  git clone https://github.com/prgrms-fe-devcourse/NFE1_2_3_AppleNote.git

  cd NFE1_2_3_AppleNote
```

2. Root 환경에서 필요한 패키지를 설치합니다.

```bash
  npm install
```

3. prepare 스크립트를 실행합니다.

```bash
  npm run prepare
```

4. 각 환경에서 작업할 환경으로 이동합니다. (`frontend`, `backend`)

```bash
  cd frontend, backend
```

5. 각 환경에서 필요한 패키지를 설치합니다. (`frontend`, `backend`)

```bash
  npm install
```

6. .env 파일을 생성하고 필요한 환경 변수를 설정합니다.

> [!TIP]  
> `.env` 파일의 예시는 `.env.template` 파일을 참조하세요.

---

### 개발 시작하기

#### **백엔드**

백엔드 서버를 실행하려면 다음 명령어를 사용합니다:

Root

```bash
  npm run dev:backend
```

Local (backend)

```bash
  npm run dev
```

#### **프론트엔드**

프론트엔드 애플리케이션을 실행하려면 다음 명령어를 사용합니다:

Root

```bash
  dev:frontend
```

Local (frontend)

```bash
  npm run dev
```
