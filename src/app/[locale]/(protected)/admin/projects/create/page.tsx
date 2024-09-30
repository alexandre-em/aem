'use client';
import React from 'react';

import { toast } from '@/components/ui/use-toast';
import { redis, redisKeys } from '@/lib/redis';
import { useRouter } from '@/navigation';
import { ProjectService } from '@/services';

import EntityForm from '../../../_components/EntityForm';

export default function CreateProject() {
  const router = useRouter();

  const handleSubmit = (entity: EntityType) => {
    ProjectService.createOne(entity as ProjectType).then(({ id, error }) => {
      if (error) {
        toast({ title: 'An error occurred...', description: 'There is an error while storing info', variant: 'destructive' });
      } else {
        toast({ title: 'Project successfully added !', description: id, variant: 'success' });
        redis.get(redisKeys.projects).then((val) => {
          const ids = (val as string)!.split(';');
          ids.push(id);
          redis.set(redisKeys.projects, ids.join(';'));
        });
        router.push(`/admin/projects/${id}/post`);
      }
    });
  };

  return <EntityForm onSubmit={handleSubmit} />;
}
