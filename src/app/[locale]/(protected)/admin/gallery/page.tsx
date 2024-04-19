import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { GalleryService } from '@/services';

import EntityTable from '../../_components/EntityTable';

export default async function GalleryDashboard({
  searchParams: { limit = '10', after = undefined, before = undefined },
}: IdParamsType) {
  const { result } = await GalleryService.getAll(parseInt(limit as string), { after, before }, { value: 'date', order: 'desc' });

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-black">Gallery Dashboard</h1>
        <Link href="/admin/gallery/create" className={buttonVariants()}>
          Add photo
        </Link>
      </div>

      <div className="self-end my-5">
        <LimitSelect />
      </div>
      {result && result.size > 0 ? (
        <EntityTable
          type="gallery"
          entities={
            result?.docs.map((doc) => ({
              ...doc.data(),
              date: new Date(doc.data().date.seconds * 1000),
              createdAt: new Date(doc.data().createdAt.seconds * 1000),
              id: doc.id,
            })) as PhotoType[]
          }
        />
      ) : (
        <h2 className="self-center mt-20">No projects have been added yet</h2>
      )}
      <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
    </main>
  );
}
