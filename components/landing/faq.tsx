"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/lib/locale";
import { pickEntityLocale } from "@/lib/pick-locale";

import { pickMetaString, pickText } from "@/lib/landing-section-parsers";

const content = {
  en: {
    badge: "FAQ",
    title: "Frequently Asked",
    titleHighlight: "Questions",
    description: "Practical answers about supply terms, paperwork, and working with Expert Travel.",
  },
  uk: {
    badge: "FAQ",
    title: "Часті",
    titleHighlight: "запитання",
    description: "Практичні відповіді про умови постачання, документи та співпрацю з Expert Travel.",
  },
  sk: {
    badge: "FAQ",
    title: "Často kladené",
    titleHighlight: "Otázky",
    description: "Praktické odpovede o podmienkach dodávok, dokumentoch a spolupráci s Expert Travel.",
  },
  de: {
    badge: "FAQ",
    title: "Häufig gestellte",
    titleHighlight: "Fragen",
    description: "Praktische Antworten zu Lieferbedingungen, Unterlagen und der Zusammenarbeit mit Expert Travel.",
  },
};

interface FAQProps {
  locale: Locale;
  faqsData?: Array<{
    id: number;
    questionEn: string;
    questionUk: string | null;
    questionSk?: string | null;
    questionDe?: string | null;
    answerEn: string;
    answerUk: string | null;
    answerSk?: string | null;
    answerDe?: string | null;
  }>;
  metaContent?: Record<string, unknown>;
}

export function FAQ({ locale, faqsData = [], metaContent }: FAQProps) {
  const base = content[locale];
  const badge = pickText(pickMetaString(metaContent, "badge"), base.badge);
  const title = pickText(pickMetaString(metaContent, "title"), base.title);
  const titleHighlight = pickText(pickMetaString(metaContent, "titleHighlight"), base.titleHighlight);
  const description = pickText(pickMetaString(metaContent, "description"), base.description);

  const items = faqsData.map((item) => ({
    id: item.id,
    question: pickEntityLocale(locale, {
      en: item.questionEn,
      uk: item.questionUk,
      sk: item.questionSk,
      de: item.questionDe,
    }),
    answer: pickEntityLocale(locale, {
      en: item.answerEn,
      uk: item.answerUk,
      sk: item.answerSk,
      de: item.answerDe,
    }),
  }));

  return (
    <section id="faq" className="section-y-balanced section-tint section-blend section-seam-accent landing-section-contained landing-section-deferred">
      <div className="landing-page-container landing-page-container--narrow relative z-10">
        <div className="landing-section-head items-center text-center mx-auto mb-12">
          <span className="landing-section-badge">{badge}</span>
          <h2 className="landing-section-title">
            {title} <span className="chrome-gradient">{titleHighlight}</span>
          </h2>
          <p className="landing-section-description max-w-xl">{description}</p>
        </div>

        <Accordion type="single" collapsible className="landing-faq-accordion space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="landing-glass-card landing-faq-item !p-2 sm:!p-3 data-[state=open]:border-cyan-200/40"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-cyan-50 hover:no-underline px-3 sm:px-4 py-3 leading-relaxed items-start relative z-10 font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-3 sm:px-4 pb-4 pt-1 leading-relaxed relative z-10">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
