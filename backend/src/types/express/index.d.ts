import { IUserWithId } from "@src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUserWithId; // user 속성 추가
    }
  }
}
