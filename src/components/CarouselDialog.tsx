'use client';
import React, { useState } from 'react';

import LazyImage from '@/components/LazyImage';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function CarouselDialog({ images }: { images: ImageMin[] }) {
  const [preview, setPreview] = useState('');

  return (
    <Dialog>
      <Carousel className="w-[calc(100%-64px)] max-w-sm">
        <CarouselContent className="-ml-1">
          {images.map(
            (img: ImageMin) =>
              img && (
                <DialogTrigger key={img.url} asChild>
                  <CarouselItem
                    onClick={() => setPreview(img.url)}
                    className="p-2 md:basis-1/2 lg:basis-1/3 flex justify-center items-center">
                    <LazyImage src={img.url} className="object-contain w-52 max-h-48" />
                  </CarouselItem>
                </DialogTrigger>
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <DialogContent className="w-[40dvw] max-w-[1000px] max-h-[80dvh]">
        <LazyImage src={preview} className="w-full" />
      </DialogContent>
    </Dialog>
  );
}
