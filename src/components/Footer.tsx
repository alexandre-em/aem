import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';
import { Link } from '@/navigation';

import LazyImage from './LazyImage';
import { buttonVariants } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function Footer({ params: { locale } }: LocaleParamsType) {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full hidden xsm:block">
      <Card className="m-16 rounded-2xl flex justify-between items-center">
        <div className="flex items-center m-5">
          <LazyImage className="w-20 rounded-full" miniature="/images/photo_sm.jpg" src="/images/photo.jpg" />
          <CardHeader>
            <CardTitle>{t('name')}</CardTitle>
            <CardDescription>{t('job')}</CardDescription>
          </CardHeader>
        </div>
        <CardContent></CardContent>
        <CardFooter className="flex items-end">
          <Link
            href="/admin"
            locale="en"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mr-5 text-primary-foreground')}>
            Admin
          </Link>
          <Link href="/contact" locale={locale} className={cn(buttonVariants({}), 'ml-5')}>
            {t('contact')}
          </Link>
        </CardFooter>
      </Card>
    </footer>
  );
}
