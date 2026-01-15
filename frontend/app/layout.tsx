import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { robotoSans, robotoFlex } from "./fonts";

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
    <html lang="es">
      <body
        className={`${robotoSans.className} antialiased bg-stone-300 dark:bg-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
