import { handlers as usersHandlers } from "./users";
import { handlers as authHandlers } from "./auth";
import { handlers as postsHandlers } from "./posts";
import { handlers as categoriesHandlers } from "./categories";

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...postsHandlers,
  ...categoriesHandlers,
];
