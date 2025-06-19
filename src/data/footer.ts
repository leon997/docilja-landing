import { translations } from "@/data/translations";

export const getFooterDetails = (t: typeof translations.sl | typeof translations.en) => ({
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
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61576104826276',
    instagram: 'https://www.instagram.com',
  }
});