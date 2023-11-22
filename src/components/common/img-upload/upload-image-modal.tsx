import React, { useRef, useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Cropper, type ReactCropperElement } from "react-cropper";

import { useUploadThing } from "~/misc/utils/uploadthing";

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
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface Props extends DialogProps {
  preview: string | undefined;
}

export const UploadImageModal = ({ open, onOpenChange, preview }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const { startUpload } = useUploadThing("imageUploader");

  const { toast } = useToast();
  const [croppedData, setCroppedData] = useState<string | undefined>(undefined);

  const { mutate: startPolling } = api.file.getFile.useMutation({
    onSuccess: () => {
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
    const cropper = cropperRef?.current?.cropper;

    setCroppedData(cropper?.getCroppedCanvas().toDataURL());
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
            src={preview ?? ""}
            aspectRatio={1 / 1}
            crop={onCrop}
            className="h-auto min-h-[200px] w-full object-contain"
          />
        </DialogDescription>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
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
          <Button type="submit">Zapisz zmiany</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
