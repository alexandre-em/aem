'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/navigation';
import { ProjectService } from '@/services';

import ImageUploader from '../../../_components/ImageUploader';

export default function CreateProject() {
  const router = useRouter();
  const [images, setImages] = useState<ImageMin[]>([]);
  const [formData, setFormData] = useState<Partial<ProjectType>>();

  const handleChangeData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Formatting to correct data type
    const value =
      e.target.id === 'dateStart' || e.target.id === 'dateEnd'
        ? new Date(e.target.value)
        : e.target.id === 'keywords'
          ? e.target.value.split(',')
          : e.target.value;

    setFormData((prev) => ({ ...prev, [e.target.id]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formDataWImages = { ...formData, images: images, createdAt: new Date() } as ProjectType;

      ProjectService.createOne(formDataWImages).then(({ id, error }) => {
        if (error) {
          toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
        } else {
          toast({ title: 'Project successfully added !', description: id, variant: 'success' });
          setFormData((prev) => ({ ...prev, id }));
        }
      });
    },
    [formData, images]
  );

  // Redirect when the project is created
  useEffect(() => {
    if (formData?.id) {
      router.push(`/admin/projects/${formData.id}`);
    }
  }, [formData?.id, router]);

  return (
    <main className="flex flex-col flex-wrap p-5">
      <ImageUploader onUpload={(images: ImageMin[]) => setImages(images)} />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Project&apos;s related information</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input type="text" id="title" onChange={handleChangeData} placeholder="Title" required />
            </div>
            <div className="flex flex-wrap">
              <div className="mt-2 mr-5">
                <Label htmlFor="dateStart">Start date *</Label>
                <Input type="date" id="dateStart" onChange={handleChangeData} placeholder="Start date" required />
              </div>
              <div className="mt-2">
                <Label htmlFor="dateEnd">End date</Label>
                <Input type="date" id="dateEnd" onChange={handleChangeData} placeholder="End date" />
              </div>
            </div>
            <div className="mt-2">
              <Label htmlFor="github">Github</Label>
              <Input type="text" id="github" onChange={handleChangeData} placeholder="https://github.com/example/test-projet" />
            </div>
            <div className="mt-2">
              <Label htmlFor="demo">Demo</Label>
              <Input type="text" id="demo" onChange={handleChangeData} placeholder="https://example.alexandre-em.fr" />
            </div>
            <div className="mt-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                type="text"
                id="keywords"
                onChange={handleChangeData}
                placeholder="Keywords: skills, tech, etc. separate with a comma ','"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Next</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
