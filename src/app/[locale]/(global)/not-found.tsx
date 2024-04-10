import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] flex flex-col justify-center items-center">
      <Image src="/images/not_found.svg" width="400" height="400" alt="not-found" />
      <h1 className="text-2xl font-black mt-8">{t('title')}</h1>
    </main>
  );
}
