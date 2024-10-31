import { IUserWithId } from "@src/models/userModel";
import { Types } from "mongoose";

export const validators = {
  isArray: (value: unknown): value is Array<unknown> => {
    return Array.isArray(value);
  },
  isObjectId: (id: string | undefined) => typeof id === "string" && Types.ObjectId.isValid(id),
  keys: <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
    const objKeys = Object.keys(obj) as K[];
    // 1. 대상 객체에 필요한 모든 키가 포함되어 있는지 확인
    const hasAllKeys = keys.every((key) => key in obj);
    // 2. 대상 객체에 잘못된 키가 포함되어 있는지 확인
    const hasInvalidKeys = objKeys.some((key) => !keys.includes(key));

    return hasAllKeys && !hasInvalidKeys;
  },
  checkContentType: (
    inputValue: string | undefined,
    expectedType: "multipart/form-data" | "application/json"
  ) => {
    return typeof inputValue === "string" && inputValue.startsWith(expectedType);
  },
  checkRequestUser: (user: IUserWithId | undefined): user is IUserWithId => {
    if (user && validators.isObjectId(user.userId)) {
      return true;
    }

    return false;
  },
  /**
   * 빈배열 혹은 undefined값을 필터링하여 값이 존재하는 속성만 구성해서 반환한다.
   *
   * @param target 대상 객체
   * @returns 존재하는 속상만 포함된 객체
   */
  cleanedValue: <T extends Record<string, unknown>>(target: T): Partial<T> => {
    return Object.entries(target).reduce<Record<string, unknown>>((acc, [key, value]) => {
      // 빈 배열은 항목에 포함시키지 않는다.
      if (validators.isArray(value) && value.length === 0) {
        return acc;
      }

      // value가 undefined가 아닐 경우만 추가
      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    }, {}) as Partial<T>;
  },
  getValidatedENV: (env: string | undefined) => {
    if (typeof env !== "string" || env.length <= 0) {
      throw new Error("Invalid env");
    }

    return env;
  },
  convertArray: <T>(value: T) => {
    if (validators.isArray(value)) {
      return value as T[];
    }

    return [value];
  },
};
