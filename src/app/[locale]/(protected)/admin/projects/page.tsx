import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function ProjectDashboard() {
  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-black">Projects Dashboard</h1>
        <Link href="/admin/projects/create">
          <Button>Add project</Button>
        </Link>
      </div>
    </main>
  );
}
