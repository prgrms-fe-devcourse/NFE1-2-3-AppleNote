import { Request, Response } from "express";

import { PostSchemaType } from "@src/models/postModel";
import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { PostError } from "@src/utils/Error";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const postData: PostSchemaType = req.body;
      const post = await this.postService.createPost(postData);

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      if (error instanceof PostError) {
        return res.status(422).json(createErrorResponse(422, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async read(_req: Request, res: Response) {
    try {
      const posts = await this.postService.getPosts();

      return res.status(200).json(createSuccessResponse(200, posts));
    } catch {
      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async update(_req: Request, res: Response) {
    return res.status(200).json(createSuccessResponse(200, { good: true }));
  }

  async delete(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      await this.postService.deletePost(postId);

      return res.status(200).json(createSuccessResponse(200, { isRemove: true }));
    } catch (error) {
      if (error instanceof PostError) {
        return res.status(404).json(createErrorResponse(404, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
}
