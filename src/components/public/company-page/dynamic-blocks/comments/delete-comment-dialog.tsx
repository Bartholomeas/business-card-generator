"use client";

import { api } from "~/providers/trpc-provider";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  useToast,
} from "~/components/common";
import { handleErrorToast } from "~/utils/errors/handleErrorToast";
import { XIcon } from "lucide-react";

interface DeleteCommentDialogProps {
  commentId: string;
}

export const DeleteCommentDialog = ({ commentId }: DeleteCommentDialogProps) => {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: deleteComment, isLoading } = api.company.deleteCompanyComment.useMutation({
    onSuccess: async () => {
      try {
        await utils.company.getCommentsSection.invalidate();

        toast({
          title: "Sukces",
          description: "Pomyślnie usunięto komentarz",
        });
      } finally {
      }
    },
    onError: err => {
      handleErrorToast({ description: err.message });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={"absolute right-0"}
          aria-label={"Usuń komentarz"}
        >
          <XIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Czy napewno chcesz usunąć ten komentarz?</DialogTitle>
        </DialogHeader>
        <Separator className={"my-3"} />
        <DialogFooter>
          <div className={"flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end"}>
            <DialogClose asChild>
              <Button variant={"outline"}>Anuluj</Button>
            </DialogClose>

            <Button
              type={"button"}
              isLoading={isLoading}
              onClick={() => deleteComment({ commentId })}
              aria-label={"Usuń komentarz"}
            >
              Usuń komentarz
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
