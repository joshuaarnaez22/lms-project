import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authHandler = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),

  courseAttachment: f(["image", "audio", "video", "pdf", "text"])
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),

  chapterVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
