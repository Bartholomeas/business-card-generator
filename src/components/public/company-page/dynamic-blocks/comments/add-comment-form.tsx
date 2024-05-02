"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/providers/trpc-provider";
import { handleErrorToast } from "~/utils/errors/handleErrorToast";

import { Form, InputTextarea } from "~/components/form";
import { Button, useToast } from "~/components/common";

const addCommentSchema = z.object({
  content: z
    .string({ required_error: "To pole jest wymagane" })
    .min(2, "Komentarz musi posiadać conajmniej 2 znaki.")
    .max(500, "Komentarz musi mieć maksymalnie 500 znaków."),
  commentsSectionId: z.string().optional(),
});

type AddCommentFields = z.infer<typeof addCommentSchema>;

interface AddCommentFormProps {
  commentsSectionId: string | undefined;
}

export const AddCommentForm = ({ commentsSectionId }: AddCommentFormProps) => {
  const methods = useForm({
    defaultValues: { content: "", commentsSectionId },
    resolver: zodResolver(addCommentSchema),
  });

  const utils = api.useUtils();
  const { toast } = useToast();
  const { mutate: addComment, isLoading } = api.company.addCompanyComment.useMutation({
    onSuccess: async () => {
      try {
        await utils.company.getCommentsSection.invalidate();

        toast({
          title: "Sukces",
          description: "Pomyślnie dodano komentarz",
        });
      } finally {
        methods.reset();
      }
    },
    onError: err => {
      handleErrorToast({ description: err.message });
    },
  });

  const onSubmit = (fields: AddCommentFields) => {
    if (fields) addComment(fields);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
        <InputTextarea
          name={"content"}
          label={"Dodaj komentarz"}
          placeholder={"Wpisz swój komentarz.."}
          labelSrOnly
          maxLength={500}
          rows={5}
        />
        <Button className={"self-end"} size={"sm"} isLoading={isLoading}>
          Dodaj komentarz
        </Button>
      </form>
    </Form>
  );
};