import { Inter as FontSans } from 'next/font/google';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import '../../globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/providers/theme.provider';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params: { locale } }: LocaleParamsType) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: 'A. Em',
    description: t('description'),
  };
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const locales = ['en', 'fr', 'jp'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: React.PropsWithChildren<LocaleParamsType>) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={cn('min-h-screen bg-primary-foreground font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar locale={locale} />
          {children}
          <Footer params={{ locale }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
