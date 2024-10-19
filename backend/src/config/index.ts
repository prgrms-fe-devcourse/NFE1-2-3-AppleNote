import mongoose from "mongoose";

import { Logger } from "@src/utils/Logger";

// DB 연결을 추상화
export interface IDatabase {
  connect(): Promise<void>;
}

// 데이터베이스 연결 함수
export const connectDatabase = async (db: IDatabase) => {
  try {
    await db.connect();
    Logger.success("Database connection successful");
  } catch (error) {
    Logger.error(error);
    mongoose.connection.close();
  }
};
