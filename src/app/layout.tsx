import "~/misc/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { headers } from "next/headers";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

import { PublicViewTemplate } from "~/components/templates/PublicViewTemplate";
import { Toaster } from "~/components/common/ui/toast/toaster";
import { Providers } from "~/components/templates/Providers";

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
      <Providers session={session}>
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider headers={headers()}>
            <PublicViewTemplate>{children}</PublicViewTemplate>
          </TRPCReactProvider>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
