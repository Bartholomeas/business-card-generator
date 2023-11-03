import "~/misc/styles/globals.css";

import { Inter } from "next/font/google";

import { PublicViewTemplate } from "~/components/templates/PublicViewTemplate";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kwirk",
  description: "Kwirk - Twoja współczesna wizytówka.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <PublicViewTemplate>{children}</PublicViewTemplate>
        <Toaster />
      </body>
    </html>
  );
}
