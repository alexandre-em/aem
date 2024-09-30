'use client';
import React from 'react';

import { toast } from '@/components/ui/use-toast';
import { redis, redisKeys } from '@/lib/redis';
import { useRouter } from '@/navigation';
import { BlogService } from '@/services';

import BlogForm from '../_component/BlogForm';

export default function CreateBlogPost() {
  const router = useRouter();

  const handleSubmit = (entity: BlogType) => {
    BlogService.createOne(entity).then(({ id, error }) => {
      if (error) {
        toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
      } else {
        toast({ title: 'Blog post successfully added !', description: id, variant: 'success' });
        redis.get(redisKeys.blog).then((val) => {
          const ids = (val as string)!.split(';');
          ids.push(id);
          redis.set(redisKeys.blog, ids.join(';'));
        });
        router.push(`/admin/blog`);
      }
    });
  };

  return <BlogForm onSubmit={handleSubmit} />;
}
