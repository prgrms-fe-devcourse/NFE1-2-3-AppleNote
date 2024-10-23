export class PostError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostError";
  }
}
