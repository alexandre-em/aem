'use client';
import { redirect } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ProjectService } from '@/services';

export default function UpdateProjectPost({ params: { id } }: IdParamsType) {
  const editRef = useRef<{ content: string; setContent: React.Dispatch<React.SetStateAction<string>> }>();
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectType>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    if (editRef.current?.content) {
      ProjectService.updateProject(id, {
        content: editRef.current.content,
      }).then(() => {
        toast({ title: 'Project successfully updated!' });
        setIsUpdated(true);
      });
    } else {
      toast({ variant: 'destructive', title: 'An error occurred...', description: 'Please, try again later.' });
    }
  }, [editRef, id, toast]);

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

  useEffect(() => {
    if (editRef && project?.content) {
      editRef.current?.setContent(project.content);
    }
  }, [editRef, project?.content]);

  return (
    <main className="flex flex-col flex-wrap p-5 min-h-[calc(100dvh-57px)]">
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="text-3xl font-black mb-5">{project?.title}</h1>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <MarkdownEditor ref={editRef} />
    </main>
  );
}
