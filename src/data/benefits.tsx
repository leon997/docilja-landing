import { FiUsers, FiDollarSign, FiMapPin, FiLock, FiMessageSquare, FiBell } from "react-icons/fi";
import { translations } from '@/data/translations';

const benefitIcons = {
    section1: [
        <FiUsers key="users" size={26} />,
        <FiDollarSign key="dollar" size={26} />,
        <FiMapPin key="map" size={26} />
    ],
    section2: [
        <FiLock key="lock" size={26} />,
        <FiMessageSquare key="message" size={26} />,
        <FiBell key="bell" size={26} />
    ]
}

type TranslationType = typeof translations.sl;

// Determine language from build-time environment variable for image path
const targetLangEnvBenefits = process.env.APP_TARGET_LANG?.toLowerCase();
const mockupImageSrc = targetLangEnvBenefits === 'en' ? "/images/mockup-3-en.png" : "/images/mockup-3.png";

export const getBenefits = (t: TranslationType) => [
    {
        title: t.benefits.section1.title,
        description: t.benefits.section1.description,
        bullets: t.benefits.section1.bullets.map((bullet, index: number) => ({
            ...bullet,
            icon: benefitIcons.section1[index]
        })),
        imageSrc: "/images/people.png"
    },
    {
        title: t.benefits.section2.title,
        description: t.benefits.section2.description,
        bullets: t.benefits.section2.bullets.map((bullet, index: number) => ({
            ...bullet,
            icon: benefitIcons.section2[index]
        })),
        imageSrc: mockupImageSrc // Updated to use the conditional image path
    },
]