// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/modules/shared/providers/theme_provider";


const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CIRP - Municipal Asset & Maintenance Platform",
  description: "City Infrastructure Reporting & Asset Management System",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}