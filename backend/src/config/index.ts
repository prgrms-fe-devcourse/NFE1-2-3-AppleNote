import { Logger } from "@src/utils/Logger";

export interface IDatabase {
  connect(): Promise<void>;
  close(): Promise<void>;
}

export interface IFileStorage {
  uploadFile(file: Express.Multer.File): Promise<{ url: string }>;
}

// 데이터베이스 연결 함수
export const connectDatabase = async (db: IDatabase) => {
  try {
    await db.connect();
    Logger.success("Database connection successful");
  } catch (error) {
    Logger.error(error);
    db.close();
  }
};
