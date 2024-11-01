import express from "express";

import { UserController } from "@src/controllers/userController";
import { UserService } from "@src/services/userService";

const route = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

route.post("/signup", userController.create.bind(userController));
route.post("/login", userController.login.bind(userController));
route.post("/email", userController.check.bind(userController));

export default route;
