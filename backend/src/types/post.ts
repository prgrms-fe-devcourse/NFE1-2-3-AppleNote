import { CategoryType } from "./category";

export interface PostType {
  title: string;
  content: string;
  images: string[];
  categories?: CategoryType[];
}

export type FormDataPost = Omit<PostType, "images"> & {
  images:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[];
};
