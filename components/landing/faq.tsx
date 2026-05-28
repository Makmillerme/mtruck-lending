"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locale } from "@/lib/locale";

import { pickMetaString, pickText } from "@/lib/landing-section-parsers";

const content = {
  en: {
    badge: "FAQ",
    title: "Frequently Asked",
    titleHighlight: "Questions",
    description: "Find answers to common questions about our services and vehicle import process.",
  },
  uk: {
    badge: "FAQ",
    title: "Часті",
    titleHighlight: "Запитання",
    description: "Знайдіть відповіді на поширені запитання про наші послуги та процес імпорту техніки.",
  },
};

interface FAQProps {
  locale: Locale;
  faqsData?: Array<{
    id: number;
    questionEn: string;
    questionUk: string | null;
    answerEn: string;
    answerUk: string | null;
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
    question: locale === "uk" ? item.questionUk || item.questionEn : item.questionEn,
    answer: locale === "uk" ? item.answerUk || item.answerEn : item.answerEn,
  }));

  return (
    <section id="faq" className="section-y-balanced section-tint section-blend section-seam-accent">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center mx-auto mb-12">
          <span className="inline-flex items-center rounded-full border border-cyan-200/30 bg-background/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-50/90">
            {badge}
          </span>
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl text-balance">
            {title} <span className="chrome-gradient">{titleHighlight}</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground max-w-xl">{description}</p>
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
