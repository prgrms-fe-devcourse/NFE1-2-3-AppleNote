import express from "express";

import { CategoryController } from "@src/controller/categoryController";
import { CategoryService } from "@src/service/categoryService";

const route = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

//categories

// 모든 카테고리 조회
route.get("/", categoryController.read.bind(categoryController));

// 카테고리 생성
route.post("/", categoryController.create.bind(categoryController));

// 특정 카테고리 ID로 포스트 리스트 조회
route.get("/:categoryId", categoryController.getPostListByCategory.bind(categoryController));

// 특정 카테고리 업데이트
route.put("/:categoryId", categoryController.update.bind(categoryController));

// 특정 카테고리 삭제
route.delete("/:categoryId", categoryController.delete.bind(categoryController));

export default route;
