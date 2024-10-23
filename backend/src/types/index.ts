import { Request, Response } from "express";

// TODO: 다른곳에 위치하기
export type UserSchemaType = {
  name: string;
  password: string;
  address: string;
  description: string;
  email: string;
  isCompleted?: boolean;
  bannerImage?: string;
  profileImage?: string;
};

type ControllerResponse = Promise<Response<unknown, Record<string, unknown>> | undefined>;

export interface IController {
  create(req: Request, res: Response): ControllerResponse;
  read(req: Request, res: Response): ControllerResponse;
  update(req: Request, res: Response): ControllerResponse;
  delete(req: Request, res: Response): ControllerResponse;
}
