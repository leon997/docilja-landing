"use client"

import BenefitSection from "./BenefitSection"
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/data/translations'
import { getBenefits } from "@/data/benefits"

const Benefits: React.FC = () => {
    const { currentLanguage } = useLanguage()
    const t = translations[currentLanguage]
    const benefits = getBenefits(t)

    return (
        <div id="features">
            <h2 className="sr-only">Features</h2>
            {benefits.map((item, index) => {
                return <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
            })}
        </div>
    )
}

export default Benefits