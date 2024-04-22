import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import ContactForm from './_components/ContactForm';

export default function Contact({ params: { locale } }: LocaleParamsType) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Contact');

  const messages = {
    name: t('name'),
    email: t('email'),
    message: t('message'),
    submit: t('submit'),
  };

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <ContactForm messages={messages} />
      </Card>
    </main>
  );
}
