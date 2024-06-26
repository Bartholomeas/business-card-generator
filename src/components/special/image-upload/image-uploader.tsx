"use client";

import { type ChangeEvent, useState } from "react";

import { api } from "~/providers/trpc-provider";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/common/avatar";
import { ButtonsInPopover } from "~/components/special/buttons-in-popover";
import { useToast } from "~/components/common/toast/use-toast";
import { UploadImageModal } from "./upload-image-modal";

import { Edit, Trash2, User } from "lucide-react";

function getImageData(file: File | undefined) {
  if (!file) return;

  let displayUrl;
  if (file) displayUrl = URL.createObjectURL(file);

  return { file, displayUrl };
}

export function ImageUploader() {
  const { data: avatar } = api.user.getCurrentUserAvatar.useQuery();

  const { toast } = useToast();
  const utils = api.useUtils();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreview(getImageData(event.target.files?.[0])?.displayUrl);
    setModalIsOpen(true);
  };

  const { mutate: mutateDeleteAvatar, isLoading } = api.user.deleteAvatar.useMutation({
    onSuccess: async () => {
      toast({
        title: "Sukces",
        description: "Pomyślnie usunięto Twój awatar.",
      });
      await utils.user.getCurrentUserAvatar.invalidate();
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie mogliśmy usunąć Twojego awatara.",
        variant: "destructive",
      });
    },
  });

  const deleteAvatar = async () => {
    setPreview(undefined);
    mutateDeleteAvatar();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <UploadImageModal
        preview={preview}
        open={modalIsOpen}
        onOpenChange={() => {
          setModalIsOpen(prev => !prev);
        }}
      />
      <div className="relative aspect-square size-48">
        <Avatar className="size-full">
          <AvatarImage
            src={avatar?.url ?? "/"}
            alt="Awatar użytkownika"
            className="object-contain"
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
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
                isLoading,
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick: deleteAvatar,
                icon: Trash2,
              },
            ]}
          >
            Edytuj
          </ButtonsInPopover>
        </div>
      </div>
    </div>
  );
}
