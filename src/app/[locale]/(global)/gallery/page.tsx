import { getTranslations } from 'next-intl/server';
import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LazyImage from '@/components/LazyImage';
import LimitSelect from '@/components/LimitSelect';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';
import { GalleryService, formatDate } from '@/services';

export default async function Gallery({ searchParams: { limit = '10', after = undefined, before = undefined } }: IdParamsType) {
  const t = await getTranslations('Gallery');
  const { result, totalDoc } = await GalleryService.getAll(
    parseInt(limit as string),
    { after, before },
    {
      value: 'date',
      order: 'desc',
    }
  );
  const photos: PhotoType[] = result?.docs.map((doc) => ({
    ...doc.data(),
    date: new Date(doc.data().date.seconds * 1000),
    createdAt: new Date(doc.data().createdAt.seconds * 1000),
    id: doc.id,
  })) as PhotoType[];

  if (result === undefined) return 'Loading...';

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">{t('title')}</h1>
          <p className="text-muted-foreground text-xs">{t('description')}</p>
        </div>
        <LimitSelect />
      </div>

      <div className="flex flex-wrap">
        {photos.map((photo) => (
          <Card key={photo.id} className="m-2">
            <Link href={`/gallery/${photo.id}`}>
              <CardContent className="p-2">
                <LazyImage src={photo.image.url} className="max-w-[250px]" />
              </CardContent>
              <CardFooter className="flex flex-col items-start max-w-[250px]">
                <h2 className="text-xl font-bold">{photo.title}</h2>
                <CardDescription className="text-xs">{formatDate(photo.date)}</CardDescription>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
      {totalDoc && Math.ceil(totalDoc / parseInt(limit)) > 1 && (
        <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
      )}
    </main>
  );
}
