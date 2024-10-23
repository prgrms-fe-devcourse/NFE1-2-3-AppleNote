import { Request, Response } from "express";

export type UserSchemaType = {
  name: string;
  password: string;
  description: string;
  email: string;
  bannerImage?: string;
  profileImage?: string;
};

export interface IController {
  create(req: Request, res: Response): Promise<void>;
  read(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
