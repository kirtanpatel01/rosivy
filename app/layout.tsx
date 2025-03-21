import type { Metadata } from "next";
import "./globals.css";
import { sono } from './fonts'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        url: "https://rosivy.vercel.app/images/yah_logo.png", // Use a high-resolution image
        width: 1200, // Recommended width
        height: 630, // Recommended height
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
      <body className={`${sono.className}`}>
        <Navbar />
        <div className="pt-[70px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
