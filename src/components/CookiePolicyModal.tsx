"use client"

import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations]?.cookiePolicy || translations.en.cookiePolicy;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-xl">
          <div className="flex items-center">
            <IoShieldCheckmarkOutline className="text-primary w-6 h-6 mr-3" />
            <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <p className="text-foreground-accent mb-0">{t.intro}</p>
          </div>
        
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t.whatAre.title}</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-foreground-accent">{t.whatAre.description}</p>
            </div>
          </section>
        
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t.whatWeUse.title}</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-foreground-accent mb-6">{t.whatWeUse.description}</p>
              <ul className="space-y-4">
                {t.whatWeUse.types.map((type, index) => (
                  <li key={index} className="flex">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 h-fit mt-1">
                      <div className="bg-primary rounded-full w-2 h-2"></div>
                    </div>
                    <div>
                      <strong className="font-semibold text-foreground block mb-1">{type.name}</strong>
                      <p className="text-foreground-accent">{type.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t.control.title}</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-foreground-accent">{t.control.description}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal; 