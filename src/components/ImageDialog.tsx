import React from 'react';

import LazyImage from './LazyImage';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export default function ImageDialog(props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img {...props} alt="" loading="lazy" />
      </DialogTrigger>
      <DialogContent className="min-w-full sm:min-w-[90%] flex items-center">
        <LazyImage {...(props as unknown as React.ComponentProps<typeof LazyImage>)} className="object-contain max-h-[80dvh]" />
      </DialogContent>
    </Dialog>
  );
}
