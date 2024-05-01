'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ImageService } from '@/services';

export default function ImageUploader({ onUpload }: { onUpload: (imins: ImageMin[]) => void }) {
  const [images, setImages] = useState<(File | null)[]>([]);
  const [imagesWithMin, setImagesWithMin] = useState<ImageMin[]>([]);

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (images.length + e.target.files!.length > 5)
        toast({ title: 'Invalid input', description: 'Please select up to 5 pictures max', variant: 'destructive' });

      if (e.target.files && e.target.files.length > 0) {
        setImages((prev) =>
          prev.length + e.target.files!.length < 6
            ? [...prev, ...new Array(e.target.files!.length).fill(null).map((_, i) => e.target.files!.item(i))]
            : prev
        );
      }
    },
    [images.length]
  );

  const handleSubmitImage = useCallback(() => {
    images.forEach(async (img: File | null, id: number) => {
      if (!img) return;

      const newImageWithMin = await ImageService.uploadImageWithMiniature(img, id);

      if (newImageWithMin instanceof Error) {
        toast({ title: 'Upload failed', variant: 'destructive' });
        return;
      }

      setImagesWithMin((prev) => [...prev, newImageWithMin]);
    });
  }, [images]);

  // Success upload notification
  useEffect(() => {
    if (
      images.length !== 0 &&
      images.length === imagesWithMin.length &&
      imagesWithMin.reduce((prev, curr) => prev && !!curr.url, true)
    ) {
      onUpload(imagesWithMin);
      toast({ title: 'Upload succeeded', description: `${imagesWithMin.length} pictures uploaded` });
    }
  }, [images, imagesWithMin, onUpload]);

  return (
    <Card className="h-fit mb-5">
      <CardHeader>
        <CardTitle>Upload pictures</CardTitle>
        <CardDescription>you can select up to 5 pictures maximum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {images.length > 0 && (
            <Carousel className="w-[calc(100%-64px)] h-[300px] max-w-sm">
              <CarouselContent className="-ml-1">
                {images.map(
                  (img: File | null, i) =>
                    img && (
                      <CarouselItem key={`${img.name}_${i}`} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 flex justify-center items-center h-full">
                          <Image
                            src={URL.createObjectURL(img)}
                            alt="img"
                            width="200"
                            height="200"
                            className="m-2 object-contain"
                          />
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

        <Label htmlFor="picture">Pictures</Label>
        <Input id="picture" type="file" accept="image/*" multiple onChange={handleSelectImage} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmitImage} disabled={images.length < 1}>
          Upload picture{images.length > 0 ? 's' : ''}
        </Button>
      </CardFooter>
    </Card>
  );
}
