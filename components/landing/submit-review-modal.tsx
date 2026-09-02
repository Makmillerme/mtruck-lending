"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/locale";
import type { SiteReviewPublic } from "@/lib/site-reviews";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    trigger: "Leave a review",
    title: "Share your experience",
    description:
      "Your review is saved in the language you write it in and shown to other visitors without translation.",
    fields: { author: "Your name", company: "Company (optional)", quote: "Your review", rating: "Rating" },
    placeholders: {
      author: "John Smith",
      company: "TransCargo s.r.o.",
      quote: "Tell others about your purchase or cooperation with Expert Travel...",
    },
    submit: "Publish review",
    submitting: "Publishing...",
    success: "Thank you! Your review has been published.",
    pending: "Thank you! Your review was received and will appear after moderation.",
    errorFallback: "Could not save your review. Please try again later.",
  },
  uk: {
    trigger: "Залишити відгук",
    title: "Поділіться досвідом",
    description:
      "Відгук зберігається мовою, якою ви його пишете, і показується іншим відвідувачам без перекладу.",
    fields: { author: "Ваше ім'я", company: "Компанія (необов'язково)", quote: "Ваш відгук", rating: "Оцінка" },
    placeholders: {
      author: "Іван Коваленко",
      company: "TransCargo s.r.o.",
      quote: "Розкажіть про покупку або співпрацю з Expert Travel...",
    },
    submit: "Опублікувати відгук",
    submitting: "Публікуємо...",
    success: "Дякуємо! Ваш відгук опубліковано.",
    pending: "Дякуємо! Відгук отримано — з’явиться після модерації.",
    errorFallback: "Не вдалося зберегти відгук. Спробуйте пізніше.",
  },
  sk: {
    trigger: "Pridať hodnotenie",
    title: "Podeľte sa o skúsenosť",
    description:
      "Hodnotenie sa uloží v jazyku, ktorým ho napíšete, a zobrazí sa návštevníkom bez prekladu.",
    fields: { author: "Vaše meno", company: "Firma (nepovinné)", quote: "Vaše hodnotenie", rating: "Hodnotenie" },
    placeholders: {
      author: "Ján Novák",
      company: "TransCargo s.r.o.",
      quote: "Opíšte nákup alebo spoluprácu s Expert Travel...",
    },
    submit: "Zverejniť hodnotenie",
    submitting: "Ukladáme...",
    success: "Ďakujeme! Hodnotenie bolo zverejnené.",
    pending: "Ďakujeme! Hodnotenie bolo prijaté — zobrazí sa po schválení.",
    errorFallback: "Hodnotenie sa nepodarilo uložiť. Skúste to neskôr.",
  },
  de: {
    trigger: "Bewertung abgeben",
    title: "Teilen Sie Ihre Erfahrung",
    description:
      "Ihre Bewertung wird in der Sprache gespeichert, in der Sie sie schreiben, und ohne Übersetzung angezeigt.",
    fields: { author: "Ihr Name", company: "Unternehmen (optional)", quote: "Ihre Bewertung", rating: "Bewertung" },
    placeholders: {
      author: "Max Mustermann",
      company: "TransCargo s.r.o.",
      quote: "Beschreiben Sie Ihren Kauf oder die Zusammenarbeit mit Expert Travel...",
    },
    submit: "Bewertung veröffentlichen",
    submitting: "Wird gespeichert...",
    success: "Vielen Dank! Ihre Bewertung wurde veröffentlicht.",
    pending: "Vielen Dank! Ihre Bewertung wurde empfangen und erscheint nach Freigabe.",
    errorFallback: "Bewertung konnte nicht gespeichert werden. Bitte später erneut versuchen.",
  },
  pl: {
    trigger: "Dodaj opinię",
    title: "Podziel się doświadczeniem",
    description:
      "Opinia jest zapisywana w języku, w którym ją piszesz, i wyświetlana innym odwiedzającym bez tłumaczenia.",
    fields: { author: "Twoje imię", company: "Firma (opcjonalnie)", quote: "Twoja opinia", rating: "Ocena" },
    placeholders: {
      author: "Jan Kowalski",
      company: "TransCargo s.r.o.",
      quote: "Opisz zakup lub współpracę z Expert Travel...",
    },
    submit: "Opublikuj opinię",
    submitting: "Publikowanie...",
    success: "Dziękujemy! Twoja opinia została opublikowana.",
    pending: "Dziękujemy! Opinia została przyjęta — pojawi się po moderacji.",
    errorFallback: "Nie udało się zapisać opinii. Spróbuj ponownie później.",
  },
} as const;

interface SubmitReviewModalProps {
  locale: Locale;
  onPublished: (review: SiteReviewPublic) => void;
  children?: ReactNode;
}

export function SubmitReviewModal({ locale, onPublished, children }: SubmitReviewModalProps) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setAuthor("");
    setCompany("");
    setQuote("");
    setRating(5);
    setWebsite("");
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          author,
          company,
          quote,
          rating,
          website,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        review?: SiteReviewPublic | null;
        status?: "approved" | "pending";
        error?: string;
      };

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.error || t.errorFallback);
        return;
      }

      if (data.review) {
        onPublished(data.review);
      }

      setStatus("success");
      setMessage(data.status === "pending" ? t.pending : t.success);
      window.setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 1400);
    } catch {
      setStatus("error");
      setMessage(t.errorFallback);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {children ?? (
          <Button type="button" className="landing-btn landing-btn-primary landing-btn--compact landing-btn-cta shrink-0">
            {t.trigger}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
        <DialogTitle>{t.title}</DialogTitle>
        <DialogDescription>{t.description}</DialogDescription>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="review-author">
              {t.fields.author}
            </label>
            <Input
              id="review-author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder={t.placeholders.author}
              required
              maxLength={120}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="review-company">
              {t.fields.company}
            </label>
            <Input
              id="review-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder={t.placeholders.company}
              maxLength={160}
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">{t.fields.rating}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="rounded-md p-1 transition-colors hover:bg-white/5"
                  onClick={() => setRating(value)}
                  aria-label={`${value} / 5`}
                >
                  <Star
                    className={cn(
                      "h-6 w-6",
                      value <= rating ? "fill-cyan-400 text-cyan-400" : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="review-quote">
              {t.fields.quote}
            </label>
            <Textarea
              id="review-quote"
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              placeholder={t.placeholders.quote}
              required
              minLength={20}
              maxLength={2000}
              rows={5}
            />
          </div>

          {message ? (
            <p
              className={cn(
                "text-sm",
                status === "error" ? "text-destructive" : "text-cyan-100/90",
              )}
              role="status"
            >
              {message}
            </p>
          ) : null}

          <Button type="submit" className="landing-btn landing-btn-primary w-full" disabled={status === "submitting"}>
            {status === "submitting" ? t.submitting : t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
