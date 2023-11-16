"use client";

import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Dropzone from "react-dropzone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ButtonsInPopover } from "~/components/common/special/buttons-in-popover";
import { Button } from "../../ui/button";

import { UploadImageModal } from "./upload-image-modal";

import { UploadDropzone } from "./upload-dropzone";
import { Edit, Trash2 } from "lucide-react";

const MAX_IMAGE_SIZE = 1024 * 1024 * 3;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;

  let displayUrl;
  if (files[0]) displayUrl = URL.createObjectURL(files[0]);

  return { files, displayUrl };
}

const imageUploadSchema = z.object({
  images: z
    .custom<FileList>((val) => val instanceof FileList, "Wymagane")
    .refine((files) => files.length > 0, `Wymagane`)
    // .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
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

export function ImageUploader() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(imageUploadSchema),
  });

  function submitCircleRegistration(value: unknown) {
    console.log({ value });
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <UploadImageModal
        open={modalIsOpen}
        onOpenChange={() => {
          setModalIsOpen((prev) => !prev);
        }}
      />

      {/* <UploadDropzone styleProps={{ circle: true }} /> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitCircleRegistration)}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative aspect-square h-48 w-48">
            <Avatar className="h-full w-full">
              <AvatarImage src={preview} />
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 right-2 whitespace-nowrap">
              <ButtonsInPopover
                buttons={[
                  {
                    text: "Aktualizuj zdjęcie",
                    icon: Edit,
                    isFile: true,
                    htmlFor: "circle_image",
                  },
                  {
                    text: "Usuń zdjęcie",
                    onClick: () => {
                      return "remove";
                    },
                    icon: Trash2,
                  },
                ]}
              >
                Edytuj
              </ButtonsInPopover>
            </div>
            <input
              type="file"
              id="circle_image"
              name="circle_image"
              className="hidden"
            />
          </div>
          {/* 
          <FormField
            control={form.control}
            name="circle_image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Twój awatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className=" w-full cursor-pointer"
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Zapisz zmiany</Button>
        </form>
      </Form>
    </>
  );
}
