import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { robotoSans } from "./fonts";
import ThemeScript from "./lib/theme";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s | BsnessApp",
    default: "BsnessApp",
  },
  description: "BsnessApp, facturación en la nube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${robotoSans.className} antialiased bg-stone-300 dark:bg-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
