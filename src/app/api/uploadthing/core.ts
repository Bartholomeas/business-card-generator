import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const f = createUploadthing();
export const utapi = new UTApi();

const middleware = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) throw new Error("Nieautoryzowany użytkownik.");

  return { userId: session.user.id, email: session.user.email };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "SUCCESS",
        },
      });
      console.log({ createdFile });
      return JSON.stringify(createdFile);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
