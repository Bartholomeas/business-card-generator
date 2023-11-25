import { LayoutDashboard, Settings, Wand2 } from "lucide-react";

const panelRoutes = {
  panel: "/panel",
  settings: "/panel/ustawienia",
  wizard: "/panel/kreator",
};

const settingsLinks = {
  profile: `${panelRoutes.settings}`,
  account: `${panelRoutes.settings}/konto`,
  notifications: `${panelRoutes.settings}/powiadomienia`,
};

export const routes = {
  home: "/",
  login: "/zaloguj-sie",
  signUp: "/zarejestruj-sie",
  ...panelRoutes,
  settingsTabs: settingsLinks,
};

export const navLinks = [
  {
    label: "Kreator",
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
  { id: "card-wizard", label: "Kreator", href: routes.wizard, icon: Wand2 },
  {
    id: "user-settings",
    label: "Ustawienia",
    href: routes.settings,
    icon: Settings,
  },
];
