import { Request, Response } from "express";

import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { PostError } from "@src/utils/Error";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const { title, content, category } = req.body;
      const files = req.files;
      const post = await this.postService.createPost({
        header: req.headers["content-type"],
        user: req.user,
        data: { title, category, content, images: files },
      });

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      if (error instanceof PostError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
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

  // TODO: 사용자 유저의 포스트만 삭제 가능하도록 구현하기
  async delete(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      await this.postService.deletePost(postId);

      return res.status(200).json(createSuccessResponse(200, { isRemove: true }));
    } catch (error) {
      if (error instanceof PostError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
}
