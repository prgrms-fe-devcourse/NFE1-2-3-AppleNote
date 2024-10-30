import { Request, Response } from "express";

import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { ServiceError } from "@src/utils/Error";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const files = req.files;
      const post = await this.postService.createPost({
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, images: files },
      });

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async read(req: Request, res: Response) {
    try {
      const postList = await this.postService.getPostList({ user: req.user });

      return res.status(200).json(createSuccessResponse(200, postList));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const files = req.files;
      const post = await this.postService.updatePost({
        postId: req.params.postId,
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, images: files },
      });

      return res.status(200).json(createSuccessResponse(200, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.postService.deletePost({
        postId: req.params.postId,
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, { isRemove: true }));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async addCategory(req: Request, res: Response) {
    try {
      const categories = await this.postService.addPostFromCategory({
        postId: req.params.postId,
        data: { categories: req.body.categories },
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, categories));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async removeCategory(req: Request, res: Response) {
    try {
      const categories = await this.postService.deletePostFromCategory({
        postId: req.params.postId,
        data: { categories: req.body.categories },
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, categories));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async getPostDetail(req: Request, res: Response) {
    try {
      const post = await this.postService.getPost({
        postId: req.params.postId,
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async searchPost(req: Request, res: Response) {
    try {
      const post = await this.postService.searchPostList({
        data: { query: req.body.query },
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
}
