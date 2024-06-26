import React, { useRef } from "react";
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
  const { handleUpload, isLoading } = useImageUpload({
    closeModal: onOpenChange,
  });
  // const [croppedData, setCroppedData] = useState("#");
  const croppedData = useRef("#");
  const onChange = (cropper: CropperRef) => {
    const cropped = cropper.getCanvas()?.toDataURL();

    if (cropped) croppedData.current = cropped;
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
            isLoading={isLoading}
            onClick={() => handleUpload(croppedData.current)}
            type="submit"
          >
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};