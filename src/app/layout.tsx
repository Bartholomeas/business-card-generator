import "~/misc/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { headers } from "next/headers";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/providers/trpc-provider";

import { PublicViewTemplate } from "~/components/layout/public-view-template";
import { Toaster } from "~/components/common/toast/toaster";
import { SessionAppProvider } from "~/providers/session-app-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={`font-sans ${inter.variable}`}>
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
