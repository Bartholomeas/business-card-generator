import { type z } from "zod";

import { type FontFamilyCodesSchema } from "~/components/panel/card-wizard/edit-styles/helpers/edit-styles.schemas";

export type FontFamilyCodes = z.infer<typeof FontFamilyCodesSchema>;
