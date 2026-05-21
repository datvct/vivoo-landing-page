import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/login";
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

const PUBLIC_FILE = /\.(.*)$/;

function isPublicPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  );
}

function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  // Admin auth (unchanged)
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (pathname === LOGIN_PATH) {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get("vivoo_access_token")?.value;
    const refreshToken = request.cookies.get("vivoo_refresh_token")?.value;

    if (accessToken || refreshToken) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const pathnameLocale = getLocaleFromPathname(pathname);

  if (!pathnameLocale) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
    const url = request.nextUrl.clone();
    url.pathname = localizedPath(pathname, locale);
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
