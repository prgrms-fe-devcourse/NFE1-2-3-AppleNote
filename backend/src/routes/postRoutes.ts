import { FirebaseStorage } from "@src/config/FirebaseStorage";
import { PostController } from "@src/controller/postController";
import { FileService } from "@src/service/fileService";
import { PostService } from "@src/service/postService";
import express from "express";
import multer from "multer";

const route = express.Router();

const fileService = new FileService(new FirebaseStorage());
const postService = new PostService(fileService);
const postController = new PostController(postService);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const IMAGE_MAX_COUNT = 10;

//posts

// 임시 포스트 리스트 조회
route.get("/temp", postController.getPostListByTemp.bind(postController));

// 포스트 ID로 상세 조회
route.get("/:postId", postController.getPostDetail.bind(postController));

// 포스트 리스트 조회
route.get("/", postController.read.bind(postController));

// 포스트 생성
route.post(
  "/",
  upload.array("images", IMAGE_MAX_COUNT),
  postController.create.bind(postController)
);

// 포스트 수정
route.patch(
  "/:postId",
  upload.array("images", IMAGE_MAX_COUNT),
  postController.update.bind(postController)
);

// 포스트 삭제
route.delete("/:postId", postController.delete.bind(postController));

// 카테고리 추가
route.post("/:postId/categories", postController.addCategory.bind(postController));

// 카테고리 제외
route.delete("/:postId/categories", postController.excludeCategory.bind(postController));

// 쿼리로 포스트 검색
route.post("/search", postController.getPostListByQuery.bind(postController));

export default route;
