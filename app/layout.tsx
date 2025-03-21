import type { Metadata } from "next";
import "./globals.css";
import { sono } from './fonts'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Rosivy | Home",
  description: "Welcome to the Rosivy store",
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
