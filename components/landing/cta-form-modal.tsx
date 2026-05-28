"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale, PublicLocale } from "@/lib/locale";

type CtaEntryPoint = "header" | "hero" | "footer";

interface CtaFormModalProps {
  locale: PublicLocale | Locale;
  entryPoint: CtaEntryPoint;
  contactEmail?: string;
  contactPhone?: string;
  children: ReactNode;
}

const copy = {
  en: {
    title: { header: "Get a personalized quote", hero: "Request consultation", footer: "Send us a request" },
    description: "Leave your details and preferred vehicle type. We will contact you with a tailored offer.",
    fields: { name: "Name", phone: "Phone", email: "Email (optional)", message: "Request details" },
    placeholders: {
      name: "Your name",
      phone: "+420 ...",
      email: "name@company.com",
      message: "Brand, category, budget, delivery timeline...",
    },
    submit: "Send request",
    submitting: "Sending...",
    success: "Request sent successfully. We will contact you shortly.",
    errorFallback: "Unable to send the request right now. Please try again later.",
    helper: "Or contact us directly:",
    sourceLabel: { header: "Header CTA", hero: "Hero CTA", footer: "Footer CTA" },
  },
  uk: {
    title: {
      header: "Отримати персональну пропозицію",
      hero: "Залишити запит на консультацію",
      footer: "Надіслати запит",
    },
    description:
      "Залиште контакти та бажаний тип техніки. Ми зв'яжемося з вами з персональною пропозицією.",
    fields: {
      name: "Ім'я",
      phone: "Телефон",
      email: "Email (необов'язково)",
      message: "Деталі запиту",
    },
    placeholders: {
      name: "Ваше ім'я",
      phone: "+420 ...",
      email: "name@company.com",
      message: "Бренд, категорія, бюджет, термін поставки...",
    },
    submit: "Надіслати запит",
    submitting: "Надсилаємо...",
    success: "Запит успішно надіслано. Скоро зв'яжемося з вами.",
    errorFallback: "Не вдалося надіслати запит. Спробуйте, будь ласка, трохи пізніше.",
    helper: "Або зв'яжіться з нами напряму:",
    sourceLabel: { header: "CTA у хедері", hero: "CTA у Hero", footer: "CTA перед футером" },
  },
} as const;

export function CtaFormModal({
  locale,
  entryPoint,
  contactEmail = "sales@m-truck.cz",
  contactPhone = "+420 775 123 456",
  children,
}: CtaFormModalProps) {
  const t = copy[locale === "uk" ? "uk" : "en"];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const resetState = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setFeedback(null);
    setHasError(false);
    setIsSubmitting(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFeedback(null);
    setHasError(false);

    try {
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: locale === "uk" ? "uk" : "en",
          entryPoint,
          sourceLabel: t.sourceLabel[entryPoint],
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setFeedback(data?.error || t.errorFallback);
        setHasError(true);
        setIsSubmitting(false);
        return;
      }

      setFeedback(t.success);
      setHasError(false);
      setIsSubmitting(false);
      window.setTimeout(() => {
        setOpen(false);
        resetState();
      }, 800);
    } catch {
      setFeedback(t.errorFallback);
      setHasError(true);
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetState();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border border-cyan-200/20 bg-background/95 p-0 sm:max-w-xl">
        <div className="border-b border-cyan-200/12 px-6 py-5">
          <DialogTitle className="text-xl font-bold text-foreground">{t.title[entryPoint]}</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-muted-foreground">{t.description}</DialogDescription>
        </div>

        <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.name}</span>
              <Input required value={name} onChange={(event) => setName(event.target.value)} placeholder={t.placeholders.name} autoComplete="name" />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.phone}</span>
              <Input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t.placeholders.phone} autoComplete="tel" />
            </label>
          </div>

          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.email}</span>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.placeholders.email} autoComplete="email" />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.message}</span>
            <Textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t.placeholders.message} className="h-28 resize-none" />
          </label>

          <div className="space-y-3 pt-1">
            <Button type="submit" className="landing-btn landing-btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </Button>
            {feedback ? <p className={`text-xs ${hasError ? "text-rose-300" : "text-emerald-300"}`}>{feedback}</p> : null}
            <p className="text-xs text-muted-foreground">
              {t.helper}{" "}
              <a href={`mailto:${contactEmail}`} className="footer-nav-link">
                {contactEmail}
              </a>{" "}
              {" | "}
              <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="footer-nav-link">
                {contactPhone}
              </a>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
