import { Building2, CreditCardIcon, LayoutDashboard, Settings, Wand2 } from "lucide-react";

const panelRoutes = {
	panel: "/panel",
	settings: "/panel/ustawienia",
	userCards: "/panel/karty-uzytkownika",
	wizard: "/panel/kreator-kart",
	userCompanies: "/panel/firmy-uzytkownika",
	userCompany: (slug: string) => `/panel/firmy-uzytkownika/${slug}`,
};

const publicRoutes = {
	home: "/",
	login: "/zaloguj-sie",
	signUp: "/zarejestruj-sie",
	pricing: "/cennik",
	companiesList: "/lista-firm",
	companyPage: (slug: string | undefined) => `/firma/${slug}`,
};

const settingsLinks = {
	profile: `${panelRoutes.settings}`,
	account: `${panelRoutes.settings}/konto`,
	notifications: `${panelRoutes.settings}/powiadomienia`,
};

export const routes = {
	...publicRoutes,
	...panelRoutes,
	settingsTabs: settingsLinks,
};

export const navLinks = [
	{
		label: "Kreator kart",
		href: routes.home,
	},
	{
		label: "Cennik",
		href: routes.pricing,
	},
	{
		label: "Lista firm",
		href: routes.companiesList,
	},
];

export const sidebarLinks = [
	{
		id: "general-dashboard",
		label: "Panel główny",
		href: routes.panel,
		icon: LayoutDashboard,
	},
	{
		id: "card-wizard",
		label: "Kreator kart",
		href: routes.wizard,
		icon: Wand2,
	},
	{
		id: "user-cards",
		label: "Karty",
		href: routes.userCards,
		icon: CreditCardIcon,
	},
	{
		id: "company",
		label: "Firmy",
		href: routes.userCompanies,
		icon: Building2,
	},
	{
		id: "user-settings",
		label: "Ustawienia",
		href: routes.settings,
		icon: Settings,
	},
];
