'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import Container from './Container';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-start py-2 px-5 md:py-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-start gap-2">
                        <svg className="text-secondary min-w-fit w-32 h-32 -mt-5" viewBox="0 0 500 423" fill="currentColor">
                            <path d="M262.763,79.127a79.127,79.127,0,1,0-158.254,0c0,14.37,3.544,29.409,9.1,44.2a122.292,122.292,0,0,0,25.6-15.967,142.364,142.364,0,0,0,18.7-18.37l-18.118-12.5c-3.051-2.1-1.931-7.36,1.878-8.823l71.388-27.372a4.2,4.2,0,0,1,5.7,3.935l-.244,76.455c-.012,4.077-4.534,6.99-7.58,4.888L192.121,112.6a164.183,164.183,0,0,1-56.394,28.672c-.562.11-1.124.228-1.686.375q-2.566.66-5.214,1.242a172.125,172.125,0,0,1-62.1,1.576c-4.171-.664-12.232-2.5-12.232-2.5s6.819,2.929,10.582,4.191c18.427,6.24,40.594,8.7,62.765,7.768,13.466,24.5,29.963,46.227,41.511,60.231a18.482,18.482,0,0,0,28.509.065c22.782-27.6,64.9-85.363,64.9-135.089" transform="translate(167.486)"/>
                        </svg>
                        <span className="manrope text-3xl font-semibold text-foreground cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-6">
                        {menuItems.map(item => (
                            <li key={item.text} className="flex items-center">
                                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors">
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li className="flex items-center">
                            <Link href="www.web.docilja.si" className="text-white bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors">
                                Prijava
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="#cta" className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit" onClick={toggleMenu}>
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
