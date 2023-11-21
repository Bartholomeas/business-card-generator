"use client";

import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/trpc/react";
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
  const { data: user } = api.user.getMe.useQuery();

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(imageUploadSchema),
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreview(getImageData(event.target.files?.[0])?.displayUrl);
    setModalIsOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(submitCircleRegistration)}
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
              <AvatarImage
                src={user?.avatarUrl ?? "Awatar"}
                alt="Awatar użytkownika"
                className="object-contain"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <div className="absolute -bottom-2 right-2 whitespace-nowrap">
              <ButtonsInPopover
                onFileChange={handleFileChange}
                buttons={[
                  {
                    text: "Aktualizuj zdjęcie",
                    icon: Edit,
                    uploadFile: true,
                  },
                  {
                    text: "Usuń zdjęcie",
                    onClick: () => {
                      setPreview(undefined);
                    },
                    icon: Trash2,
                  },
                ]}
              >
                Edytuj
              </ButtonsInPopover>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
