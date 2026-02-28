import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "./theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),

  title: "Eisamay: Listen our audio news",
  description:
    "Stay updated with the latest Bengali news on politics, sports, business, entertainment, and more.",

  manifest: "/manifest.json",

  themeColor: "#d40000",

  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_DOMAIN}/listen/eisamay.png` },
      { url: `${process.env.NEXT_PUBLIC_DOMAIN}/listen/eisamay.png`, sizes: "32x32", type: "image/png" },
    ],
    shortcut: `${process.env.NEXT_PUBLIC_DOMAIN}/listen/eisamay.png`,
  },

  openGraph: {
    type: "website",
    siteName: "Eisamay",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} transition-colors`}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>

        {/* ✅ GA4 */}
        <GoogleAnalytics gaId="G-G6WE9XXXXD" />
      </body>
    </html>
  );
}