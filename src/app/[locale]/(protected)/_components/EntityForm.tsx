'use client';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import ImageUploader from './ImageUploader';

export default function EntityForm({ entity, onSubmit }: { entity?: EntityType; onSubmit: (content: EntityType) => void }) {
  const [images, setImages] = useState<ImageMin[]>([]);
  const [formData, setFormData] = useState<Partial<ProjectType>>({ ...entity });

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

      onSubmit(formDataWImages);
    },
    [formData, images, onSubmit]
  );

  return (
    <main className="flex flex-col flex-wrap p-5">
      <h1 className="text-3xl font-black mb-5">Add a project</h1>
      <ImageUploader
        uploadedImages={formData.images}
        onUpload={(images: ImageMin[]) => setImages((prev) => [...prev, ...images])}
        onDelete={(image: ImageMin) => setImages((prev) => prev.filter((img) => img.id !== image.id))}
      />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Project&apos;s related information</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input type="text" id="title" value={formData.title} onChange={handleChangeData} placeholder="Title" required />
            </div>
            <div className="flex flex-wrap">
              <div className="mt-2 mr-5">
                <Label htmlFor="dateStart">Start date *</Label>
                <Input
                  type="date"
                  id="dateStart"
                  onChange={handleChangeData}
                  value={formData.dateStart?.toISOString().split('T')[0]}
                  placeholder="Start date"
                  required
                />
              </div>
              <div className="mt-2">
                <Label htmlFor="dateEnd">End date</Label>
                <Input
                  type="date"
                  id="dateEnd"
                  value={formData.dateEnd?.toISOString().split('T')[0]}
                  onChange={handleChangeData}
                  placeholder="End date"
                />
              </div>
            </div>
            <div className="mt-2">
              <Label htmlFor="github">Github</Label>
              <Input
                type="text"
                id="github"
                value={formData.github}
                onChange={handleChangeData}
                placeholder="https://github.com/example/test-projet"
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="demo">Demo</Label>
              <Input
                type="text"
                id="demo"
                value={formData.demo}
                onChange={handleChangeData}
                placeholder="https://example.alexandre-em.fr"
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                type="text"
                id="keywords"
                value={formData.keywords?.join(',')}
                onChange={handleChangeData}
                placeholder="Keywords: skills, tech, etc. separate with a comma ','"
              />
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
