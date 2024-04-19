import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { SESSION_COOKIE_NAME } from './constants';
import { localePrefix, locales } from './navigation';

const protectedRoutes = [/\/admin\/projects(.+)?/g, /\/admin\/gallery(.+)?/g, /\/admin\/blog(.+)?/g, /\/admin\/dashboard/g];

export default async function middleware(req: NextRequest) {
  // Protected routes, so there is the only language is english
  const path = req.nextUrl.pathname;
  const isAuthenticated = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isProtectedRoute = protectedRoutes.map((route) => path.match(route)).filter((match) => match).length > 0;

  if (!isAuthenticated && isProtectedRoute) {
    const absoluteURL = new URL('/', req.nextUrl.origin);

    // Redirect to login page
    return NextResponse.redirect(absoluteURL.toString());
  }

  // else If global routes, configure i18n
  return createMiddleware({
    // A list of all locales that are supported
    locales,
    localePrefix,

    // Used when no locale matches
    defaultLocale: 'en',
  })(req);
}

export const config = {
  matcher: [
    '/',
    '/(fr|en|jp)?/blog/(.+)?',
    '/(fr|en|jp)?/projects/(.+)?',
    '/(fr|en|jp)?/gallery/(.+)?',
    '/(fr|en|jp)?/not-found',
    '/(fr|en|jp)?/admin/(.+)?',
    '/(fr|en|jp)?/contact',
  ],
};
