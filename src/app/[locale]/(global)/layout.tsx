import { Inter as FontSans } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import '../../globals.css';

import { ThemeProvider } from '@/components/providers/theme.provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import Footer from './_components/Footer';
import Navbar from './_components/Navbar';

export async function generateMetadata({ params: { locale } }: LocaleParamsType) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: 'A. Em website',
    description: t('description'),
    keywords: [
      'fullstack',
      'developer',
      'front-end',
      'back-end',
      'Java',
      'React',
      'Next',
      'Node',
      'Nest',
      'Javascript',
      'Typescript',
    ],
    alternates: { canonical: 'https://alexandre-em.fr' },
    openGraph: {
      title: `A. Em's website`,
      description: t('description'),
      type: 'website',
      images:
        'https://storage.googleapis.com/alexandre-em.appspot.com/uploads/pictures/f0d1ab1c-c4d5-4522-999a-c2fd50e987ec/スクリーンショット 2024-04-18 16.43.50.png',
      url: 'https://alexandre-em.fr',
    },
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
  const t = useTranslations('Navbar');

  const messages = {
    projects: t('projects'),
    gallery: t('gallery'),
    blog: t('blog'),
    contact: t('contact'),
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-primary-foreground font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar locale={locale} messages={messages} />
          <div className="pt-[57px]">{children}</div>
          <Toaster />
          <Footer params={{ locale }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
