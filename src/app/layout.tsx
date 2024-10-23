import "~/misc/styles/globals.css";

import { Manrope } from "next/font/google";
import { headers } from "next/headers";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";


import { SessionAppProvider } from "~/providers/session-app-provider";
import { TRPCReactProvider } from "~/providers/trpc-provider";
import { getServerAuthSession } from "~/server/auth";

import { Toaster } from "~/components/common/toast/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: { default: "Kwirk", template: "%s | Kwirk" },
  description: "Kwirk - Twoja współczesna wizytówka.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const session = await getServerAuthSession();

  return (
    <html lang="pl">
      <body className={manrope.className}>
        <SessionAppProvider session={session}>
          <SpeedInsights />
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
          <Toaster />
        </SessionAppProvider>
      </body>
    </html>
  );
}
