import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function LinkedCardItem({ title, description, date, url, src }: LinkedCardItemProps) {
  return (
    <a href={url} target="_blank" className="m-2">
      <div className="flex flex-wrap items-center space-x-4 rounded-md border p-4">
        <Image width="50" height="50" alt="logo" className="bg-white rounded-3xl border-white border-8" src={src} />
        <div className="flex-1 space-y-1 min-w-[120px]">
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
        <ExternalLink className="text-muted-foreground w-4" />
      </div>
    </a>
  );
}
