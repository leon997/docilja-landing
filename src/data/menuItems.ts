import { IMenuItem } from "@/types";
import { translations } from "@/data/translations";

export const getMenuItems = (t: typeof translations.sl): IMenuItem[] => [
    {
        text: t.menu.features,
        url: "#features"
    },
    {
        text: t.menu.register,
        url: "https://web.2dest.com/?screen=register"
    },
    {
        text: t.menu.terms,
        url: "#terms",
        modal: true
    }, 
    {
        text: t.menu.contact || 'Kontakt',
        url: '/kontakt',
        
    }
 
];