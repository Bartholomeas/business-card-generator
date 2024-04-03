import "~/misc/styles/globals.css";

import { Inter, Poppins, Roboto } from "next/font/google";
import { type Metadata } from "next";
import { headers } from "next/headers";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/providers/trpc-provider";

import { PublicViewTemplate } from "~/components/layout/public-view-template";
import { Toaster } from "~/components/common/toast/toaster";
import { SessionAppProvider } from "~/providers/session-app-provider";
import { cn } from "~/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: { default: "Kwirk", template: "%s | Kwirk" },
  description: "Kwirk - Twoja współczesna wizytówka.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={cn("font-sans", inter.variable, poppins.variable, roboto.variable)}>
        <SessionAppProvider session={session}>
          <TRPCReactProvider headers={headers()}>
            <PublicViewTemplate>{children}</PublicViewTemplate>
          </TRPCReactProvider>
          <Toaster />
        </SessionAppProvider>
      </body>
    </html>
  );
}
