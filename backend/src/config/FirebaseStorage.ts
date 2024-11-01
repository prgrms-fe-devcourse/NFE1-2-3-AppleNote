import { randomUUID } from "crypto";
import { IFileStorage } from ".";
import { bucket } from "./firebaseConfig";

export class FirebaseStorage implements IFileStorage {
  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const blob = bucket.file(`${Date.now()}_${randomUUID()}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on("error", (error) => reject(error));
      blobStream.on("finish", async () => {
        try {
          await blob.makePublic();

          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          resolve({ url: publicUrl });
        } catch (error) {
          reject(error);
        }
      });
      blobStream.end(file.buffer);
    });
  }
}
