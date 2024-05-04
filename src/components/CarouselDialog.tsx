'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import LazyImage from '@/components/LazyImage';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from './ui/button';

export default function CarouselDialog({ images }: { images: ImageMin[] }) {
  const [preview, setPreview] = useState<ImageMin | undefined>();

  const handlePrev = useCallback(() => {
    setPreview((prev) => images.find((img) => (prev!.id === 0 ? 0 : img.id === prev!.id - 1)));
  }, [images]);

  const handleNext = useCallback(() => {
    setPreview((prev) => images.find((img) => (prev!.id === images.length - 1 ? prev!.id : img.id === prev!.id + 1)));
  }, [images]);

  return (
    <Dialog>
      <Carousel className="w-[calc(100%-64px)] max-w-sm">
        <CarouselContent className="ml-1">
          {images.map(
            (img: ImageMin) =>
              img && (
                <DialogTrigger key={img.url} asChild>
                  <CarouselItem
                    onClick={() => setPreview(img)}
                    className="p-2 md:basis-1/2 lg:basis-1/3 flex justify-center items-center">
                    <Image
                      src={img.url}
                      className="object-contain w-52 max-h-48"
                      alt="img"
                      width="250"
                      height="100"
                      loading="lazy"
                    />
                  </CarouselItem>
                </DialogTrigger>
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {preview && (
        <DialogContent className="min-w-full sm:min-w-[90%] flex items-center">
          <Button disabled={preview.id === 0} className="w-10 p-2 rounded-full" variant="secondary" onClick={handlePrev}>
            <ChevronLeft />
          </Button>
          <LazyImage src={preview.url} className="object-contain max-h-[80dvh]" />
          <Button
            disabled={preview.id === images.length - 1}
            className="w-10 p-2 rounded-full"
            variant="secondary"
            onClick={handleNext}>
            <ChevronRight />
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}
