import { PostController } from "@src/controller/postController";
import { PostService } from "@src/service/postService";
import express from "express";

const route = express.Router();
const postService = new PostService();
const postController = new PostController(postService);

//posts
route.get("/", postController.read.bind(postController));
route.post("/", postController.create.bind(postController));

export default route;
