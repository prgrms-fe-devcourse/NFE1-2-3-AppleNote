import { IFileStorage } from "@src/config";
import { Images } from "@src/types";
import { validators } from "@src/utils/validators";

export interface IFileService {
  uploadImageList(files: Images): Promise<string[]>;
}

export class FileService implements IFileService {
  constructor(private storage: IFileStorage) {}

  async uploadImageList(data: Images): Promise<string[]> {
    const files = validators.isArray(data) ? data : Object.values(data).flat();

    if (files.length > 0) {
      const uploadPromises = files.map((file) => this.storage.uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);

      return uploadedFiles.map((result) => result.url);
    }

    return [];
  }
}
