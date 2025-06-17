import { translations } from "@/data/translations";

export const getFooterDetails = (t: typeof translations.sl) => ({
    subheading: t.footer.subheading,
    quickLinks: [
        {
            text: t.footer.quickLinks.features,
            url: "#features"
        },
        {
            text: t.footer.quickLinks.testimonials,
            url: "#testimonials"
        },
        {
            text: t.footer.quickLinks.register,
            url: "#register"
        },
        {
            text: t.footer.quickLinks.terms,
            url: "#terms",
            modal: true
        }
    ],
    email: t.footer.email,
    //telephone: t.footer.telephone,
    socials: {
        // github: 'https://github.com',
        //x: 'https://twitter.com/x',
        facebook: 'https://www.facebook.com/profile.php?id=61576104826276',
        // youtube: 'https://youtube.com',
        //linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
});