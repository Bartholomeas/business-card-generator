import React, { useRef, useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Cropper, type ReactCropperElement } from "react-cropper";

import { api } from "~/trpc/react";
import { useUploadThing } from "~/misc/utils/uploadthing";
import { dataUrlToFile } from "./utils";

import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import "cropperjs/dist/cropper.css";
import "./upload-image.css";

interface Props extends DialogProps {
  preview: string | undefined;
}

export const UploadImageModal = ({ open, onOpenChange, preview }: Props) => {
  const { toast } = useToast();

  const utils = api.useUtils();

  const { startUpload, isUploading,  } = useUploadThing("imageUploader");

  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppedData, setCroppedData] = useState("#");

  const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation();
  const { mutate: startPolling, isLoading } = api.file.getFile.useMutation({
    onSuccess: async () => {
      onOpenChange && onOpenChange(false);

      await utils.user.getProfile.invalidate();
      return toast({
        title: "Sukces.",
        description: "Pomyślnie przesłano plik.",
      });
    },
    onError: () => {
      return toast({
        title: "Coś poszło nie tak.",
        description: "Spróbuj ponownie później.",
        variant: "destructive",
      });
    },
    retry: true,
    retryDelay: 500,
  });

  const onCrop = () => {
    const cropper = cropperRef?.current?.cropper.getCroppedCanvas().toDataURL();

    if (cropper) setCroppedData(cropper);
  };

  const handleUpload = async (url: string) => {
    try {
      const file = await dataUrlToFile(url);

      const res = await startUpload(file);

      if (!res)
        return toast({
          title: "Coś poszło nie tak.",
          description: "Spróbuj ponownie później.",
          variant: "destructive",
        });

      const [fileResponse] = res;

      const key = fileResponse?.key;

      if (!key)
        return toast({
          title: "Coś poszło nie tak.",
          description: "Spróbuj ponownie później.",
          variant: "destructive",
        });

      updateUserAvatar({ key });
      startPolling({ key });
    } catch (err) {
      return toast({
        title: "Coś poszło nie tak.",
        description: "Spróbuj ponownie później.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie profilowe</DialogTitle>
          <DialogDescription>
            Dostosuj obszar Twojego zdjęcia i zapisz zmiany.
          </DialogDescription>
        </DialogHeader>

        <DialogDescription>
          <Cropper
            ref={cropperRef}
            src={preview}
            aspectRatio={1 / 1}
            crop={onCrop}
            className="h-auto min-h-[200px] w-full object-contain"
          />
        </DialogDescription>

        <Separator />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange && onOpenChange(false);
            }}
          >
            Anuluj
          </Button>
          <Button
            isLoading={isUploading || isLoading}
            onClick={() => handleUpload(croppedData)}
            type="submit"
          >
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
