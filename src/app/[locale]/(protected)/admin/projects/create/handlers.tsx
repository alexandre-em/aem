import { redirect } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { ImageService, ProjectService } from '@/services';

export default function useHandler() {
  const { toast } = useToast();
  const [images, setImages] = useState<(File | null)[]>([]);
  const [formData, setFormData] = useState<Partial<ProjectType>>();
  const [imagesWithMin, setImagesWithMin] = useState<ImageMin[]>([]);

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (images.length + e.target.files!.length > 5)
        toast({ title: 'Invalid input', description: 'Please select up to 5 pictures max', variant: 'destructive' });

      if (e.target.files && e.target.files.length > 0) {
        setImages((prev) => (prev.length + e.target.files!.length < 6 ? [...prev, ...e.target.files!] : prev));
      }
    },
    [toast, images.length]
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
  }, [images, toast]);

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
      if (imagesWithMin.length !== images.length) {
        toast({ title: 'An error occurred...', description: 'Please refresh then try again', variant: 'destructive' });

        return;
      }

      const formDataWImages = { ...formData, images: imagesWithMin, createdAt: new Date() } as ProjectType;

      ProjectService.createProject(formDataWImages).then(({ id, error }) => {
        if (error) {
          toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
        } else {
          toast({ title: 'Project successfully added !', description: id });
          setFormData((prev) => ({ ...prev, id }));
        }
      });
    },
    [formData, imagesWithMin, toast]
  );

  // Success upload notification
  useEffect(() => {
    if (imagesWithMin.reduce((prev, curr) => prev && !!curr.url, true))
      toast({ title: 'Upload succeeded', description: `${imagesWithMin.length} pictures uploaded` });
  }, [imagesWithMin, toast]);

  // Redirect when the project is created
  useEffect(() => {
    if (formData?.id) {
      redirect(`/admin/projects/${formData.id}`);
    }
  }, [formData?.id]);

  return {
    images,
    handleChangeData,
    handleSelectImage,
    handleSubmit,
    handleSubmitImage,
  };
}
