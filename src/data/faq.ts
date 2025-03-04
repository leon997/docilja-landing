import { IFAQ } from "@/types";
import { translations } from "@/data/translations";

export const getFaqs = (t: typeof translations.sl): IFAQ[] => [
    {
        question: t.faq.questions.q1.question,
        answer: t.faq.questions.q1.answer
    },
    {
        question: t.faq.questions.q2.question,
        answer: t.faq.questions.q2.answer
    },
    {
        question: t.faq.questions.q3.question,
        answer: t.faq.questions.q3.answer
    }
];