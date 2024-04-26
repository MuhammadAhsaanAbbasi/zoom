import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOOM",
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/loom-logo.svg",
          socialButtonsVariant: "iconButton"
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
        <head>
        <link rel="icon" href="./icons/favicon.ico" />
        </head>
        <body className={`${inter.className} bg-dark-1 text-white`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
