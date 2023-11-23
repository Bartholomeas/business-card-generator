import { z } from "zod";
import { TRPCError } from "@trpc/server";
import sharp from "sharp";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { db } from "~/server/db";

export const fileRouter = createTRPCRouter({
  getFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: id,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  convertPhotoToWebp: publicProcedure
    .input(z.object({ img: z.unknown() }))
    .mutation(async ({ ctx, input }) => {
      if (!input?.img)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Brak pliku do konwersji.",
        });

      const img = input.img as File;

      const webpBuffer = await img.arrayBuffer();

      const file = await sharp(webpBuffer)
        .toFormat("webp")
        .webp({ quality: 75 })
        .resize(150, 150)
        .toFile("test.webp");

      // const webpBlob = new Blob([file], { type: "image/webp" });
      // const webpFile = new File([webpBlob], "nowyplik.webp", {
      //   type: "image/webp",
      // });

      return file;
    }),
});
// uploadAvatar: protectedProcedure
//     .input(userProfileSchema)
//     .mutation(async ({ ctx, input }) => {}),
