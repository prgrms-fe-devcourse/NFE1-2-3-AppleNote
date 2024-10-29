import { ICategoryService } from "@src/service/categoryService";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { ServiceError } from "@src/utils/Error";
import { Request, Response } from "express";

export class CategoryController {
  constructor(private categoryService: ICategoryService) {}

  async create(req: Request, res: Response) {
    try {
      const category = await this.categoryService.createCategory({
        user: req.user,
        data: req.body,
      });

      return res.status(201).json(createSuccessResponse(201, category));
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
