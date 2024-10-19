import mongoose from "mongoose";

import { IDatabase } from "./index";

// Mongoose DB 연결 클래스
export class MongooseDatabase implements IDatabase {
  private getValidatedURL(): string {
    const URI = process.env.DB_URI;

    if (typeof URI !== "string" || URI.length <= 0) {
      throw new Error("Invalid DB URI");
    }

    return URI;
  }

  async connect(): Promise<void> {
    try {
      const mongooseInstance = await mongoose.connect(this.getValidatedURL());

      if (!mongooseInstance) {
        throw new Error("Could not connect");
      }
    } catch (error) {
      const errorInstance =
        error instanceof Error ? error.message : new Error("Internal server Error").message;

      throw new Error(`DB connection failed: ${errorInstance}`);
    }
  }
}
