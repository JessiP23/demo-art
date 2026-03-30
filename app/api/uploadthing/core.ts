import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  roomImageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({ url: file.url })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
