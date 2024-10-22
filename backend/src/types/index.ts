import { Request, Response } from "express";

export type UserSchemaType = {
  name: string;
  address: string;
  email: string;
  description: string;
  isCompleted?: boolean;
};

export interface IController {
  create(req: Request, res: Response): Promise<void>;
  read(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
