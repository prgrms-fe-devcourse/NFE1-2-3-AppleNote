import { IUserWithId } from "@src/models/userModel";

export {};
declare global {
  namespace Express {
    export interface Request {
      user?: IUserWithId;
    }
  }
}
