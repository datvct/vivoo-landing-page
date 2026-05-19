import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/login";

export function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  // Không phải admin
  if (
    !pathname.startsWith(ADMIN_PREFIX)
  ) {
    return NextResponse.next();
  }

  // Cho phép truy cập login
  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const accessToken =
    request.cookies.get(
      "vivoo_access_token"
    )?.value;

  const refreshToken =
    request.cookies.get(
      "vivoo_refresh_token"
    )?.value;

  // Có token => cho vào
  if (accessToken || refreshToken) {
    return NextResponse.next();
  }

  // Không có token => redirect login
  return NextResponse.redirect(
    new URL(LOGIN_PATH, request.url)
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};
