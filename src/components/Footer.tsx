"use client"

import Link from 'next/link';
import React, { useState } from 'react';

import { siteDetails } from '@/data/siteDetails';
import { getFooterDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { TermsModal } from './TermsModal';
import { IMenuItem } from "@/types";

const Footer: React.FC = () => {
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage];
    const footerDetails = getFooterDetails(t);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const handleLinkClick = (link: IMenuItem, e: React.MouseEvent<HTMLAnchorElement>) => {
        if (link.modal) {
            e.preventDefault();
            setIsTermsModalOpen(true);
            return;
        }
    };

    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-start gap-2">
                        <img
                            src="/images/2dest_icon_footer.png"
                            alt="2Dest Logo"
                            width={64}
                            height={64}
                            className="w-16 h-16"
                        />
                    </Link>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinksTitle}</h4>
                    <ul className="text-foreground-accent">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link
                                    href={link.url}
                                    onClick={(e) => {
                                        handleLinkClick(link, e);
                                    }}
                                    className="hover:text-foreground"
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t.footer.contactTitle}</h4>

                    {footerDetails.email && (
                        <a 
                            href={`mailto:${footerDetails.email}`} 
                            className="block text-foreground-accent hover:text-foreground"
                        >
                            {t.footer.emailLabel}: {footerDetails.email}
                        </a>
                    )}

{/*                     {footerDetails.telephone && (
                        <a 
                            href={`tel:${footerDetails.telephone}`} 
                            className="block text-foreground-accent hover:text-foreground"
                        >
                            {t.footer.phoneLabel}: {footerDetails.telephone}
                        </a>
                    )} */}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {(Object.keys(footerDetails.socials) as Array<keyof typeof footerDetails.socials>).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>{t.footer.copyright} &copy; {new Date().getFullYear()} {siteDetails.siteName[currentLanguage]}. {t.footer.rightsReserved}</p>
            </div>
            <TermsModal 
                isOpen={isTermsModalOpen} 
                onClose={() => setIsTermsModalOpen(false)} 
            />
        </footer>
    );
};

export default Footer;
