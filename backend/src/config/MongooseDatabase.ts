import mongoose from "mongoose";

import { IDatabase } from "./index";
import { validators } from "@src/utils/validators";

export class MongooseDatabase implements IDatabase {
  async connect(): Promise<void> {
    try {
      const mongooseInstance = await mongoose.connect(
        validators.getValidatedENV(process.env.DB_URI)
      );

      if (!mongooseInstance) {
        throw new Error("Could not connect");
      }
    } catch (error) {
      const errorInstance =
        error instanceof Error ? error.message : new Error("Internal server Error").message;

      throw new Error(`DB connection failed: ${errorInstance}`);
    }
  }

  async close(): Promise<void> {
    mongoose.connection.close();
  }
}
