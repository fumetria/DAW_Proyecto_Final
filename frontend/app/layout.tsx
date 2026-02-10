import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { robotoSans } from "./fonts";
import ThemeScript from "./lib/theme";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s | Bsness App",
    default: "Bsness App",
  },
  description: "Bsness App, facturación en la nube",
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
      </head>
      <body
        className={`${robotoSans.className} antialiased bg-stone-300 dark:bg-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
