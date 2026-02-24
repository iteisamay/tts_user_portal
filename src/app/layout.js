


import Script from 'next/script'
import { Geist, Geist_Mono } from "next/font/google";
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
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G6WE90DNWD" />
      <Script id="google-analytics">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-G6WE90DNWD'); 
  `}
      </Script>
    </html>
  );
}