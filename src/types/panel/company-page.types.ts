import type { CompanyPageSectionTypes } from "~/server/api/routers/company";

export interface DndSection {
  id: string;
  code: CompanyPageSectionTypes;
}