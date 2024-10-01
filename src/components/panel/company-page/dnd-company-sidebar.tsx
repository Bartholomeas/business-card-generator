"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { CompanyPageSectionTypes } from "~/server/api/routers/company";

import { Card, Heading, Separator } from "~/components/common";
import { Form, SwitchControlled } from "~/components/form";

import { cn } from "~/utils";

const PAGE_SECTIONS: { label: string; name: CompanyPageSectionTypes; description?: string }[] = [
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

const toggleSectionsSchema = z.object({
	faqSection: z.boolean(),
	commentsSection: z.boolean(),
	opinionsSection: z.boolean(),
});

interface DndCompanySidebarProps {
	className?: string;
}

const DndCompanySidebar = ({ className }: DndCompanySidebarProps) => {
	const methods = useForm({ resolver: zodResolver(toggleSectionsSchema) });

	return (
		<Card className={cn("flex w-full flex-col p-4", className)}>
			<Heading type={"h4"}>Widoczność sekcji</Heading>
			<Separator className={"my-4"} />
			<Form {...methods}>
				<form className={"mt-0 flex flex-col gap-4"}>
					{PAGE_SECTIONS.map(({ label, name, description }) => (
						<Card key={`${name}-${label}`} className={"p-2"}>
							<SwitchControlled name={name} label={label} description={description} />
						</Card>
					))}
				</form>
			</Form>
			{/*<Switch />*/}
		</Card>
	);
};
export { DndCompanySidebar };
