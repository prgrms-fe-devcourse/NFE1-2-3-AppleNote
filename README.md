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

2. 각 환경에서 필요한 패키지를 설치합니다. (`frontend`, `backend`)

```bash
  npm install
```

3. .env 파일을 생성하고 필요한 환경 변수를 설정합니다. `.env` 파일의 예시는 `.env.template` 파일을 참조하세요.

4. prepare 스크립트를 실행합니다.

```bash
  npm run prepare
```

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
