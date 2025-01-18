export interface BusinessCard {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	generalStyles: Record<string, unknown>;
	defaultTextElements: Array<{
		id: string;
		content: string;
		styles: Record<string, unknown>;
	}>;
	back: {
		id: string;
		styles: Record<string, unknown>;
		textElements: Array<{
			id: string;
			content: string;
			styles: Record<string, unknown>;
		}>;
	};
	front: {
		id: string;
		styles: Record<string, unknown>;
		textElements: Array<{
			id: string;
			content: string;
			styles: Record<string, unknown>;
		}>;
	};
	qrLink: string;
	companyId: string | null;
	company?: {
		id: string;
		companyName: string;
	};
}

export type BusinessCardThemeCodes = "templateDefault" | "templateFutura" | "templateRedDot";
