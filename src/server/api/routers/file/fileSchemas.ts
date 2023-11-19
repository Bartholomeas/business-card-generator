import { z } from "zod";

export const MAX_IMAGE_SIZE = 1024 * 1024 * 3;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const imageUploadSchema = z.object({
  images: z
    .custom<FileList>((val) => val instanceof FileList, "Wymagane")
    .refine((files) => files.length > 0, `Wymagane`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `Plik może mieć maksymalnie 5MB.`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Dozwolone pliki to: .jpg, .jpeg, .png, .webp",
    ),
});
