"use client"

import React from 'react'
import clsx from 'clsx'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/data/translations'
import { ctaDetails } from '@/data/cta'

const PlayStoreButton = ({ dark }: { dark?: boolean }) => {
    const { currentLanguage } = useLanguage()
    const t = translations[currentLanguage]

    return (
        <div className="flex items-center gap-2">
            <a href={ctaDetails.googlePlayUrl}>
                <button
                    type="button"
                    className={clsx("flex items-center justify-center min-w-[150px] mt-3 px-6 h-12 rounded-full w-full sm:w-fit", { "text-white bg-foreground": dark, "text-foreground bg-white": !dark })}
                >
                    <div className="mr-3">
                        <svg viewBox="0 0 512 512" width="20" className="sm:w-[30px]">
                            <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                            </path>
                        </svg>
                    </div>
                    <div>
{/*                         <div className="text-xs">
                            {t.cta.getVia}
                        </div> */}
                        <div className="-mt-1 font-sans text-md sm:text-md font-semibold">
                            {t.cta.downloadOnGoogle}
                        </div>
                    </div>
                </button>
            </a>
{/*             <a 
                href="/files/docilja.apk" 
                download="docilja.apk"
                className={clsx("cursor-pointer hover:opacity-80 transition-opacity", { "text-primary": dark, "text-foreground": !dark })}
                title="Download APK"
            >
                <HiDownload className="h-6 w-6 mt-3" />
            </a> */}
        </div>
    )
}

export default PlayStoreButton