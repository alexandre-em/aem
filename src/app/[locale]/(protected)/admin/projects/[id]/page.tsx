'use client';
import { redirect } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { ProjectService } from '@/services';

import UpdateEntityPost from '../../../_components/UpdateEntityPost';

export default function UpdateProjectPost({ params: { id } }: IdParamsType) {
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectType>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (content: string) => {
      if (content) {
        ProjectService.updateProject(id, {
          content,
        }).then(() => {
          toast({ title: 'Project successfully updated!' });
          setIsUpdated(true);
        });
      } else {
        toast({ variant: 'destructive', title: 'An error occurred...', description: 'Please, try again later.' });
      }
    },
    [id, toast]
  );

  useEffect(() => {
    if (id) {
      ProjectService.getById(id).then((res) => {
        if (res.error) {
          toast({ title: 'An error occured', description: 'Failed to fetch project data...', variant: 'destructive' });
        } else setProject(res.result?.data() as ProjectType);
      });
    }
  }, [id, toast]);

  useEffect(() => {
    if (isUpdated) {
      redirect('/admin/projects');
    }
  }, [isUpdated]);

  if (!project) return <h1>Loading...</h1>;

  return <UpdateEntityPost entity={project} onSubmit={handleSubmit} />;
}
