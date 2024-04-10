import React from 'react';

import { Button } from '@/components/ui/button';

export default function GalleryDashboard() {
  return (
    <main className="flex flex-col flex-wrap p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-black">Gallery Dashboard</h1>
        <Button>Add photo</Button>
      </div>
    </main>
  );
}
