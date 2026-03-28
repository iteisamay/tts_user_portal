import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "./theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateViewport() {
  return {
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    themeColor: "#d40000",
  };
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),

  title: "Eisamay: Listen our audio news",
  description:
    "Stay updated with the latest Bengali news on politics, sports, business, entertainment, and more.",

  manifest: "/manifest.json",

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
      <head>
        {/* GA4 Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GAID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GAID}', {
              send_page_view: false
            });
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} transition-colors`}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>

        {/* ✅ GA4 */}
        {/* <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GAID}`} /> */}
      </body>
    </html>
  );
}