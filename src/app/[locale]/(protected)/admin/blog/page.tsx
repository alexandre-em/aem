import Link from 'next/link';
import React from 'react';

import { buttonVariants } from '@/components/ui/button';

export default function BlogDashboard() {
  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-black">Blog Dashboard</h1>
        <Link href="/admin/blog/create" className={buttonVariants()}>
          Add post
        </Link>
      </div>
    </main>
  );
}
