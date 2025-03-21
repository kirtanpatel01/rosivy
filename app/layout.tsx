import type { Metadata } from "next";
import "./globals.css";
import { sono } from './fonts'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: 'Rosivy | Home',
  description: 'Welcome to the Rosivy store',
  openGraph: {
    title: 'Rosivy | Home',
    description: 'Welcome to the Rosivy store',
    url: 'https://rosivy.vercel.app',
    siteName: 'Rosivy',
    images: [
      {
        url: '/imaegs/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Rosivy Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rosivy | Home',
    description: 'Welcome to the Rosivy store',
    images: ['/imaegs/logo.svg'], // Replace with the absolute URL of your image
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
