import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import LimitSelect from '@/components/LimitSelect';

export default async function Blog({ params: { locale } }: LocaleParamsType) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Blog');

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">{t('title')}</h1>
          <p className="text-muted-foreground text-xs">{t('description')}</p>
        </div>
        <LimitSelect />
      </div>
    </main>
  );
}
