import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import EntityTable from '@/components/ui/EntityTable';
import { ProjectService } from '@/services';

export default async function ProjectDashboard({ searchParams: { limit } }: IdParamsType) {
  const { result } = await ProjectService.getAll(parseInt(limit as string), undefined, { value: 'dateStart', order: 'desc' });

  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-black">Projects Dashboard</h1>
        <Link href="/admin/projects/create">
          <Button>Add project</Button>
        </Link>
      </div>

      {result && result.size > 0 ? (
        <EntityTable
          type="projects"
          entities={
            result?.docs.map((doc) => ({
              ...doc.data(),
              dateStart: new Date(doc.data().dateStart.seconds * 1000),
              createdAt: new Date(doc.data().createdAt.seconds * 1000),
              id: doc.id,
            })) as ProjectType[]
          }
        />
      ) : (
        <h2 className="self-center mt-20">No projects have been added yet</h2>
      )}
    </main>
  );
}
