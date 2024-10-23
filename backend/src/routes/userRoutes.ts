import express from "express";

import { UserController } from "@src/controller/userController";
import { UserService } from "@src/service/userService";

const route = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

//user
route.get("/", userController.read.bind(userController));
route.get("/me", userController.readMine.bind(userController));
route.patch("/password", userController.update.bind(userController));
route.delete("/me", userController.delete.bind(userController));

export default route;
