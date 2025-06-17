"use client"

import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { useLanguage } from '@/contexts/LanguageContext';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { translations } from '@/data/translations';
import CookiePolicyModal from './CookiePolicyModal';

/*
// Define Google Analytics gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
*/

const CookieConsentBanner = () => {
  const { currentLanguage } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = translations[currentLanguage as keyof typeof translations]?.cookieConsent || translations.en.cookieConsent;

  const handleAccept = () => {
    // You can add analytics or other tracking here when cookies are accepted
    console.log('Cookies accepted');
    
    // Example: Enable Google Analytics if it exists
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('Google Analytics enabled');
    }
  };

  const handleDecline = () => {
    // You can disable analytics or other tracking here when cookies are declined
    console.log('Cookies declined');
    
    // Example: Disable Google Analytics if it exists
    if (typeof window !== 'undefined' && document.cookie) {
      // Remove Google Analytics cookies
      document.cookie = '_ga=; Max-Age=0; path=/; domain=' + window.location.hostname;
      document.cookie = '_gat=; Max-Age=0; path=/; domain=' + window.location.hostname;
      document.cookie = '_gid=; Max-Age=0; path=/; domain=' + window.location.hostname;
    }
  };

  if (!isClient) return null; // Prevent rendering on the server

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText={t.accept}
        declineButtonText={t.decline}
        cookieName="docilja-cookie-consent"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid #e5e7eb",
          color: "var(--foreground)",
          padding: "1rem",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "12px 12px 0 0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%"
        }}
        buttonStyle={{
          background: "var(--primary)",
          color: "white",
          fontSize: "14px",
          padding: "10px 20px",
          borderRadius: "999px",
          fontWeight: "600",
          transition: "background-color 0.2s ease",
          fontFamily: '"Manrope", sans-serif'
        }}
        declineButtonStyle={{
          background: "white",
          border: "1px solid var(--foreground)",
          color: "var(--foreground)",
          fontSize: "14px",
          padding: "10px 20px",
          borderRadius: "999px",
          fontWeight: "600",
          marginRight: "10px",
          transition: "background-color 0.2s ease, color 0.2s ease",
          fontFamily: '"Manrope", sans-serif'
        }}
        buttonWrapperClasses="flex items-center justify-center mt-4 md:mt-0"
        contentClasses="flex flex-col md:flex-row items-start md:items-center"
        expires={150} // Cookie expiration in days
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        ButtonComponent="button"
      >
        <div className="flex items-start md:items-center">
          <HiOutlineShieldCheck className="text-primary mr-3 flex-shrink-0 w-6 h-6 mt-1 md:mt-0" />
          <div>
            <p className="text-base mb-2 text-foreground-accent">{t.message}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-primary hover:text-primary-accent transition-colors underline bg-transparent border-none p-0 cursor-pointer"
            >
              {t.learnMore}
            </button>
          </div>
        </div>
      </CookieConsent>

      <CookiePolicyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CookieConsentBanner;
