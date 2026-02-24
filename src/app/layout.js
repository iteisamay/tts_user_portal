


import Script from 'next/script'
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import ThemeProviderWrapper from "./theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eisamay:Listen our audio new",
  description: "Stay updated with the latest Bengali news on politics, sports, business, entertainment, and more. Read trusted Bangla news from West Bengal&#x27;s leading newspaper, Ei Samay.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} transition-colors`}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
        <GoogleAnalytics gaId="G-G6WE90DNWD"/>
    </html>
  );
}