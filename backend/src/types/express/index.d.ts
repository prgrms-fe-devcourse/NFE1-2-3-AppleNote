import { UserSchemaType } from "../index";

declare global {
  namespace Express {
    interface Request {
      user?: UserSchemaType;
    }
  }
}
