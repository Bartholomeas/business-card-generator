"use client";

import { useCallback } from "react";
import { TRPCError } from "@trpc/server";
import { useToast } from "~/components/common";
import { api } from "~/providers/trpc-provider";
import { DEFAULT_ERROR } from "~/misc";
import { useUploadThing } from "~/utils";
import { dataUrlToFile } from "~/components/special/image-upload/upload-image.utils";

const handleError = (toast: ReturnType<typeof useToast>["toast"], description?: string) => {
  toast({
    ...DEFAULT_ERROR,
    description: description ?? DEFAULT_ERROR.description,
    variant: "destructive",
  });
};

/**
 * @description Hook that handles uploading image to server and updating user avatar by uploaded image
 */
export const useImageUpload = () => {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation({
    onSuccess: async () => {
      try {
        await utils.user.getAvatar.invalidate();
        toast({
          title: "Sukces!",
          description: "Pomyślnie zaktualizowano zdjęcie.",
        });
      } catch (err: unknown) {
        if (err instanceof TRPCError) throw err;
      }
    },

    onError: error => {
      console.log("ERROR IN updateUserAvatar MUTATION OK", { error });
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
    onUploadError: () => {
      handleError(toast);
    },
  });

  const handleUpload = useCallback(async (url: string) => {
    try {
      const file = await dataUrlToFile(url);
      const res = await startUpload(file);
      console.log({ url, file });

      if (!res) return handleError(toast);

      const key = res[0]?.key;
      if (!key) handleError(toast);
    } catch (err) {
      handleError(toast, JSON.stringify(err));
    }
  }, []);

  return { handleUpload, isLoading: isUploading };
};