import React from 'react';

import { cn } from '@/lib/utils';
import { formatDate } from '@/services';

import { buttonVariants } from './ui/button';

export default function MessagesBox({ content, name, sentAt }: MessageBoxProps) {
  return (
    <div className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'my-1 border flex flex-wrap flex-col h-fit p-3')}>
      <div className="w-full flex flex-wrap justify-between">
        <h4 className="capitalize font-bold">{name}</h4>
      </div>
      <div className="text-xs self-start mb-2 text-muted-foreground italic">{formatDate(sentAt)}</div>
      <div className="w-[calc(100vw-70px)] overflow-ellipsis line-clamp-2 text-xs text-muted-foreground self-start">
        {content}
      </div>
    </div>
  );
}
