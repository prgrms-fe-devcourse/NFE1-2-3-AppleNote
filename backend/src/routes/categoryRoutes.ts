import { CategoryController } from "@src/controller/categoryController";
import { CategoryService } from "@src/service/categoryService";
import express from "express";

const route = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

//categories
route.post("/", categoryController.create.bind(categoryController));

export default route;
