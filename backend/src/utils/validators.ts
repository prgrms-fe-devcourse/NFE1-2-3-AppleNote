import { Types } from "mongoose";

export const validators = {
  isObjectId: (id: string) => Types.ObjectId.isValid(id),
  keys: <T extends object, K extends keyof T>(obj: T, keys: K[]): boolean => {
    const objKeys = Object.keys(obj) as K[];

    // 1. 대상 객체에 필요한 모든 키가 포함되어 있는지 확인
    const hasAllKeys = keys.every((key) => key in obj);

    // 2. 대상 객체에 잘못된 키가 포함되어 있는지 확인
    const hasInvalidKeys = objKeys.some((key) => !keys.includes(key));

    return hasAllKeys && !hasInvalidKeys;
  },
};
