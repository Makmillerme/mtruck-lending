"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import { Pencil, Star, Trash2, LogOut, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminReviewsChrome } from "@/components/admin/admin-reviews-chrome";
import type { SiteReviewRecord, SiteReviewsSettings, SiteReviewStatus } from "@/lib/site-reviews";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["uk", "sk", "en", "de"];

const statusLabel: Record<SiteReviewStatus, string> = {
  approved: "Опубліковано",
  pending: "Очікує",
};

/** Fixed timezone so SSR (UTC container) and browser render the same string (avoids React #418). */
function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ReviewsAdminPanelProps {
  initialAuthenticated: boolean;
  initialReviews: SiteReviewRecord[];
  initialSettings: SiteReviewsSettings;
}

type SettingsToggleProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
};

function AdminSettingsSwitch({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: SettingsToggleProps) {
  return (
    <div className="admin-reviews-setting-row">
      <div className="admin-reviews-setting-copy">
        <label className="admin-reviews-setting-label" htmlFor={id}>
          {label}
        </label>
        <p className="admin-reviews-setting-desc">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn("admin-reviews-switch", checked && "admin-reviews-switch--on")}
        onClick={() => onCheckedChange(!checked)}
      >
        <span className="admin-reviews-switch-thumb" aria-hidden />
      </button>
    </div>
  );
}

type EditDraft = {
  locale: Locale;
  quote: string;
  author: string;
  company: string;
  rating: number;
  status: SiteReviewStatus;
};

export function ReviewsAdminPanel({
  initialAuthenticated,
  initialReviews,
  initialSettings,
}: ReviewsAdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [reviews, setReviews] = useState<SiteReviewRecord[]>(initialReviews);
  const [settings, setSettings] = useState<SiteReviewsSettings>(initialSettings);
  const [settingsSaving, setSettingsSaving] = useState<Partial<Record<keyof SiteReviewsSettings, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [editing, setEditing] = useState<SiteReviewRecord | null>(null);
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SiteReviewRecord | null>(null);

  const stats = useMemo(() => {
    const approved = reviews.filter((item) => item.status === "approved").length;
    const pending = reviews.filter((item) => item.status === "pending").length;
    return { total: reviews.length, approved, pending };
  }, [reviews]);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const response = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setReviews([]);
        return;
      }
      const data = (await response.json()) as {
        reviews?: SiteReviewRecord[];
        settings?: SiteReviewsSettings;
        error?: string;
      };
      if (!response.ok) {
        setListError(data.error || "Не вдалося завантажити відгуки");
        return;
      }
      setReviews(data.reviews ?? []);
      if (data.settings) setSettings(data.settings);
    } catch {
      setListError("Не вдалося завантажити відгуки");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const response = await fetch("/api/admin/reviews/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        if (response.status === 503) {
          setLoginError(
            data.error ||
              "На сервері не налаштовано REVIEWS_ADMIN_PASSWORD у .env (мін. 8 символів).",
          );
          return;
        }
        setLoginError(data.error || "Невірний пароль");
        return;
      }
      setAuthenticated(true);
      setPassword("");
      await loadReviews();
    } catch {
      setLoginError("Помилка входу");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/reviews/auth", { method: "DELETE" });
    setAuthenticated(false);
    setReviews([]);
    setEditing(null);
    setDraft(null);
    setDeleteTarget(null);
  };

  const openEdit = (review: SiteReviewRecord) => {
    setEditing(review);
    setDraft({
      locale: review.locale,
      quote: review.quote,
      author: review.author,
      company: review.company,
      rating: review.rating,
      status: review.status,
    });
    setSaveError("");
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing || !draft) return;

    setSaving(true);
    setSaveError("");
    try {
      const response = await fetch(`/api/admin/reviews/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as { review?: SiteReviewRecord; error?: string };
      if (!response.ok) {
        setSaveError(data.error || "Не вдалося зберегти");
        return;
      }
      if (data.review) {
        setReviews((prev) => prev.map((item) => (item.id === data.review!.id ? data.review! : item)));
      }
      setEditing(null);
      setDraft(null);
    } catch {
      setSaveError("Не вдалося зберегти");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const response = await fetch(`/api/admin/reviews/${deleteTarget.id}`, { method: "DELETE" });
      if (!response.ok) {
        setListError("Не вдалося видалити відгук");
        return;
      }
      setReviews((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setListError("Не вдалося видалити відгук");
    } finally {
      setDeletingId(null);
    }
  };

  const updateSetting = async (key: keyof SiteReviewsSettings, value: boolean) => {
    if (key === "allowSubmit" && value && !settings.showReviews) return;

    const previous = settings;
    const payload: Partial<SiteReviewsSettings> =
      key === "showReviews" && !value
        ? { showReviews: false, allowSubmit: false }
        : { [key]: value };
    const optimistic: SiteReviewsSettings =
      key === "showReviews" && !value
        ? { showReviews: false, allowSubmit: false }
        : { ...settings, [key]: value };

    setSettings(optimistic);
    setSettingsSaving((prev) => ({
      ...prev,
      [key]: true,
      ...(key === "showReviews" && !value ? { allowSubmit: true } : {}),
    }));
    try {
      const response = await fetch("/api/admin/reviews/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { settings?: SiteReviewsSettings; error?: string };
      if (!response.ok) {
        setSettings(previous);
        setListError(data.error || "Не вдалося оновити налаштування");
        return;
      }
      if (data.settings) setSettings(data.settings);
    } catch {
      setSettings(previous);
      setListError("Не вдалося оновити налаштування");
    } finally {
      setSettingsSaving((prev) => ({
        ...prev,
        [key]: false,
        ...(key === "showReviews" && !value ? { allowSubmit: false } : {}),
      }));
    }
  };

  const quickApprove = async (review: SiteReviewRecord) => {
    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    const data = (await response.json()) as { review?: SiteReviewRecord };
    if (response.ok && data.review) {
      setReviews((prev) => prev.map((item) => (item.id === data.review!.id ? data.review! : item)));
    }
  };

  if (!authenticated) {
    return (
      <AdminReviewsChrome>
        <main className="admin-reviews-login-main">
          <div className="admin-reviews-login-wrap">
            <div className="admin-reviews-login-card">
              <div className="admin-reviews-login-head">
                <span className="admin-reviews-login-badge">Службовий вхід</span>
                <h1 className="admin-reviews-login-title">
                  Керування <span className="chrome-gradient">відгуками</span>
                </h1>
                <p className="admin-reviews-login-desc">
                  Доступ лише для адміністратора сайту Expert Travel.
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2 text-left">
                  <label className="admin-reviews-label" htmlFor="admin-password">
                    Пароль
                  </label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    className="admin-reviews-field h-10"
                    required
                  />
                </div>
                {loginError ? <p className="text-sm text-destructive text-center">{loginError}</p> : null}
                <button
                  type="submit"
                  className="admin-reviews-btn admin-reviews-btn--primary admin-reviews-btn--block"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Вхід..." : "Увійти"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </AdminReviewsChrome>
    );
  }

  const logoutButton = (
    <button
      type="button"
      className="admin-reviews-btn admin-reviews-btn--ghost"
      onClick={() => void handleLogout()}
    >
      <LogOut className="h-4 w-4 shrink-0" aria-hidden />
      Вийти
    </button>
  );

  return (
    <AdminReviewsChrome headerActions={logoutButton}>
      <main className="admin-reviews-dashboard-main">
        <div className="landing-page-container admin-reviews-content">
          <header className="admin-reviews-page-head">
            <p className="admin-reviews-page-eyebrow">Модерація</p>
            <h1 className="admin-reviews-page-title">
              Відгуки на <span className="chrome-gradient">сайті</span>
            </h1>
            <p className="admin-reviews-page-desc">
              Редагування та видалення. Текст відгуків не перекладається — змінюється лише оригінал.
            </p>
          </header>

      <div className="admin-reviews-stats">
        <div className="admin-reviews-stat-card">
          <p className="admin-reviews-stat-value">{stats.total}</p>
          <p className="admin-reviews-stat-label">Всього</p>
        </div>
        <div className="admin-reviews-stat-card">
          <p className="admin-reviews-stat-value">{stats.approved}</p>
          <p className="admin-reviews-stat-label">Опубліковано</p>
        </div>
        <div className="admin-reviews-stat-card">
          <p className="admin-reviews-stat-value">{stats.pending}</p>
          <p className="admin-reviews-stat-label">Очікує</p>
        </div>
      </div>

      <section className="admin-reviews-settings-card" aria-labelledby="admin-reviews-settings-title">
        <h2 id="admin-reviews-settings-title" className="admin-reviews-settings-title">
          Відображення на сайті
        </h2>
        <p className="admin-reviews-settings-desc">
          Керує видимістю блоку відгуків і кнопки додавання на головній сторінці. Дані в JSON не видаляються.
        </p>
        <div className="admin-reviews-settings-list">
          <AdminSettingsSwitch
            id="admin-show-reviews"
            label="Показувати відгуки"
            description={
              settings.showReviews
                ? "Блок «Відгуки клієнтів» видно відвідувачам"
                : "Блок відгуків приховано на сайті"
            }
            checked={settings.showReviews}
            disabled={Boolean(settingsSaving.showReviews)}
            onCheckedChange={(value) => void updateSetting("showReviews", value)}
          />
          <AdminSettingsSwitch
            id="admin-allow-submit"
            label="Дозволити додавання відгуків"
            description={
              !settings.showReviews
                ? "Спочатку увімкніть показ відгуків на сайті"
                : settings.allowSubmit
                  ? "Кнопка «Залишити відгук» доступна на сайті"
                  : "Нові відгуки через сайт тимчасово вимкнено"
            }
            checked={settings.showReviews && settings.allowSubmit}
            disabled={!settings.showReviews || Boolean(settingsSaving.allowSubmit)}
            onCheckedChange={(value) => void updateSetting("allowSubmit", value)}
          />
        </div>
      </section>

      {listError ? <p className="mb-4 text-sm text-destructive">{listError}</p> : null}

      {loading ? (
        <div className="admin-reviews-skeleton-list" aria-hidden="true">
          <div className="admin-reviews-skeleton-row" />
          <div className="admin-reviews-skeleton-row" />
          <div className="admin-reviews-skeleton-row" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="admin-reviews-empty admin-reviews-empty-state">
          <div className="admin-reviews-empty-icon">
            <MessageSquare className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold text-cyan-50/95">Відгуків поки немає</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Коли з’являться відгуки на сайті, вони відобразяться тут і в блоці «Відгуки клієнтів» на головній.
          </p>
        </div>
      ) : (
        <ul className="admin-reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="admin-reviews-review-card">
              <div className="admin-reviews-review-grid">
                <div className="admin-reviews-review-main">
                  <div className="admin-reviews-review-meta">
                    <div className="admin-reviews-review-identity">
                      <span className="admin-reviews-review-author">{review.author}</span>
                      {review.company ? (
                        <span className="admin-reviews-review-company">{review.company}</span>
                      ) : null}
                    </div>
                    <div className="admin-reviews-review-badges">
                      <span
                        className={cn(
                          "admin-reviews-status-badge",
                          review.status === "approved"
                            ? "admin-reviews-status-badge--approved"
                            : "admin-reviews-status-badge--pending",
                        )}
                      >
                        {review.status === "approved" ? (
                          <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden />
                        ) : (
                          <Clock className="h-3 w-3 shrink-0" aria-hidden />
                        )}
                        {statusLabel[review.status]}
                      </span>
                      <span className="admin-reviews-locale-badge">{review.locale}</span>
                    </div>
                  </div>
                  <div className="admin-reviews-stars" aria-label={`Оцінка ${review.rating} з 5`}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={cn(
                          "h-3.5 w-3.5",
                          value <= review.rating ? "fill-cyan-400 text-cyan-400" : "text-muted-foreground/35",
                        )}
                      />
                    ))}
                  </div>
                  <p className="admin-reviews-review-quote">&ldquo;{review.quote}&rdquo;</p>
                  <time className="admin-reviews-review-date" dateTime={review.createdAt}>
                    {formatReviewDate(review.createdAt)}
                  </time>
                </div>
                <div className="admin-reviews-review-actions">
                  {review.status === "pending" ? (
                    <button
                      type="button"
                      className="admin-reviews-btn admin-reviews-btn--primary"
                      onClick={() => void quickApprove(review)}
                    >
                      Схвалити
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="admin-reviews-btn admin-reviews-btn--ghost"
                    onClick={() => openEdit(review)}
                  >
                    <Pencil className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Редагувати
                  </button>
                  <button
                    type="button"
                    className="admin-reviews-btn admin-reviews-btn--danger"
                    onClick={() => setDeleteTarget(review)}
                    disabled={deletingId === review.id}
                  >
                    <Trash2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Видалити
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={Boolean(editing && draft)}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null);
            setDraft(null);
            setSaveError("");
          }
        }}
      >
        <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
          <DialogTitle>Редагувати відгук</DialogTitle>
          <DialogDescription>Зміни зберігаються в JSON без перекладу тексту.</DialogDescription>
          {draft ? (
            <form className="mt-4 space-y-4" onSubmit={handleSave}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-status">
                  Статус
                </label>
                <select
                  id="edit-status"
                  className="admin-reviews-field flex h-10 w-full rounded-md border px-3 text-sm"
                  value={draft.status}
                  onChange={(event) =>
                    setDraft((prev) =>
                      prev ? { ...prev, status: event.target.value as SiteReviewStatus } : prev,
                    )
                  }
                >
                  <option value="approved">Опубліковано</option>
                  <option value="pending">Очікує модерації</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-locale">
                  Мова (метадані)
                </label>
                <select
                  id="edit-locale"
                  className="admin-reviews-field flex h-10 w-full rounded-md border px-3 text-sm"
                  value={draft.locale}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, locale: event.target.value as Locale } : prev))
                  }
                >
                  {LOCALES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-author">
                  Ім&apos;я
                </label>
                <Input
                  className="admin-reviews-field h-10"
                  id="edit-author"
                  value={draft.author}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, author: event.target.value } : prev))
                  }
                  required
                  maxLength={120}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-company">
                  Компанія
                </label>
                <Input
                  className="admin-reviews-field h-10"
                  id="edit-company"
                  value={draft.company}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, company: event.target.value } : prev))
                  }
                  maxLength={160}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Оцінка</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="rounded-md p-1 hover:bg-white/5"
                      onClick={() => setDraft((prev) => (prev ? { ...prev, rating: value } : prev))}
                      aria-label={`${value} / 5`}
                    >
                      <Star
                        className={cn(
                          "h-6 w-6",
                          value <= draft.rating ? "fill-cyan-400 text-cyan-400" : "text-muted-foreground",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-quote">
                  Текст відгуку
                </label>
                <Textarea
                  className="admin-reviews-field min-h-[140px]"
                  id="edit-quote"
                  value={draft.quote}
                  onChange={(event) =>
                    setDraft((prev) => (prev ? { ...prev, quote: event.target.value } : prev))
                  }
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={6}
                />
              </div>
              {saveError ? <p className="text-sm text-destructive">{saveError}</p> : null}
              <div className="flex gap-2">
                <button type="submit" className="admin-reviews-btn admin-reviews-btn--primary" disabled={saving}>
                  {saving ? "Збереження..." : "Зберегти"}
                </button>
                <button
                  type="button"
                  className="admin-reviews-btn admin-reviews-btn--ghost"
                  onClick={() => {
                    setEditing(null);
                    setDraft(null);
                  }}
                >
                  Скасувати
                </button>
              </div>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Видалити відгук?</DialogTitle>
          <DialogDescription>
            Відгук від {deleteTarget?.author} буде безповоротно видалений з файлу{" "}
            <code className="text-xs">data/site-reviews.json</code>.
          </DialogDescription>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="admin-reviews-btn admin-reviews-btn--danger"
              onClick={() => void handleDelete()}
              disabled={Boolean(deletingId)}
            >
              {deletingId ? "Видалення..." : "Так, видалити"}
            </button>
            <button
              type="button"
              className="admin-reviews-btn admin-reviews-btn--ghost"
              onClick={() => setDeleteTarget(null)}
            >
              Скасувати
            </button>
          </div>
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </AdminReviewsChrome>
  );
}
