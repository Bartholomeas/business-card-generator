"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type CompanyPageSectionTypes } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/providers/trpc-provider";
import { cn } from "~/utils";

import { Button, Card, Heading, Separator } from "~/components/common";
import { Form, SwitchControlled } from "~/components/form";


const PAGE_SECTIONS: { label: string; name: CompanyPageSectionTypes; description?: string; }[] = [
  {
    label: "Sekcja FAQ",
    name: "faqSection",
    description: "Sekcja z najczęstszymi pytaniami otrzymywanymi od użytkowników.",
  },
  {
    label: "Komentarze",
    name: "commentsSection",
    description: "Komentarze, które mogą być dodane przez zalogowanych użytkowników.",
  },
  {
    label: "Opinie użytkowników",
    name: "opinionsSection",
    description: "Opinie użytkowników wraz z oceną i komentarzem.",
  },
];


export const toggleSectionsSchema = z.object({
  faqSection: z.boolean().default(false),
  commentsSection: z.boolean().default(false),
  opinionsSection: z.boolean().default(false),
});

interface DndCompanySidebarProps {
  className?: string;
  companySlug: string;
  sections: Record<CompanyPageSectionTypes, boolean>;
}

const DndCompanySidebar = ({ className, companySlug, sections }: DndCompanySidebarProps) => {
  const methods = useForm<z.infer<typeof toggleSectionsSchema>>({
    resolver: zodResolver(toggleSectionsSchema),
    defaultValues: sections,
  });

  const utils = api.useUtils();

  const { mutate, isLoading } = api.company.setCompanyPageSectionVisibility.useMutation({
    onSuccess: async () => {
      await utils.company.getCompanyPageSectionsVisibility.invalidate();
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate({ ...data, companySlug });
  });

  return (
    <Card className={cn("flex w-full flex-col p-4", className)}>
      <Heading type={"h4"} size={'h5'}>Widoczność sekcji</Heading>
      <Separator className={"my-4"} />
      <Form
        {...methods}
      >
        <form
          className={"mt-0 flex flex-col gap-4"}
          onSubmit={onSubmit}
        >
          {PAGE_SECTIONS.map(({ label, name, description }) => (
            <Card key={`${name}-${label}`} className={"p-2"}>
              <SwitchControlled name={name} label={label} description={description} />
            </Card>
          ))}
          <Button
            isLoading={isLoading}
            type={"submit"}>
            Zapisz
          </Button>
        </form>
      </Form>
    </Card>
  );
};
export { DndCompanySidebar };
