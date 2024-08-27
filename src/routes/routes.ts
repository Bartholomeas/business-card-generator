import { Building2, LayoutDashboard, Settings, Wand2 } from "lucide-react";

const panelRoutes = {
  panel: "/panel",
  settings: "/panel/ustawienia",
  wizard: "/panel/kreator-kart",
  editCompanyPage: "/panel/strona-firmy",
};

const publicRoutes = {
  home: "/",
  about: "/o-nas",
  login: "/zaloguj-sie",
  signUp: "/zarejestruj-sie",
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
    label: "O nas",
    href: routes.home,
  },
  {
    label: "Cennik",
    href: routes.home,
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
    id: "company-page",
    label: "Strona firmy",
    href: routes.editCompanyPage,
    icon: Building2,
  },
  {
    id: "user-settings",
    label: "Ustawienia",
    href: routes.settings,
    icon: Settings,
  },
];
