"use client";

import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { imageUploadSchema } from "~/server/api/routers/file/fileSchemas";

import { Form } from "~/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ButtonsInPopover } from "~/components/common/special/buttons-in-popover";

import { UploadImageModal } from "./upload-image-modal";

import { Edit, Trash2 } from "lucide-react";

function getImageData(file: File | undefined) {
  if (!file) return;

  let displayUrl;
  if (file) displayUrl = URL.createObjectURL(file);

  return { file, displayUrl };
}

export function ImageUploader() {
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(imageUploadSchema),
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);
  // const [fileInputValue, setFileInputValue] = useState<File | undefined>(
  //   undefined,
  // );

  function submitCircleRegistration(value: unknown) {
    console.log({ value });
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setFileInputValue(event.target.files?.[0]);
    setPreview(getImageData(event.target.files?.[0])?.displayUrl);
    setModalIsOpen(true);
    return;
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitCircleRegistration)}
          className="flex flex-col items-center gap-4"
        >
          <UploadImageModal
            preview={preview}
            open={modalIsOpen}
            onOpenChange={() => {
              setModalIsOpen((prev) => !prev);
            }}
          />
          <div className="relative aspect-square h-48 w-48">
            <Avatar className="h-full w-full">
              <AvatarImage src={preview} alt="Awatar użytkownika" />
              <AvatarFallback>Awatar</AvatarFallback>
            </Avatar>

            <div className="absolute -bottom-2 right-2 whitespace-nowrap">
              <ButtonsInPopover
                onFileChange={handleFileChange}
                buttons={[
                  {
                    text: "Aktualizuj zdjęcie",
                    icon: Edit,
                    onClick: () => {
                      return;
                    },
                    uploadFile: true,
                  },
                  {
                    text: "Usuń zdjęcie",
                    onClick: () => {
                      setPreview(undefined);
                      // setFileInputValue(undefined);
                    },
                    icon: Trash2,
                  },
                ]}
              >
                Edytuj
              </ButtonsInPopover>
            </div>
            {/* <input
              type="file"
              id="circle_image"
              name="circle_image"
              className="hidden"
            /> */}
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
          {/* <Button type="submit">Zapisz zmiany</Button> */}
        </form>
      </Form>
    </>
  );
}
