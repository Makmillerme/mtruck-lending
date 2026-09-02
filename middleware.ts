import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_HEADER, localeFromPathSegment } from "@/lib/locale-path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first === "en") {
    const url = request.nextUrl.clone();
    const rest = segments.slice(1).join("/");
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    const response = NextResponse.rewrite(url);
    response.headers.set(LOCALE_HEADER, "en");
    return response;
  }

  const locale = first ? localeFromPathSegment(first) : null;
  if (locale && locale !== "en") {
    const response = NextResponse.next();
    response.headers.set(LOCALE_HEADER, locale);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
