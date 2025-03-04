"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { domains } from '@/data/siteDetails'

type LanguageCode = 'sl' | 'en'

type LanguageContextType = {
  currentLanguage: LanguageCode
  setLanguage: (code: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Determine initial language based on domain
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('sl')

  useEffect(() => {
    // Set initial language based on the current domain
    const hostname = window.location.hostname
    if (hostname.includes('2dest.com')) {
      setCurrentLanguage('en')
    } else {
      // Default to Slovenian for docilja.si or any other domain
      setCurrentLanguage('sl')
    }
  }, [])

  const setLanguage = (code: LanguageCode) => {
    // Redirect to the appropriate domain based on language selection
    const targetDomain = domains[code]
    if (targetDomain && !window.location.href.includes(new URL(targetDomain).hostname)) {
      window.location.href = targetDomain
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 
