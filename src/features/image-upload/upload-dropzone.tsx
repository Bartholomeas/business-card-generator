"use client";

import { useState } from "react";
import Dropzone from "react-dropzone";

import { api } from "~/trpc/react";

import { DEFAULT_ERROR, cn, useUploadThing } from "~/misc";

import { Progress } from "~/components/common/progress";
import { useToast } from "~/components/common/toast/use-toast";

import { Cloud, File } from "lucide-react";

interface Props {
  styleProps?: {
    square?: boolean;
    circle?: boolean;
    className?: string;
  };
}

export const UploadDropzone = ({ styleProps }: Props) => {
  const { square, circle, className } = styleProps ?? {};
  const { toast } = useToast();

  // const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const { startUpload } = useUploadThing("imageUploader");

  // const convertMutation = api.file.convertPhotoToWebp.useMutation({
  //   onSuccess: () => {
  //     console.log("converting WORKS! :)");
  //   },
  // });

  const { mutate: startPolling } = api.file.getFile.useMutation({
    onSuccess: () => {
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

  const startSimulatedProgress = () => {
    setUploadingProgress(0);

    const interval = setInterval(() => {
      setUploadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles: File[]) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        // setFiles((prev) => [
        //   ...prev,
        //   ...acceptedFiles.map((file) =>
        //     Object.assign(file, { preview: URL.createObjectURL(file) }),
        //   ),
        // ]);

        // const test = await sharp(acceptedFiles[0]?.name)
        //   .toFormat("webp")
        //   .webp({ quality: 75 })
        //   .resize(150, 150)
        //   .toFile("test.webp");

        console.log(acceptedFiles);

        const res = await startUpload(acceptedFiles);

        // await convertMutation
        //   .mutateAsync({
        //     img: acceptedFiles[0]!,
        //   })
        //   .then((data) => {
        //     console.log(data);
        //   });

        if (!res) {
          return toast({
            ...DEFAULT_ERROR,
            variant: "destructive",
          });
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;

        if (!key) {
          return toast({
            ...DEFAULT_ERROR,
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadingProgress(100);
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className={cn(
            "w-64 rounded-sm border border-gray-600 bg-zinc-900/50",
            {
              "aspect-square h-64": square,
            },
            { "aspect-square h-64 rounded-full": circle },
            className,
          )}
        >
          <div
            className={cn(
              "flex h-full w-full items-center justify-center overflow-hidden rounded-full",
              {
                "aspect-square h-64": square,
              },
              { "aspect-square h-64 rounded-full": circle },
            )}
          >
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg  hover:bg-gray-900"
            >
              {/* <Image
                src={files[0]?.preview || ""}
                alt="Podgląd zdjęcia"
                width={50}
                height={50}
              /> */}
              {/* <Cloud /> */}
              <div className="flex flex-col items-center justify-center gap-4 pb-6 pt-5">
                <Cloud size={32} />
                <p className="mb-2 text-center text-sm text-textSecondary">
                  <span className="font-semibold">Naciśnij aby wybrać zdjęcie</span>
                  lub przeciągnij i upuść
                </p>
                <p className="text-sm font-bold">Maksymalnie 2MB</p>
              </div>
              {acceptedFiles?.[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File />
                  </div>
                  <p className="truncate">{acceptedFiles[0].name}</p>
                </div>
              ) : null}

              {isUploading ? <Progress value={uploadingProgress} className="h-1 w-full" /> : null}

              <input type="file" id="dropzone-file" className="hidden" {...getInputProps()} />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
