"use client";

import { TRPCError } from "@trpc/server";

import { DEFAULT_ERROR } from "~/misc";
import { api } from "~/providers/trpc-provider";

import { useToast } from "~/components/common";
import { dataUrlToFile } from "~/components/special/image-upload/upload-image.utils";

const handleError = (toast: ReturnType<typeof useToast>["toast"], description?: string) => {
  toast({
    ...DEFAULT_ERROR,
    description: description ?? DEFAULT_ERROR.description,
    variant: "destructive",
  });
};

interface UseImageUploadProps {
  closeModal?: (param: boolean) => void;
}

/**
 * @description Hook that handles uploading image to server and updating user avatar by uploaded image
 */
export const useImageUpload = ({ closeModal }: UseImageUploadProps = {}) => {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation({
    onSuccess: async () => {
      try {
        await utils.user.getCurrentUserAvatar.invalidate();
        toast({
          title: "Sukces!",
          description: "Pomyślnie zaktualizowano zdjęcie.",
        });
        closeModal?.(true);
      } catch (err: unknown) {
        if (err instanceof TRPCError) throw err;
      }
    },
    onError: (error) => {
      handleError(toast, error.message);
    },
  });

  const { mutateAsync: mutateUploadFile, isLoading } = api.file.uploadFile.useMutation({
    onSuccess: (data) => {
      if (data?.key) {
        updateUserAvatar({ key: data.key });
      }
    },
    onError: (error) => {
      handleError(toast, error.message);
    },
  });

  const handleUpload = async (url: string) => {
    try {
      const [file] = await dataUrlToFile(url);
      const fileData = {
        name: file?.name,
        type: file?.type,
        size: file?.size,
        dataUrl: url
      };
      const savedFile = await mutateUploadFile(fileData);
      console.log("RIZZZ:", savedFile);
    } catch (err) {
      handleError(toast, err instanceof Error ? err.message : JSON.stringify(err));
    }
  };

  return { handleUpload, isLoading };
};
