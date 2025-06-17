export const siteDetails = {
    siteName: {
        sl: 'DoCilja',
        en: '2Dest'
    },
    siteUrl: 'https://www.docilja.si/',
    metadata: {
        sl: {
            title: 'DoCilja - Pametno, varno, preprosto deljenje prevozov',
            description: 'DoCilja omogoča preprosto in varno deljenje prevozov.',
        },
        en: {
            title: '2Dest - Smart, safe, simple ride sharing',
            description: '2Dest enables simple and safe ride sharing.',
        }
    },
    language: {
        sl: 'sl-si',
        en: 'en-us'
    },
    locale: {
        sl: 'sl-SI',
        en: 'en-US'
    },
    siteLogo: `${process.env.BASE_PATH || ''}/images/logo.png`, // or use a string for the logo e.g. "TechStartup"
    googleAnalyticsId: '', // e.g. G-XXXXXXX,
}

export const domains = {
    en: 'https://2dest.com',
    sl: 'https://docilja.si'
} as const

export const loginUrls = {
    en: 'https://web.2dest.com',
    sl: 'https://web.docilja.si'
} as const

// Utility function to get the correct login URL based on the current domain
export function getLoginUrl(): string {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname
        if (hostname.includes('2dest.com')) {
            return loginUrls.en
        }
    }
    // Default to Slovenian login URL
    return loginUrls.sl
}
