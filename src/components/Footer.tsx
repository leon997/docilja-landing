import Link from 'next/link';
import React from 'react';

import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-start gap-2">
                        <svg className="text-secondary min-w-fit w-32 h-32" viewBox="0 0 500 423" fill="currentColor">
                            <path d="M262.763,79.127a79.127,79.127,0,1,0-158.254,0c0,14.37,3.544,29.409,9.1,44.2a122.292,122.292,0,0,0,25.6-15.967,142.364,142.364,0,0,0,18.7-18.37l-18.118-12.5c-3.051-2.1-1.931-7.36,1.878-8.823l71.388-27.372a4.2,4.2,0,0,1,5.7,3.935l-.244,76.455c-.012,4.077-4.534,6.99-7.58,4.888L192.121,112.6a164.183,164.183,0,0,1-56.394,28.672c-.562.11-1.124.228-1.686.375q-2.566.66-5.214,1.242a172.125,172.125,0,0,1-62.1,1.576c-4.171-.664-12.232-2.5-12.232-2.5s6.819,2.929,10.582,4.191c18.427,6.24,40.594,8.7,62.765,7.768,13.466,24.5,29.963,46.227,41.511,60.231a18.482,18.482,0,0,0,28.509.065c22.782-27.6,64.9-85.363,64.9-135.089" transform="translate(167.486)"/>
                        </svg>                        
                        <h3 className="manrope text-xl font-semibold cursor-pointer">
                        {siteDetails.siteName}
                        </h3>
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {footerDetails.subheading}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="text-foreground-accent">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Kontaktirajte nas</h4>

                    {footerDetails.email && <a href={`mailto:${footerDetails.email}`}  className="block text-foreground-accent hover:text-foreground">Email: {footerDetails.email}</a>}

                    {footerDetails.telephone && <a href={`tel:${footerDetails.telephone}`} className="block text-foreground-accent hover:text-foreground">Phone: {footerDetails.telephone}</a>}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
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
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="text-sm mt-2 text-gray-500">Made with &hearts; by <a href="https://nexilaunch.com" target="_blank">Nexi Launch</a></p>
                <p className="text-sm mt-2 text-gray-500">UI kit by <a href="https://ui8.net/youthmind/products/fintech-finance-mobile-app-ui-kit" target="_blank">Youthmind</a></p>
            </div>
        </footer>
    );
};

export default Footer;
