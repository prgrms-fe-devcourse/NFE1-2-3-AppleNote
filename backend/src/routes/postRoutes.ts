import express from "express";

import { FirebaseStorage } from "@src/config/FirebaseStorage";
import { PostController } from "@src/controllers/postController";
import { uploadImages } from "@src/middleware";
import { MongoPostRepository } from "@src/repositories/postRepository";
import { FileService } from "@src/services/fileService";
import { PostService } from "@src/services/postService";

const route = express.Router();

const firebaseStorage = new FirebaseStorage();
const fileService = new FileService(firebaseStorage);
const mongoPostRepository = new MongoPostRepository();
const postService = new PostService(fileService, mongoPostRepository);
const postController = new PostController(postService);

//posts

// 임시 포스트 리스트 조회
route.get("/temp", postController.getPostListByTemp.bind(postController));

// 포스트 ID로 상세 조회
route.get("/:postId", postController.getPostDetail.bind(postController));

// 포스트 리스트 조회
route.get("/", postController.read.bind(postController));

// 포스트 생성
route.post("/", uploadImages, postController.create.bind(postController));

// 포스트 수정
route.patch("/:postId", uploadImages, postController.update.bind(postController));

// 포스트 삭제
route.delete("/:postId", postController.delete.bind(postController));

// 카테고리 추가
route.post("/:postId/categories", postController.addCategory.bind(postController));

// 카테고리 제외
route.delete("/:postId/categories", postController.excludeCategory.bind(postController));

// 쿼리로 포스트 검색
route.post("/search", postController.getPostListByQuery.bind(postController));

export default route;
