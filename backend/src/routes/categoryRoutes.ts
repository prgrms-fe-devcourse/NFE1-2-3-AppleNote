import express from "express";

import { CategoryController } from "@src/controller/categoryController";
import { CategoryService } from "@src/service/categoryService";

const route = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

//categories
route.get("/", categoryController.read.bind(categoryController));
route.post("/", categoryController.create.bind(categoryController));
route.get("/:categoryId", categoryController.getPostsByCategory.bind(categoryController));
route.put("/:categoryId", categoryController.update.bind(categoryController));
route.delete("/:categoryId", categoryController.delete.bind(categoryController));

export default route;
