import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./fonts";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Rosivy | Home",
  description: "Welcome to the Rosivy store",
  openGraph: {
    title: "Rosivy | Home",
    description: "Discover amazing products at Rosivy store.",
    url: "https://rosivy.vercel.app",
    siteName: "Rosivy",
    images: [
      {
        url: "https://rosivy.vercel.app/images/yah_logo.png",
        width: 313,
        height: 313,
        alt: "Rosivy Store Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Toaster richColors position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
