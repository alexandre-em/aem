'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/navigation';
import { GalleryService, ImageService } from '@/services';

export default function CreateGallery() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<Partial<PhotoType>>();

  const handleSelectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files!.item(0));
    }
  }, []);

  const handleChangeData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Formatting to correct data type
    const value = e.target.id === 'date' ? new Date(e.target.value) : e.target.value;

    setFormData((prev) => ({ ...prev, [e.target.id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!image) {
        toast({ title: 'An error occurred...', description: 'Please add a photo', variant: 'destructive' });
      }

      const newImageWithMin = await ImageService.uploadImageWithMiniature(image!, 0);

      if (newImageWithMin instanceof Error) {
        toast({ title: 'Upload failed', variant: 'destructive' });
        return;
      }
      const formDataWImages = { ...formData, image: newImageWithMin, createdAt: new Date(), comments: [] } as PhotoType;

      GalleryService.createOne(formDataWImages).then(({ id, error }) => {
        if (error) {
          toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
        } else {
          toast({ title: 'Photo successfully added !', description: id, variant: 'success' });
          setFormData((prev) => ({ ...prev, id }));
        }
      });
    },
    [formData, image]
  );

  // Redirect when the project is created
  useEffect(() => {
    if (formData?.id) {
      router.push('/admin/gallery');
    }
  }, [formData?.id, router]);

  return (
    <main className="flex flex-col flex-wrap p-5">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Photo&apos;s related information</CardDescription>
          </CardHeader>
          <CardContent>
            {image && (
              <Image src={URL.createObjectURL(image)} alt="img" width="200" height="200" className="m-2 object-contain" />
            )}
            <div className="mb-2">
              <Label htmlFor="picture">Picture *</Label>
              <Input id="picture" type="file" accept="image/*" multiple onChange={handleSelectImage} />
            </div>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input type="text" id="title" onChange={handleChangeData} placeholder="Title" required />
            </div>
            <div className="mt-2 mr-5">
              <Label htmlFor="date">Date *</Label>
              <Input type="date" id="date" onChange={handleChangeData} placeholder="Date" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
