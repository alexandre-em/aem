'use client';
import React, { useEffect, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import { useToast } from '@/components/ui/use-toast';
import { ProjectService } from '@/services';

export default function UpdateProjectPost({ params: { id } }: IdParamsType) {
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectType>();

  useEffect(() => {
    if (id) {
      ProjectService.getById(id).then((res) => {
        if (res.error) {
          toast({ title: 'An error occured', description: 'Failed to fetch project data...', variant: 'destructive' });
        } else setProject(res.result?.data() as ProjectType);
      });
    }
  }, [id, toast]);

  return (
    <main className="flex flex-col flex-wrap p-5">
      <h1 className="text-3xl font-black mb-5">{project?.title}</h1>
      <MarkdownEditor />
    </main>
  );
}
