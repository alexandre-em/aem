import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import LazyImage from './LazyImage';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function Footer({ params: { locale } }: LocaleParamsType) {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full hidden xsm:block">
      <Card className="m-16 rounded-2xl flex justify-between items-center">
        <div className="flex items-center m-5">
          <LazyImage className="bg-[url('/images/photo_sm.jpg')] w-20 rounded-full" src="/images/photo.jpg" />
          <CardHeader>
            <CardTitle>{t('name')}</CardTitle>
            <CardDescription>{t('job')}</CardDescription>
          </CardHeader>
        </div>
        <CardContent></CardContent>
        <CardFooter className="flex items-end">
          <Link href="/admin" locale="en">
            <Button variant="ghost" className="mr-5 text-primary-foreground">
              Admin
            </Button>
          </Link>
          <Link href="/contact" locale={locale}>
            <Button className="ml-5">{t('contact')}</Button>
          </Link>
        </CardFooter>
      </Card>
    </footer>
  );
}
