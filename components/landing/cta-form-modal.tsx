"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BRAND_CONTACT_EMAIL } from "@/lib/branding";
import type { Locale, PublicLocale } from "@/lib/locale";

type CtaEntryPoint = "header" | "hero" | "footer" | "catalog";

interface CtaFormModalProps {
  locale: PublicLocale | Locale;
  entryPoint: CtaEntryPoint;
  brandName?: string;
  contactEmail?: string;
  contactPhone?: string;
  children: ReactNode;
}

const copy = {
  en: {
    title: { header: "Get a personalized quote", hero: "Request consultation", footer: "Send us a request" },
    description: "Leave your details and preferred vehicle type. We will contact you with a tailored offer.",
    fields: { name: "Name", phone: "Phone (optional)", email: "Email", message: "Request details" },
    placeholders: {
      name: "Your name",
      phone: "+421 ...",
      email: "name@company.com",
      message: "Brand, category, budget, delivery timeline...",
    },
    submit: "Send request",
    submitting: "Sending...",
    success: "Request sent successfully. We will contact you shortly.",
    errorFallback: "Unable to send the request right now. Please try again later.",
    helper: "Or contact us directly:",
    sourceLabel: { header: "Header CTA", hero: "Hero CTA", footer: "Footer CTA" },
    catalog: {
      title: (brand: string) => `Commercial quote request for ${brand} equipment`,
      description: (brand: string) =>
        `Leave your contacts and we will prepare current ${brand} options from EU warehouses and closed auctions, tailored to your configuration and budget requirements.`,
      submit: "Get a quote",
      sourceLabel: "Catalog brand CTA",
      prefill: (brand: string) => `Brand: ${brand}\nConfiguration: \nBudget: \nDelivery timeline: `,
      placeholders: {
        message: (brand: string) => `${brand}: configuration, budget, delivery timeline...`,
      },
    },
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
      phone: "Телефон (необов'язково)",
      email: "Email",
      message: "Деталі запиту",
    },
    placeholders: {
      name: "Ваше ім'я",
      phone: "+421 ...",
      email: "name@company.com",
      message: "Бренд, категорія, бюджет, термін поставки...",
    },
    submit: "Надіслати запит",
    submitting: "Надсилаємо...",
    success: "Запит успішно надіслано. Скоро зв'яжемося з вами.",
    errorFallback: "Не вдалося надіслати запит. Спробуйте, будь ласка, трохи пізніше.",
    helper: "Або зв'яжіться з нами напряму:",
    sourceLabel: { header: "CTA у хедері", hero: "CTA у Hero", footer: "CTA перед футером" },
    catalog: {
      title: (brand: string) => `Запит комерційної пропозиції на техніку ${brand}`,
      description: (brand: string) =>
        `Залиште свої контакти, і ми підготуємо для вас актуальні варіанти техніки ${brand} зі складів та закритих аукціонів ЄС, враховуючи ваші вимоги до комплектації та бюджету.`,
      submit: "Отримати пропозицію",
      sourceLabel: "CTA каталогу (бренд)",
      prefill: (brand: string) => `Бренд: ${brand}\nКомплектація: \nБюджет: \nТермін постачання: `,
      placeholders: {
        message: (brand: string) => `${brand}: комплектація, бюджет, термін постачання...`,
      },
    },
  },
  sk: {
    title: {
      header: "Získať personalizovanú ponuku",
      hero: "Požiadať o konzultáciu",
      footer: "Poslať nám dopyt",
    },
    description:
      "Zanechajte kontaktné údaje a preferovaný typ vozidla. Ozveme sa vám s ponukou na mieru.",
    fields: {
      name: "Meno",
      phone: "Telefón (nepovinné)",
      email: "Email",
      message: "Detaily dopytu",
    },
    placeholders: {
      name: "Vaše meno",
      phone: "+421 ...",
      email: "name@company.com",
      message: "Značka, kategória, rozpočet, termín dodania...",
    },
    submit: "Odoslať dopyt",
    submitting: "Odosielame...",
    success: "Dopyt bol úspešne odoslaný. Čoskoro vás budeme kontaktovať.",
    errorFallback: "Dopyt sa nepodarilo odoslať. Skúste to prosím neskôr.",
    helper: "Alebo nás kontaktujte priamo:",
    sourceLabel: { header: "CTA v hlavičke", hero: "CTA v Hero", footer: "CTA pred pätičkou" },
    catalog: {
      title: (brand: string) => `Dopyt na obchodnú ponuku na techniku ${brand}`,
      description: (brand: string) =>
        `Zanechajte kontakty a pripravíme aktuálne varianty ${brand} zo skladov a uzavretých aukcií v EÚ podľa vašich požiadaviek na konfiguráciu a rozpočet.`,
      submit: "Získať ponuku",
      sourceLabel: "CTA katalógu (značka)",
      prefill: (brand: string) => `Značka: ${brand}\nKonfigurácia: \nRozpočet: \nTermín dodania: `,
      placeholders: {
        message: (brand: string) => `${brand}: konfigurácia, rozpočet, termín dodania...`,
      },
    },
  },
  de: {
    title: {
      header: "Personalisiertes Angebot anfordern",
      hero: "Beratung anfragen",
      footer: "Anfrage senden",
    },
    description:
      "Hinterlassen Sie Ihre Kontaktdaten und den gewünschten Fahrzeugtyp. Wir melden uns mit einem passenden Angebot.",
    fields: {
      name: "Name",
      phone: "Telefon (optional)",
      email: "E-Mail",
      message: "Anfragedetails",
    },
    placeholders: {
      name: "Ihr Name",
      phone: "+421 ...",
      email: "name@company.com",
      message: "Marke, Kategorie, Budget, Lieferzeitpunkt...",
    },
    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    success: "Anfrage erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.",
    errorFallback: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    helper: "Oder kontaktieren Sie uns direkt:",
    sourceLabel: { header: "CTA im Header", hero: "CTA im Hero", footer: "CTA vor dem Footer" },
    catalog: {
      title: (brand: string) => `Angebotsanfrage für ${brand}-Technik`,
      description: (brand: string) =>
        `Hinterlassen Sie Ihre Kontaktdaten — wir bereiten aktuelle ${brand}-Optionen aus EU-Lagern und geschlossenen Auktionen vor, passend zu Konfiguration und Budget.`,
      submit: "Angebot anfordern",
      sourceLabel: "Katalog-CTA (Marke)",
      prefill: (brand: string) => `Marke: ${brand}\nKonfiguration: \nBudget: \nLieferzeitpunkt: `,
      placeholders: {
        message: (brand: string) => `${brand}: Konfiguration, Budget, Lieferzeitpunkt...`,
      },
    },
  },
  pl: {
    title: {
      header: "Uzyskaj spersonalizowaną ofertę",
      hero: "Poproś o konsultację",
      footer: "Wyślij zapytanie",
    },
    description:
      "Zostaw dane kontaktowe i preferowany typ pojazdu. Skontaktujemy się z dopasowaną ofertą.",
    fields: {
      name: "Imię",
      phone: "Telefon (opcjonalnie)",
      email: "E-mail",
      message: "Szczegóły zapytania",
    },
    placeholders: {
      name: "Twoje imię",
      phone: "+421 ...",
      email: "name@company.com",
      message: "Marka, kategoria, budżet, termin dostawy...",
    },
    submit: "Wyślij zapytanie",
    submitting: "Wysyłanie...",
    success: "Zapytanie wysłane. Wkrótce się skontaktujemy.",
    errorFallback: "Nie udało się wysłać zapytania. Spróbuj ponownie później.",
    helper: "Lub skontaktuj się z nami bezpośrednio:",
    sourceLabel: { header: "CTA w nagłówku", hero: "CTA w Hero", footer: "CTA przed stopką" },
    catalog: {
      title: (brand: string) => `Zapytanie ofertowe na sprzęt ${brand}`,
      description: (brand: string) =>
        `Zostaw kontakt — przygotujemy aktualne opcje ${brand} ze składów i zamkniętych aukcji UE, dopasowane do konfiguracji i budżetu.`,
      submit: "Uzyskaj ofertę",
      sourceLabel: "CTA katalogu (marka)",
      prefill: (brand: string) => `Marka: ${brand}\nKonfiguracja: \nBudżet: \nTermin dostawy: `,
      placeholders: {
        message: (brand: string) => `${brand}: konfiguracja, budżet, termin dostawy...`,
      },
    },
  },
};

export function CtaFormModal({
  locale,
  entryPoint,
  brandName,
  contactEmail = BRAND_CONTACT_EMAIL,
  contactPhone = "+421 904 752 306",
  children,
}: CtaFormModalProps) {
  const t = copy[locale] ?? copy.en;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const isCatalog = entryPoint === "catalog" && Boolean(brandName?.trim());
  const standardEntryPoint = entryPoint as Exclude<CtaEntryPoint, "catalog">;
  const dialogTitle = isCatalog ? t.catalog.title(brandName!.trim()) : t.title[standardEntryPoint];
  const dialogDescription = isCatalog ? t.catalog.description(brandName!.trim()) : t.description;
  const submitLabel = isCatalog ? t.catalog.submit : t.submit;
  const messagePlaceholder = isCatalog ? t.catalog.placeholders.message(brandName!.trim()) : t.placeholders.message;
  const sourceLabel = isCatalog
    ? `${t.catalog.sourceLabel}: ${brandName!.trim()}`
    : t.sourceLabel[standardEntryPoint];

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
          locale,
          entryPoint,
          sourceLabel,
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
    if (nextOpen && isCatalog) {
      setMessage(t.catalog.prefill(brandName!.trim()));
    }
    if (!nextOpen) resetState();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border border-cyan-200/20 bg-background/95 p-0 sm:max-w-xl">
        <div className="border-b border-cyan-200/12 px-6 py-5">
          <DialogTitle className="text-xl font-bold text-foreground">{dialogTitle}</DialogTitle>
          <DialogDescription className="mt-2 text-sm text-muted-foreground">{dialogDescription}</DialogDescription>
        </div>

        <form className="space-y-4 px-6 py-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.name}</span>
              <Input required value={name} onChange={(event) => setName(event.target.value)} placeholder={t.placeholders.name} autoComplete="name" />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.phone}</span>
              <Input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t.placeholders.phone} autoComplete="tel" />
            </label>
          </div>

          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.email}</span>
            <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.placeholders.email} autoComplete="email" />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.fields.message}</span>
            <Textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={messagePlaceholder}
              className="h-28 resize-none"
            />
          </label>

          <div className="space-y-3 pt-1">
            <Button type="submit" className="landing-btn landing-btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : submitLabel}
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
