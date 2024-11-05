import express from "express";

import { UserController } from "@src/controllers/userController";
import { UserService } from "@src/services/userService";
import { FirebaseStorage } from "@src/config/FirebaseStorage";
import { FileService } from "@src/services/fileService";

const route = express.Router();

const firebaseStorage = new FirebaseStorage();
const fileService = new FileService(firebaseStorage);
const userService = new UserService(fileService);
const userController = new UserController(userService);

route.post("/signup", userController.create.bind(userController));
route.post("/login", userController.login.bind(userController));
route.post("/email", userController.check.bind(userController));

export default route;
