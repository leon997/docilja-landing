"use client"

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from 'react-icons/hi2'
import { useLanguage } from '@/contexts/LanguageContext'

type Language = {
  code: 'sl' | 'en'
  name: string
}

export const languages: Language[] = [
  { code: 'sl', name: 'SLO' },
  { code: 'en', name: 'ENG' },
]

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()
  const selected = languages.find(lang => lang.code === currentLanguage) || languages[0]
  
  // Filter out the current language from available options
  const availableLanguages = languages.filter(lang => lang.code !== currentLanguage)

  return (
    <Listbox value={selected} onChange={(lang: Language) => setLanguage(lang.code)}>
      <div className="relative">
        <Listbox.Button className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-1">
          <span>{selected.name}</span>
          <HiChevronUpDown className="h-4 w-4" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 mt-2 w-20 overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {availableLanguages.map((language) => (
              <Listbox.Option
                key={language.code}
                value={language}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-4 ${
                    active ? 'bg-primary text-white' : 'text-foreground'
                  }`
                }
              >
                {language.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
} 