import { Request, Response } from "express";

import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { ServiceError } from "@src/utils/Error";
import { IPostService } from "@src/services/postService";
import { Logger } from "@src/utils/Logger";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const { title, content, temp, images: urls } = req.body;
      const files = req.files;

      const post = await this.postService.createPost({
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, temp, images: { files, urls } },
      });

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      Logger.log(error);
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
      Logger.error(error);
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
      const { title, content, images: urls, deleteImages } = req.body;
      const files = req.files;
      const post = await this.postService.updatePost({
        postId: req.params.postId,
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, images: { files, urls }, deleteImages },
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
      const categories = await this.postService.addCategoryToPost({
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

  async excludeCategory(req: Request, res: Response) {
    try {
      const categories = await this.postService.removeCategoryToPost({
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

  async getPostListByQuery(req: Request, res: Response) {
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

  async getPostListByTemp(req: Request, res: Response) {
    try {
      const postList = await this.postService.getTempPostList({ user: req.user });

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
}
