import type { Metadata } from "next";
import "./globals.css";
import { Ysabeau, Sono, Outfit, Josefin_Sans, Comic_Neue } from 'next/font/google'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap'
})
export const sono = Sono({
  subsets: ['latin'],
  display: 'swap'
})
export const ysabeau = Ysabeau({
  subsets: ['latin'],
  display: 'swap'
})
export const josefin_sans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
})
export const comic_neue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap'
})

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
      <body>
        <Navbar />
        <div className="pt-[70px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
