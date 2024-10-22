/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";

import { PostSchemaType } from "@src/models/postModel";
import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";

// TODO: 500 에러 간소화
export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const postData: PostSchemaType = req.body;
      const post = await this.postService.createPost(postData);

      res.status(201).json({
        statusCode: 201,
        payload: post,
      });
    } catch {
      res.status(500).json({
        error: {
          statusCode: 500,
          message: "Internal server error",
        },
      });
    }
  }

  async read(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getPosts();

      res.status(200).json({
        statusCode: 201,
        payload: posts,
      });
    } catch {
      res.status(500).json({
        error: {
          statusCode: 500,
          message: "Internal server error",
        },
      });
    }
  }

  async update(_req: Request, _res: Response): Promise<void> {}

  async delete(_req: Request, _res: Response): Promise<void> {}
}
