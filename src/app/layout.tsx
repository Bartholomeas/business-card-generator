import "~/misc/styles/globals.css";

import { Inter } from "next/font/google";

import { PublicViewTemplate } from "~/components/templates/PublicViewTemplate";
import { Toaster } from "~/components/ui/toaster";
import { Providers } from "~/components/templates/Providers";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kwirk",
  description: "Kwirk - Twoja współczesna wizytówka.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <Providers session={session}>
        <body className={`font-sans ${inter.variable}`}>
          <PublicViewTemplate>{children}</PublicViewTemplate>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
