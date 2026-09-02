import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";
import { consumeRateLimit } from "@/lib/rate-limit";
import { landingData } from "@/lib/landing-data";
import { PUBLIC_LOCALE_LABELS, type Locale, type PublicLocale } from "@/lib/locale";

export const runtime = "nodejs";

const payloadSchema = z.object({
  locale: z.enum(["en", "uk", "sk", "de", "pl"]),
  entryPoint: z.enum(["header", "hero", "footer", "catalog"]),
  sourceLabel: z.string().trim().max(120).optional(),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(4000),
});

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 20 * 60 * 1000;

function getClientIp(forwardedFor: string | null, realIp: string | null): string {
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function oneLine(value: string): string {
  return value.replaceAll(/\s*\r?\n\s*/g, " ").trim();
}

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  from: string;
  auth?: {
    user: string;
    pass: string;
  };
};

function formatLanguageTag(locale: Locale): string {
  const label =
    locale in PUBLIC_LOCALE_LABELS
      ? PUBLIC_LOCALE_LABELS[locale as PublicLocale]
      : locale === "uk"
        ? "Українська"
        : locale;
  return `${label} (${locale})`;
}

function parseSmtpConfig():
  | { config: SmtpConfig }
  | {
      error: string;
    } {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureRaw === "1" || secureRaw === "true" || secureRaw === "yes";
  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : secure ? 465 : 587;

  if (!host) return { error: "SMTP host is not configured (SMTP_HOST)" };
  if (!Number.isFinite(port)) return { error: "SMTP port is invalid (SMTP_PORT)" };
  if (!from) return { error: "SMTP sender is not configured (SMTP_FROM)" };

  // Gmail SMTP always requires auth; without App Password requests will fail with 530/EAUTH.
  if (host.toLowerCase().includes("gmail.com") && (!user || !pass)) {
    return { error: "SMTP auth is not configured. Set SMTP_USER and SMTP_PASS (Gmail App Password)." };
  }

  if ((user && !pass) || (!user && pass)) {
    return { error: "SMTP credentials are incomplete. Set both SMTP_USER and SMTP_PASS." };
  }

  return {
    config: {
      host,
      port,
      secure,
      from,
      auth: user && pass ? { user, pass } : undefined,
    },
  };
}

function parseRecipientList(value: string | undefined): string[] {
  return (value ?? "")
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueEmails(emails: string[]): string[] {
  const seen = new Set<string>();
  return emails.filter((email) => {
    const normalized = email.toLowerCase();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function resolveRecipientEmails() {
  return uniqueEmails([
    ...parseRecipientList(process.env.CTA_RECEIVER_EMAIL),
    landingData.contact.email.trim(),
  ]).filter(Boolean);
}

function resolveFormSubmitEndpoint(recipientEmail: string): string {
  const customEndpoint = process.env.CTA_FORMSUBMIT_ENDPOINT?.trim();
  if (customEndpoint) return customEndpoint;
  return `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`;
}

async function sendWithFormSubmit(params: {
  endpoint: string;
  origin?: string;
  referer?: string;
  source: string;
  locale: Locale;
  name: string;
  phone: string;
  email: string;
  message: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
  subject: string;
}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (params.origin) headers.Origin = params.origin;
  if (params.referer) headers.Referer = params.referer;

  const response = await fetch(params.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: params.name,
      phone: params.phone,
      email: params.email || "",
      message: [
        `Source: ${params.source}`,
        `Language: ${formatLanguageTag(params.locale)}`,
        `Submitted at: ${params.submittedAt}`,
        "",
        params.message,
        "",
        `IP: ${params.ip}`,
        `User-Agent: ${params.userAgent}`,
      ].join("\n"),
      _subject: params.subject,
      _template: "table",
      _captcha: "false",
      _replyto: params.email || undefined,
    }),
  });

  const raw = await response.text();
  const lower = raw.toLowerCase();
  let parsedMessage = "";
  let parsedSuccess = true;
  try {
    const parsed = JSON.parse(raw) as { success?: string | boolean; message?: string };
    parsedMessage = parsed.message?.trim() || "";
    if (typeof parsed.success === "boolean") {
      parsedSuccess = parsed.success;
    } else if (typeof parsed.success === "string") {
      parsedSuccess = parsed.success.toLowerCase() === "true";
    }
  } catch {
    // ignore parse errors and fallback to raw text checks below
  }

  const activationRequired =
    lower.includes("confirm") ||
    lower.includes("activate") ||
    lower.includes("activation") ||
    lower.includes("verification");

  if (!response.ok || !parsedSuccess) {
    return {
      ok: false as const,
      activationRequired,
      error:
        parsedMessage ||
        raw ||
        `FormSubmit request failed with status ${response.status}`,
    };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const payload = parsed.data;
    const email = payload.email.trim();
    const phone = payload.phone ? payload.phone.trim() : "";

    const reqHeaders = await headers();
    const ip = getClientIp(reqHeaders.get("x-forwarded-for"), reqHeaders.get("x-real-ip"));
    const userAgent = reqHeaders.get("user-agent")?.trim() || "unknown";
    const requestUrl = new URL(request.url);
    const forwardedProto = reqHeaders.get("x-forwarded-proto")?.trim();
    const origin = forwardedProto
      ? `${forwardedProto}://${requestUrl.host}`
      : requestUrl.origin;
    const referer = reqHeaders.get("referer")?.trim() || `${origin}/`;

    const ipLimit = consumeRateLimit({
      key: `cta:ip:${ip}`,
      maxAttempts: MAX_ATTEMPTS,
      windowMs: WINDOW_MS,
      blockMs: BLOCK_MS,
    });

    const identity = (email || phone).toLowerCase().slice(0, 255);
    const identityLimit = consumeRateLimit({
      key: `cta:identity:${identity}:${ip}`,
      maxAttempts: MAX_ATTEMPTS,
      windowMs: WINDOW_MS,
      blockMs: BLOCK_MS,
    });

    if (!ipLimit.allowed || !identityLimit.allowed) {
      const retryAfter = Math.max(ipLimit.retryAfterSeconds, identityLimit.retryAfterSeconds, 60);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const recipients = resolveRecipientEmails();
    if (recipients.length === 0) {
      return NextResponse.json({ error: "Recipient email is not configured" }, { status: 503 });
    }

    const source = payload.sourceLabel?.trim() || payload.entryPoint;
    const safeName = oneLine(payload.name);
    const safePhone = oneLine(phone || "-");
    const safeEmail = oneLine(email || "-");
    const safeMessage = payload.message.trim();
    const createdAt = new Date().toISOString();

    const subject = `CTA request (${source}) - ${safeName}`;
    const language = formatLanguageTag(payload.locale);
    const text = [
      "New request from landing CTA form",
      "",
      `Source: ${source}`,
      `Language: ${language}`,
      `Name: ${safeName}`,
      `Phone: ${safePhone}`,
      `Email: ${safeEmail}`,
      `Submitted at: ${createdAt}`,
      "",
      "Message:",
      safeMessage,
      "",
      `IP: ${ip}`,
      `User-Agent: ${userAgent}`,
    ].join("\n");

    const html = `
      <h2>New request from landing CTA form</h2>
      <p><b>Source:</b> ${escapeHtml(source)}</p>
      <p><b>Language:</b> ${escapeHtml(language)}</p>
      <p><b>Name:</b> ${escapeHtml(safeName)}</p>
      <p><b>Phone:</b> ${escapeHtml(safePhone)}</p>
      <p><b>Email:</b> ${escapeHtml(safeEmail)}</p>
      <p><b>Submitted at:</b> ${escapeHtml(createdAt)}</p>
      <p><b>Message:</b><br/>${escapeHtml(safeMessage).replaceAll("\n", "<br/>")}</p>
      <hr />
      <p><b>IP:</b> ${escapeHtml(ip)}</p>
      <p><b>User-Agent:</b> ${escapeHtml(userAgent)}</p>
    `;

    const smtpResult = parseSmtpConfig();
    if (!("error" in smtpResult)) {
      const smtp = smtpResult.config;
      const transport = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: smtp.auth,
      });

      try {
        await transport.verify();
        await transport.sendMail({
          from: smtp.from,
          to: recipients,
          replyTo: email || undefined,
          subject,
          text,
          html,
        });
        return NextResponse.json({ success: true, provider: "smtp" });
      } catch (error) {
        const err = error as NodeJS.ErrnoException & {
          responseCode?: number;
          response?: string;
          command?: string;
        };
        console.error("CTA SMTP send failed, fallback to FormSubmit", {
          code: err.code,
          responseCode: err.responseCode,
          command: err.command,
          message: err.message,
          response: err.response,
        });
      }
    } else {
      console.warn("CTA SMTP is unavailable, fallback to FormSubmit", smtpResult.error);
    }

    try {
      const formSubmitResults = await Promise.all(
        recipients.map((recipient) =>
          sendWithFormSubmit({
            endpoint: resolveFormSubmitEndpoint(recipient),
            origin,
            referer,
            source,
            locale: payload.locale,
            name: safeName,
            phone: safePhone,
            email,
            message: safeMessage,
            submittedAt: createdAt,
            ip,
            userAgent,
            subject,
          })
        )
      );

      const failedResult = formSubmitResults.find((result) => !result.ok);
      if (failedResult && !failedResult.ok) {
        console.error("CTA FormSubmit failed", failedResult.error);
        if (failedResult.activationRequired) {
          return NextResponse.json(
            { error: "FormSubmit requires one-time activation for the configured recipient inbox." },
            { status: 503 }
          );
        }

        return NextResponse.json({ error: "Email provider error. Please try again later." }, { status: 502 });
      }

      return NextResponse.json({ success: true, provider: "formsubmit" });
    } catch (error) {
      console.error("CTA FormSubmit fallback failed", error);
      return NextResponse.json({ error: "Email provider error. Please try again later." }, { status: 502 });
    }
  } catch (error) {
    console.error("CTA request handler failed", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
