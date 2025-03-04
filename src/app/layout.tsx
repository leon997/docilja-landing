import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Source_Sans_3, Manrope } from "next/font/google";


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from '@/data/siteDetails';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Providers from "@/components/Providers";

import "./globals.css";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

// Default metadata with fallback to Slovenian
export const metadata: Metadata = {
  title: siteDetails.metadata.sl.title,
  description: siteDetails.metadata.sl.description,
  openGraph: {
    title: siteDetails.metadata.sl.title,
    description: siteDetails.metadata.sl.description,
    url: siteDetails.siteUrl,
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 675,
        alt: siteDetails.siteName.sl,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.sl.title,
    description: siteDetails.metadata.sl.description,
    images: ['/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteDetails.language.sl}>
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <Providers>
          <LanguageProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
