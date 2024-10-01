"use client";

import { TRPCError } from "@trpc/server";


import { DEFAULT_ERROR } from "~/misc";
import { api } from "~/providers/trpc-provider";
import { useUploadThing } from "~/utils";

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

    onError: error => {
      return error;
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,

    onClientUploadComplete: data => {
      const key = data?.[0]?.key;
      if (key) {
        updateUserAvatar({ key });
      }
    },
    onUploadError: () => handleError(toast),
  });

  const handleUpload = async (url: string) => {
    try {
      const file = await dataUrlToFile(url);

      const res = await startUpload(file);
      if (!res) return handleError(toast);

      const key = res[0]?.key;
      if (!key) handleError(toast);
    } catch (err) {
      handleError(toast, JSON.stringify(err));
    }
  };

  return { handleUpload, isLoading: isUploading };
};
