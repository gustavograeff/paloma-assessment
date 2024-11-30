"use-client";

import clsx from "clsx";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paloma Assessment",
  icons: "https://framerusercontent.com/images/5YM5kT6dnHDvwAHjAw1HmXOM.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "overflow-auto")}>{children}</body>
    </html>
  );
}
