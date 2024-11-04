import DefaultThumbnail from "@assets/images/default-thumbnail.jpg";

export const getThumbnailSrc = (images: string[] | undefined): string => {
  return images?.[0] || DefaultThumbnail;
};
