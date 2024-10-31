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
route.get("/", postController.read.bind(postController));
route.post(
  "/",
  upload.array("images", IMAGE_MAX_COUNT),
  postController.create.bind(postController)
);
route.get("/:postId", postController.getPostDetail.bind(postController));
route.patch(
  "/:postId",
  upload.array("images", IMAGE_MAX_COUNT),
  postController.update.bind(postController)
);
route.delete("/:postId", postController.delete.bind(postController));
route.post("/:postId/categories", postController.addCategory.bind(postController));
route.delete("/:postId/categories", postController.excludeCategory.bind(postController));
route.post("/search", postController.getPostListByQuery.bind(postController));

export default route;
