'use client';
import { ExternalLink, Github } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function ButtonGroup({ github, demo }: { github?: string; demo?: string }) {
  return (
    <div className="flex mt-2">
      {github && (
        <a href={github}>
          <Button className="rounded-full w-[40px] p-2">
            <Github />
          </Button>
        </a>
      )}

      {demo && (
        <a href={demo}>
          <Button className="rounded-full w-[40px] p-2">
            <ExternalLink />
          </Button>
        </a>
      )}
    </div>
  );
}
