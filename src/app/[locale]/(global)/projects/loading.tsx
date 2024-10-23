import { Loader } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default async function BlogLoading() {
  const t = await getTranslations('Projects');

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">{t('title')}</h1>
          <p className="text-muted-foreground text-md flex items-center">
            <Loader className="animate-spin mr-2" /> Loading...
          </p>
        </div>
      </div>
      <div className="flex flex-wrap w-full h-full">
        {Array.from(Array(9).keys()).map((i) => (
          <Skeleton key={`skeleton-${i}`} className="h-[166.6px] w-[250px] rounded-md m-2" />
        ))}
      </div>
    </main>
  );
}
