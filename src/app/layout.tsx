import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Source_Sans_3, Manrope } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from '@/data/siteDetails';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Providers from "@/components/Providers";

import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

// Determine language from build-time environment variable
const targetLangEnv = process.env.APP_TARGET_LANG?.toLowerCase();
const currentLang = targetLangEnv === 'en' ? 'en' : 'sl'; // Default to 'sl'

const currentSiteDetails = currentLang === 'en' ? siteDetails.metadata.en : siteDetails.metadata.sl;
const currentSiteName = currentLang === 'en' ? siteDetails.siteName.en : siteDetails.siteName.sl;
const currentLangAttribute = currentLang === 'en' ? siteDetails.language.en : siteDetails.language.sl;

// Static metadata based on build-time environment variable
export const metadata: Metadata = {
  title: currentSiteDetails.title,
  description: currentSiteDetails.description,
  openGraph: {
    title: currentSiteDetails.title,
    description: currentSiteDetails.description,
    url: siteDetails.siteUrl, // Assuming siteUrl is common or manage via env var if different
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // Consider making images dynamic based on lang/domain if they differ
        width: 1200,
        height: 675,
        alt: currentSiteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: currentSiteDetails.title,
    description: currentSiteDetails.description,
    images: ['/images/twitter-image.jpg'], // Consider making images dynamic
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={currentLangAttribute}>
      <head>
      <GoogleAnalytics gaId="G-31F3VLZENS" />
      </head>
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        <Providers>
          <LanguageProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <CookieConsentBanner />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
