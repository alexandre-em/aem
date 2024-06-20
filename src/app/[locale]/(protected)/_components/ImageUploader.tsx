'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ImageService } from '@/services';

function CarouselImage({ url, onDelete }: { url: string; onDelete: () => void }) {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
      <div className="p-1 flex justify-center items-center h-full relative">
        <div className="absolute flex justify-end w-full h-full text-white">
          <Button className="m-2 w-10 rounded-full" variant="destructive" onClick={onDelete}>
            <Trash />
          </Button>
        </div>
        <Image src={url} alt="img" width="200" height="200" className="m-2 object-contain max-h-[250px]" loading="lazy" />
      </div>
    </CarouselItem>
  );
}

export default function ImageUploader({
  onDelete,
  onUpload,
  uploadedImages,
}: {
  onDelete: (image: ImageMin) => void;
  onUpload: (imins: ImageMin[]) => void;
  uploadedImages?: ImageMin[];
}) {
  const [images, setImages] = useState<(File | null)[]>([]);

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (images.length + e.target.files!.length + (uploadedImages?.length || 0) > 6) {
        toast({ title: 'Invalid input', description: 'Please select up to 5 pictures max', variant: 'destructive' });

        return;
      }

      if (e.target.files && e.target.files.length > 0) {
        setImages((prev) =>
          prev.length + e.target.files!.length < 6
            ? [...prev, ...new Array(e.target.files!.length).fill(null).map((_, i) => e.target.files!.item(i))]
            : prev
        );
      }
    },
    [images.length, uploadedImages?.length]
  );

  const handleSubmitImage = useCallback(async () => {
    const imageWithMinPromises = images.map((img: File | null, id: number) => {
      if (!img) return;

      return ImageService.uploadImageWithMiniature(img, id);
    });

    const promisesResult = await Promise.allSettled(imageWithMinPromises);
    const isInvalid = promisesResult.find((promise) => promise.status === 'rejected');

    if (isInvalid) {
      toast({ title: 'Upload failed', variant: 'destructive' });
      return;
    }

    const imagesUploaded = promisesResult
      .map((p) => (p.status === 'fulfilled' ? (p.value instanceof Error ? undefined : p.value) : undefined))
      .filter((img) => img);

    onUpload(imagesUploaded as ImageMin[]);
    toast({ title: 'Upload succeeded', description: `${imagesUploaded.length} pictures uploaded`, variant: 'success' });
    setImages([]);
  }, [images, onUpload]);

  const handleDeleteImage = useCallback((img: File | null) => {
    if (img) {
      setImages((prev) => prev.filter((file) => file !== img));
    }
  }, []);

  const handleDeleteUploadedImage = useCallback(
    (img: ImageMin) => {
      if (img) {
        ImageService.deleteImageWithMiniature(img.url)
          .then(() => {
            onDelete(img);
          })
          .catch((err) => {
            toast({ title: 'Error occurred while delete image', description: err, variant: 'destructive' });
          });
      }
    },
    [onDelete]
  );

  return (
    <Card className="h-fit mb-5">
      <CardHeader>
        <CardTitle>Upload pictures</CardTitle>
        <CardDescription>you can select up to 5 pictures maximum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {(images.length > 0 || uploadedImages) && (
            <Carousel className="w-[calc(100%-64px)] h-[300px] max-w-sm">
              <CarouselContent className="ml-1">
                {uploadedImages &&
                  uploadedImages.map(
                    (img: ImageMin, i) =>
                      img && <CarouselImage key={img.url + i} url={img.url} onDelete={() => handleDeleteUploadedImage(img)} />
                  )}
                {images.map(
                  (img: File | null, i) =>
                    img && (
                      <CarouselImage key={img.name + i} url={URL.createObjectURL(img)} onDelete={() => handleDeleteImage(img)} />
                    )
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>

        <Label htmlFor="picture">Pictures</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          multiple
          onChange={handleSelectImage}
          disabled={(uploadedImages?.length || 0) + images.length > 5}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmitImage} disabled={images.length < 1 || (uploadedImages && uploadedImages?.length > 5)}>
          Upload picture{images.length > 0 ? 's' : ''}
        </Button>
      </CardFooter>
    </Card>
  );
}
