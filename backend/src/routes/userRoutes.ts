import express from "express";

import { UserController } from "@src/controller/userController";
import { UserService } from "@src/service/userService";

const route = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

//user
route.get("/", userController.read.bind(userController));
route.post("/", userController.create.bind(userController));
route.put("/:id", userController.update.bind(userController));
route.delete("/:id", userController.delete.bind(userController));

export default route;
