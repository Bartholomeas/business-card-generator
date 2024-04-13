import React, { useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
// import { Cropper, type ReactCropperElement } from "react-cropper";
import { Cropper, type CropperRef } from "react-advanced-cropper";

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
import { useImageUpload } from "~/components/special/image-upload/use-image-upload";

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
  // const utils = api.useUtils();
  //
  // const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation({
  //   onSuccess: async () => {
  //     await utils.user.getAvatar.invalidate();
  //   },
  // });
  // const { mutate: startPolling, isLoading } = api.file.getFile.useMutation({
  //   onSuccess: async () => {
  //     onOpenChange?.(false);
  //
  //     await utils.user.getProfile.invalidate();
  //     return toast({
  //       title: "Sukces.",
  //       description: "Pomyślnie przesłano plik.",
  //     });
  //   },
  //
  //   onError: () => {
  //     return toast({
  //       ...DEFAULT_ERROR,
  //       variant: "destructive",
  //     });
  //   },
  //   retry: 2,
  //   retryDelay: 500,
  // });
  //
  // const { startUpload, isUploading } = useUploadThing("imageUploader", {
  //   skipPolling: true,
  //   onClientUploadComplete: data => {
  //     const [{ key } = { key: undefined }] = data ?? {};
  //     console.log("uploaded successfully!", key);
  //     if (key) {
  //       console.log("Succes INSIDE IF, key exist!", key);
  //       startPolling({ key });
  //       updateUserAvatar({ key });
  //     }
  //   },
  //   onUploadError: () => {
  //     console.log("error occurred while uploading");
  //   },
  // });

  const { handleUpload, isLoading } = useImageUpload();
  const [croppedData, setCroppedData] = useState("#");

  const onChange = (cropper: CropperRef) => {
    const cropped = cropper.getCanvas()?.toDataURL();

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
          <Button isLoading={isLoading} onClick={() => handleUpload(croppedData)} type="submit">
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};