import { notFound } from 'next/navigation';
import React from 'react';

import LazyImage from '@/components/LazyImage';
import MarkdownReader from '@/components/MarkdownReader';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { ProjectService, formatDate } from '@/services';

import ButtonGroup from './_components/ButtonGroup';

export default async function ProjectId({ params: { id } }: IdParamsType) {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result, error } = await ProjectService.getById(id);

  if (!result) return 'Loading...';
  // TODO: Manage error
  if (error) return <p>Error</p>;
  if (!result?.data()) return notFound();

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">{result.data()!.title}</h1>
          <p className="text-muted-foreground text-sm">
            {formatDate(new Date(result.data()!.dateStart.seconds * 1000))} -{' '}
            {result.data()?.dateEnd ? formatDate(new Date(result.data()!.dateEnd.seconds * 1000)) : 'now'}
          </p>
        </div>

        <ButtonGroup github={result.data()?.github} demo={result.data()?.demo} />
      </div>

      <div className="mt-2">
        {result.data()!.keywords.map((k: string, i: number) => (
          <Badge className="m-2 uppercase text-muted" key={`${k}-${i}`}>
            {k}
          </Badge>
        ))}
      </div>

      <Separator className="mt-1 mb-1" />
      <h2 className="text-xl font-extrabold mb-2">Screenshot</h2>
      <div className="flex justify-center">
        {result.data()!.images.length > 0 && (
          <Carousel className="w-[calc(100%-64px)] max-w-sm">
            <CarouselContent className="-ml-1">
              {result
                .data()!
                .images.toSorted((a: ImageMin, b: ImageMin) => a.id - b.id)
                .map(
                  (img: ImageMin) =>
                    img && (
                      <CarouselItem key={img.url} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="m-1 p-1 flex justify-center items-center h-full">
                          <LazyImage src={img.url} className="object-contain w-52 max-h-48" />
                        </div>
                      </CarouselItem>
                    )
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>

      <Separator className="mt-2 mb-1" />
      <div className="flex justify-center">
        <MarkdownReader className="max-w-[640px]" content={result.data()!.content} />
      </div>
    </main>
  );
}
