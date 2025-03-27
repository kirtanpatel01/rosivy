// app/fonts.ts
import { Outfit, Sono, Ysabeau, Josefin_Sans, Comic_Neue, Lato, Montserrat } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
});

export const sono = Sono({
  subsets: ['latin'],
  display: 'swap',
});

export const ysabeau = Ysabeau({
  subsets: ['latin'],
  display: 'swap',
});

export const josefin_sans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const comic_neue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '700', '900']
})

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})