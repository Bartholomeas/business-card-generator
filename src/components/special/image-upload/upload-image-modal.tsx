import React, { useRef, useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Cropper, type ReactCropperElement } from "react-cropper";

import { useUploadThing } from "~/utils";
import { dataUrlToFile } from "./upload-image.utils";
import { DEFAULT_ERROR } from "~/misc";
import { api } from "~/providers/trpc-provider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Separator,
  useToast,
} from "~/components/common";

import "cropperjs/dist/cropper";
import "./upload-image.css";

interface Props extends DialogProps {
  preview: string | undefined;
}

export const UploadImageModal = ({ open, onOpenChange, preview }: Props) => {
  const { toast } = useToast();

  const utils = api.useUtils();

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppedData, setCroppedData] = useState("#");

  const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation();
  const { mutate: startPolling, isLoading } = api.file.getFile.useMutation({
    onSuccess: async () => {
      onOpenChange?.(false);

      await utils.user.getProfile.invalidate();
      return toast({
        title: "Sukces.",
        description: "Pomyślnie przesłano plik.",
      });
    },

    onError: () => {
      return toast({
        ...DEFAULT_ERROR,
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
          ...DEFAULT_ERROR,
          variant: "destructive",
        });

      const [fileResponse] = res;

      const key = fileResponse?.key;

      if (!key)
        return toast({
          ...DEFAULT_ERROR,
          variant: "destructive",
        });

      updateUserAvatar({ key });
      startPolling({ key });
    } catch (err) {
      return toast({
        ...DEFAULT_ERROR,
        variant: "destructive",
      });
    }
  };

  const closeDialog = () => onOpenChange?.(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie profilowe</DialogTitle>
          <DialogDescription>Dostosuj obszar Twojego zdjęcia i zapisz zmiany.</DialogDescription>
        </DialogHeader>

        <DialogDescription>
          <Cropper
            ref={cropperRef}
            src={preview}
            aspectRatio={1}
            crop={onCrop}
            className="h-auto min-h-[200px] w-full object-contain"
          />
        </DialogDescription>

        <Separator />
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
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
