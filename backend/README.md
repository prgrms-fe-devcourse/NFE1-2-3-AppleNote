### 프로젝트 소개

프로젝트 이름: Apple Note Blog Server

프로젝트 목표: `AppleNote` 프로젝트는 사용자가 원하는 카테고리로 포스트를 작성하고 손쉽게 관리할 수 있는 개인 블로그를 목표로 합니다.

### 프로젝트 기간

2024.10.22 - 2024.11.05 (총 11일)

### 주요 기능 (Features)

#### 카테고리별 포스트 작성 및 관리:

사용자가 주제에 맞는 카테고리를 선택해 포스트를 작성하고 관리할 수 있도록 해야 합니다.

#### 검색 및 필터:

특정 카테고리로 포스트를 필터링하고, 키워드로 검색할 수 있는 기능을 제공합니다.

#### 인증:

사용자 정보를 안전하게 관리하기 위해 비밀번호를 암호화하여 저장하고, 사용자를 구분할 수 있는 인증 기능이 필요합니다.

### 프로젝트 API

[API 명세서: ](https://jeongbaebang.notion.site/API-1-0-137bd0b173bb8008b372f3404bc42113#137bd0b173bb80a6a7b5cf9d13945742)
요구사항에 맞게 API를 설계하고, 문서를 기반으로 프론트엔드 팀과 소통을 진행했습니다.

### 프로젝트 기여자

<table>
  <tr>
   <!-- 팀원#1 이름 -->
    <td align="center">
      <strong>방정배</strong><br>
    </td>
    <!-- 팀원#2 이름 -->
     <td align="center">
      <strong>최윤성</strong><br>
    </td>
  </tr>
  <tr>
    <!-- 팀원#1 프로필 -->
    <td align="center">
      <a href="https://github.com/jeongbaebang" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/57677452?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
    <!-- 팀원#2 프로필 -->
    <td align="center">
      <a href="https://github.com/cho1ys" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/148849516?v=4" alt="Alice"  width="110px" height="110px"/>
      </a>
    </td>
  </tr>
    <tr>
      <td align="center">
        <strong>백엔드 개발</strong><br>
      </td>
      <td align="center">
        <strong>백엔드 개발</strong><br>
      </td>
    </tr>
</table>

#### 방정배

- 백엔드 아키텍처 설계
- 데이터 스키마 설계
- 블로그 포스트 API 작업
- 카테고리 API 작업

#### 최윤성

- 인증 API 작업
- 사용자 API 작업

### 기술스택

`TypeScript` `Express@4` `MongoDB` `Firebase Storage`

### 시스템 아키텍처

<div align="center">
  <img algin="center" alt="System Architecture" src="https://github.com/user-attachments/assets/5fceef46-ca47-4950-9aef-d4f811cdccda">
</div>

#### Client

- 클라이언트는 `REST API`를 통해 백엔드 서버와 통신하고, 요청 및 응답을 `JSON`으로
  주고받습니다.

#### Server

- 서버는 `REST API`를 통해 클라이언트와 통신하고, 각 요청에 따라 알맞은 데이터를
  `MongoDB`에서 가져오거나 `Firebase Storage`에 접근하여 필요한 파일을 처리합니다.

### 계층형 아키텍처

<div align="center">
  <img algin="center" alt="계층형 아키텍처 기반 MC 패턴" src="https://github.com/user-attachments/assets/4c352d2c-0e00-4b31-a134-510b3ff653ed">
</div>

#### 계층형 아키텍처

- 계층형 아키텍처는 각 레이어가 독립적인 역할을 담당하도록 분리되어 있으며, 각 레이어는 책임을 명확히 나누어 코드의 재사용성과 유지보수성을 높였습니다. 클라이언트의 요청은 `라우트` → `컨트롤러` → `서비스` → `저장소` 레이어를 거쳐 데이터베이스와 파일 스토리지에 접근하며, 처리 결과는 다시 클라이언트에게 전달됩니다.

### 데이터베이스 구조

<div align="center">
  <img algin="center" alt="ERD" src="https://github.com/user-attachments/assets/65d671d2-2ae7-46d9-8237-6ebaee793bda">
</div>

#### 컬렉션 설명

- `User 컬렉션`: 사용자 정보를 저장하는 컬렉션입니다.

- `Post 컬렉션`: 게시물 정보를 저장하는 컬렉션입니다. 사용자(`User`)와 연관되어 있으며, 각 게시물은 작성자의 ID(`authorId`)를 참조합니다.

- `Category 컬렉션`: 카테고리 정보를 저장하는 컬렉션입니다. 각 카테고리는 여러 게시물과 연결될 수 있습니다. 각 `Post`는 `categories` 필드로 참조된 카테고리를 가리킵니다.

#### 관계 설명

- `User ↔ Post`: 각 게시물은 하나의 작성자(사용자)를 가지며, `authorId`를 통해 `User` 컬렉션과 연결됩니다.

- `Post ↔ Category`: 여러 포스트가 하나의 카테고리를 참조하고, 각 카테고리는 여러 포스트를 가질 수 있습니다.

### 개발적 고민 🧐

백엔드 팀은 실제 개발을 시작하기 전에 유연하게 기능을 개선하고 추가할 수 있는 방법에 대해 고민하였습니다. 개발 기간이 짧은 상황에서 빠르게 기능을 추가하면서도 중복성을 최소화할 수 있는 방법에 대해 여러 가지 방안을 모색했습니다. 특히 현재 Firebase 스토리지를 사용하여 이미지 처리를 하고 있지만, AWS S3와 같은 다른 서비스로의 손쉬운 이전이 가능하도록 설계를 유연하게 구성하는 방법을 고민하였습니다.

이러한 고민을 바탕으로, 저는 단일 책임 원칙(SRP)과 의존성 주입(DI)을 활용하여 문제를 해결하고자 합니다.

#### 단일 책임 원칙

`단일 책임 원칙`이란 객체는 단 하나의 책임만 가져야 한다는 원칙을 말합니다. 여기서 ‘책임’이라는 의미는 하나의 기능을 담당하는 것으로 이해할 수 있습니다.

저희 서비스의 요구사항을 고려해보면, 포스트, 카테고리, 사용자 정보, 그리고 인증(Auth)으로 크게 책임을 나눌 수 있습니다. 이러한 단일 책임 원칙을 잘 지킴으로써 한 책임의 변경이 다른 책임의 변경으로 이어지는 연쇄작용에서 자유로워질 수 있습니다.

#### 의존성 주입

`의존성 주입`이란 객체 간의 의존 관계를 외부에서 주입하여 객체의 생성과 초기화를 관리하는 기법을 의미합니다. 이 원칙을 통해 각 객체는 자신의 의존성을 스스로 관리하지 않고, 필요할 때 외부에서 주입받게 됩니다. 이렇게 하면 객체 간의 결합도가 낮아져 코드의 유연성과 재사용성이 향상됩니다.

저희 서비스에서 포스트 이미지 저장을 위해 Firebase 스토리지를 사용하고 있습니다. 이 경우 의존성 주입을 통해 이미지 저장 서비스가 Firebase를 직접 참조하는 대신, 추상화된 인터페이스를 통해 외부에서 주입받도록 설정할 수 있습니다.

#### 코드 설계

아래는 실제 프로젝트에서 단일 책임 원칙(SRP)과 의존성 주입(DI)을 활용하여 설계한 코드 일부입니다.

```ts
// fileService.ts

export interface IFileService {
  uploadImageList(files: Images): Promise<string[]>;
}

export class FileService implements IFileService {
  constructor(private storage: IFileStorage) {}

  async uploadImageList(data: Images): Promise<string[]> {
    const files = validators.isArray(data) ? data : Object.values(data).flat();

    if (files.length > 0) {
      const uploadPromises = files.map((file) => this.storage.uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);

      return uploadedFiles.map((result) => result.url);
    }

    return [];
  }
}
```

이렇게 하면 나중에 다른 서비스인 AWS S3로 쉽게 전환할 수 있으며, 코드의 변경 없이도 새로운 저장소를 사용할 수 있게 됩니다.

```ts
// Firebase Storage
const firebaseStorage = new FirebaseStorage();
const fileService = new FileService(firebaseStorage);

// AWS S3 Storage
const awsS3Storage = new AwsS3Storage();
const fileService = new FileService(awsS3Storage);
```

특히, 비즈니스 로직을 처리하는 서비스 레이어에서는 내부 동작을 알 필요 없이 오직 비즈니스 로직에만 집중할 수 있습니다.

```ts
// postRoutes.ts
...
const postService = new PostService(fileService, mongoPostRepository);
const postController = new PostController(postService);

// postService.ts
export class PostService implements IPostService {
  constructor(
    private fileService: IFileService,
    private postRepository: IPostRepository
  ) {}

  async createPost({ header, data, user }: CreatePostArg): Promise<CreatePostReturn> {
    const fileToUrls = data.images?.files
      ? await this.fileService.uploadImageList(data.images.files)
      : [];

    const payload = await this.postRepository.create({
      data: {
        ...data,
        authorId: user.userId,
        images: [...fileToUrls, ...validUrls],
      },
    });

    return payload;
  }
  ...
```

#### 설계를 해보며 느낀점

실제로 계층형 아키텍처를 도입하면서 가장 큰 장점으로 느꼈던 점은 각 레이어가 상위 레이어에만 의존하고, 역방향 호출이 없다는 것입니다. 이러한 특성을 활용하면 특정 레이어에서 발생한 에러가 서버를 다운시키지 않고, 의존 관계에 따라 에러가 전파될 수 있습니다.

이로 인해 사용자 요청과 응답을 처리하는 컨트롤러에서 에러를 잡아내고, 처리 가능한 에러와 그렇지 못한 에러를 구분하여 손쉽게 처리할 수 있다는 점이 큰 장점으로 다가왔습니다.

```ts
// postController.ts

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const { title, content, temp, images: urls } = req.body;
      const files = req.files;

      const post = await this.postService.createPost({ //  특정 레이어에서 발생한 에러가 상위로 전파됩니다!
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, temp, images: { files, urls } },
      });

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
...
```

에러를 구분하는 과정에서는 특정 레이어에서 발생한 에러만 처리하면 되기 때문에, 에러가 상위 레이어로 전파된 후 `catch` 구문에서 의도된 에러(예: 필드값 누락, 인증 토큰 부재)와 의도되지 않은 에러를 구분할 수 있도록 `Error` 클래스를 확장했습니다.

이를 통해 사용자에게 적절한 에러 응답값을 반환할 수 있도록 구성하여, 에러 처리 과정을 보다 용이하게 만들었습니다.

```ts
// Error.ts

export class ServiceError extends Error {
  statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);

    this.name = this.constructor.name; // "ServiceError"
    this.statusCode = statusCode;

    // V8 엔진의 메서드, 오류 발생 지점을 보다 쉽게 추적할 수 있도록 도와줍니다.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
```

이렇듯 각 레이어에 하나의 책임만을 부여하여 로직을 구성하게 된다면, 에러가 발생하더라도 에러의 범위를 크게 줄여 문제의 원인을 빠르게 파악할 수 있었습니다.

#### 마무리

처음에는 사용자 요구사항을 반영하여 기능을 추가하는 기간 대신 아키텍처 설계에 더 많은 시간을 투자하는 것이 과연 바람직한 선택인지에 대해 의문을 가졌습니다. 하지만 실제로 아키텍처를 도입해 설계를 진행해본 결과, 사용자 요구사항이 추가됨에 따라 유연하게 대처할 수 있었고, 에러가 발생했을 때도 그 범위를 최소화하여 문제의 원인을 빠르게 파악할 수 있었습니다.
