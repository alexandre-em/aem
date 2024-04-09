import createMiddleware from 'next-intl/middleware';

import { localePrefix, locales } from './navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix,

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/',
    '/(fr|en|jp)?/blog/(.+)?',
    '/(fr|en|jp)?/projects/(.+)?',
    '/(fr|en|jp)?/gallery',
    '/(fr|en|jp)?/not-found',
    '/admin/(.+)?',
    '/(fr|en|jp)?/contact',
  ],
};
