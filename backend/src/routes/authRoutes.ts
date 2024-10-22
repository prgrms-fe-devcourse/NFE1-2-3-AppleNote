import express from "express";

import { UserController } from "@src/controller/userController";
import { UserService } from "@src/service/userService";

const route = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

route.post("/signup", userController.create.bind(userController));
route.post("/login", userController.login.bind(userController));

export default route;
