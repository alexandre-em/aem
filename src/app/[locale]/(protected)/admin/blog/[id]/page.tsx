'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/navigation';
import { BlogService } from '@/services';

import BlogForm from '../_component/BlogForm';

export default function CreateBlogPost({ params: { id } }: IdParamsType) {
  const router = useRouter();
  const [entity, setEntity] = useState<BlogType>();

  const handleSubmit = useCallback(
    (newEntity: BlogType) => {
      if (id) {
        BlogService.updateOne(id, newEntity).then(({ error }) => {
          if (error) {
            toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
          } else {
            toast({ title: 'Blog post successfully added !', description: id, variant: 'success' });
            router.push(`/admin/blog`);
          }
        });
      }
    },
    [id, router]
  );

  useEffect(() => {
    if (id) {
      BlogService.getById(id).then((res) => {
        if (res.error) {
          toast({ title: 'An error occured', description: 'Failed to fetch blog post data...', variant: 'destructive' });
        } else {
          const doc = res.result?.data() as BlogType;

          const dateFormattedProject = {
            ...doc,
            createdAt: new Date((doc.createdAt as unknown as FirebaseDateType).seconds * 1000),
          };

          setEntity(dateFormattedProject);
        }
      });
    }
  }, [id]);

  if (!entity) return <h1>Loading...</h1>;

  return <BlogForm entity={entity} onSubmit={handleSubmit} />;
}
