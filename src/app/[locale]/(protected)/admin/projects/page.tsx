import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { ProjectService } from '@/services';

import EntityTable from '../../_components/EntityTable';

export default async function ProjectDashboard({
  searchParams: { limit = '10', after = undefined, before = undefined },
}: IdParamsType) {
  const { result } = await ProjectService.getAll(
    parseInt(limit as string),
    { after, before },
    { value: 'createdAt', order: 'desc' }
  );

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-black">Projects Dashboard</h1>
        <Link href="/admin/projects/create" className={buttonVariants()}>
          Add project
        </Link>
      </div>

      <div className="self-end my-5">
        <LimitSelect />
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
      <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
    </main>
  );
}
