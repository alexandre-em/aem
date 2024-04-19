import React from 'react';

import LimitSelect from '@/components/LimitSelect';

export default function Blog() {
  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">Blog</h1>
          <p className="text-muted-foreground text-xs">
            This page will be updated soon
            <br /> Please come back later
          </p>
        </div>
        <LimitSelect />
      </div>
    </main>
  );
}
