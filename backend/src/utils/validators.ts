import { Types } from "mongoose";

export const validators = {
  isObjectId: (id: string) => Types.ObjectId.isValid(id),
};
