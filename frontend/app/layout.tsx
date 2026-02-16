import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { robotoSans } from "./fonts";
import ThemeScript from "./lib/theme";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    template: "%s | BsnessApp",
    default: "BsnessApp",
  },
  description: "BsnessApp, facturación en la nube",
  openGraph: {
    images: "/opengraph-image.png",
  },
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
        className={`${robotoSans.className} antialiased bg-stone-200 dark:bg-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
