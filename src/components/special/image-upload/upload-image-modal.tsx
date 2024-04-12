import React, { useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
// import { Cropper, type ReactCropperElement } from "react-cropper";
import { Cropper, type CropperRef } from "react-advanced-cropper";
import { useUploadThing } from "~/utils";
import { dataUrlToFile } from "./upload-image.utils";
import { DEFAULT_ERROR } from "~/misc";
import { api } from "~/providers/trpc-provider";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
  useToast,
} from "~/components/common";

import "react-advanced-cropper/dist/style.css";
import "./upload-image.css";

interface Props extends DialogProps {
  preview: string | undefined;
}

/**
 * @description Modal that handles uploading image to the server. It gives possibility to crop image.
 * @param open - Is Modal open
 * @param onOpenChange - What to do on change state of "open"
 * @param preview - Preview of uploaded image
 * @constructor
 */
export const UploadImageModal = ({ open, onOpenChange, preview }: Props) => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: () => {
      console.log("error occurred while uploading");
    },
    onUploadBegin: () => {
      console.log("upload has begun");
    },
  });

  const [croppedData, setCroppedData] = useState("#");

  const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation({
    onSuccess: async () => {
      await utils.user.getAvatar.invalidate();
    },
  });
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
    retry: 2,
    retryDelay: 500,
  });

  const handleUpload = async (url: string) => {
    console.time("handleUpload");
    try {
      const file = await dataUrlToFile(url);
      console.log({ url, file });

      const res = await startUpload(file);

      if (!res)
        return toast({
          ...DEFAULT_ERROR,
          variant: "destructive",
        });

      const [fileResponse] = res;
      const key = fileResponse?.key;
      console.log("file uplaoded", { fileResponse, res });
      if (!key)
        return toast({
          ...DEFAULT_ERROR,
          variant: "destructive",
        });

      updateUserAvatar({ key });
      startPolling({ key });
      console.timeEnd("handleUpload");
    } catch (err) {
      return toast({
        ...DEFAULT_ERROR,
        variant: "destructive",
      });
    }
  };

  const onChange = (cropper: CropperRef) => {
    const cropped = cropper.getCanvas()?.toDataURL();
    // console.log(cropped, cropper.getImage());

    if (cropped) setCroppedData(cropped);
  };

  const closeDialog = () => onOpenChange?.(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie profilowe</DialogTitle>
          <DialogDescription>Dostosuj obszar Twojego zdjęcia i zapisz zmiany.</DialogDescription>
        </DialogHeader>

        <DialogDescription className={"relative"}>
          <Cropper
            src={preview}
            onChange={onChange}
            stencilProps={{ aspectRatio: 1 }}
            className="cropper aspect-square h-[300px] min-h-[200px] w-full object-contain"
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