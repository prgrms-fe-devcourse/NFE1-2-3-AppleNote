/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";

import { PostSchemaType } from "@src/models/postModel";
import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const postData: PostSchemaType = req.body;
      const post = await this.postService.createPost(postData);

      res.status(201).json(createSuccessResponse(201, post));
    } catch {
      res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async read(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getPosts();

      res.status(200).json(createSuccessResponse(200, posts));
    } catch {
      res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async update(_req: Request, _res: Response): Promise<void> {}

  async delete(_req: Request, _res: Response): Promise<void> {}
}
