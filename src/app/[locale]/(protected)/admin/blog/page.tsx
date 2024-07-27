import Link from 'next/link';
import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import { buttonVariants } from '@/components/ui/button';
import { BlogService } from '@/services';

import EntityTable from '../../_components/EntityTable';

export default async function BlogDashboard({
  searchParams: { limit = '10', after = undefined, before = undefined },
}: IdParamsType) {
  const { result } = await BlogService.getAll(
    parseInt(limit as string),
    { after, before },
    { value: 'createdAt', order: 'desc' }
  );

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-black">Blog Dashboard</h1>
        <Link href="/admin/blog/create" className={buttonVariants()}>
          Add post
        </Link>
      </div>
      <div className="self-end my-5">
        <LimitSelect />
      </div>
      {result && result.size > 0 ? (
        <EntityTable
          type="blog"
          entities={
            result?.docs.map((doc) => ({
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.seconds * 1000),
              id: doc.id,
            })) as BlogType[]
          }
        />
      ) : (
        <h2 className="self-center mt-20">No projects have been added yet</h2>
      )}
      <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
    </main>
  );
}
