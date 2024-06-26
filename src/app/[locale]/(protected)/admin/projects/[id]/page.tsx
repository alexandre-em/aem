'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from '@/navigation';
import { ProjectService } from '@/services';

import EntityForm from '../../../_components/EntityForm';

export default function UpdateProjectPost({ params: { id } }: IdParamsType) {
  const { toast } = useToast();
  const router = useRouter();
  const [project, setProject] = useState<ProjectType>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (entity: EntityType) => {
      ProjectService.updateOne(id, entity)
        .then(() => {
          toast({ title: 'Project successfully updated!' });
          setIsUpdated(true);
        })
        .catch((err) => {
          toast({ variant: 'destructive', title: `An error occurred: ${err}`, description: 'Please, try again later.' });
        })
        .finally(() => {
          router.push('/admin/projects');
        });
    },
    [id, toast, router]
  );

  useEffect(() => {
    if (id) {
      ProjectService.getById(id).then((res) => {
        if (res.error) {
          toast({ title: 'An error occured', description: 'Failed to fetch project data...', variant: 'destructive' });
        } else {
          const doc = res.result?.data() as ProjectType;

          const dateFormattedProject = {
            ...doc,
            dateStart: new Date((doc.dateStart as unknown as FirebaseDateType).seconds * 1000),
            createdAt: new Date((doc.createdAt as unknown as FirebaseDateType).seconds * 1000),
          };

          if (doc.dateEnd) {
            dateFormattedProject.dateEnd = new Date((doc.dateEnd as unknown as FirebaseDateType).seconds * 1000);
          }

          setProject(dateFormattedProject);
        }
      });
    }
  }, [id, toast]);

  useEffect(() => {
    if (isUpdated) {
      router.push('/admin/projects');
    }
  }, [isUpdated, router]);

  if (!project) return <h1>Loading...</h1>;

  return <EntityForm entity={project} onSubmit={handleSubmit} />;
}
