'use client';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

export default function LazyImage({
  className,
  miniature,
  src,
  ...props
}: WithClassNameComponentType & LazyImageProps & Partial<HTMLImageElement> & Partial<React.ComponentProps<typeof Image>>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const miniatureBg = useMemo(() => {
    const urlSplitted = src.split('/');
    const url = miniature
      ? miniature
      : src.split(urlSplitted[urlSplitted.length - 1])[0] + `min_${urlSplitted[urlSplitted.length - 1]}`;

    return isLoaded ? {} : { background: `url('${url}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' };
  }, [src, miniature, isLoaded]);

  const classNameImageLoaded = useMemo(
    () =>
      isLoaded
        ? { div: 'before:content-none opacity-1 before:animate-none', img: 'opacity-1' }
        : { div: 'before:content-[""] before:opacity-0 before:animate-pulse', img: 'opacity-0' },
    [isLoaded]
  );

  return (
    <div
      style={miniatureBg}
      className={cn('before:absolute before:inset-0 transition ease-in-out delay-300', classNameImageLoaded.div, className)}>
      <Image
        width={3000}
        height={2000}
        {...props}
        className={cn('transition ease-in-out delay-300', classNameImageLoaded.img, className)}
        src={src}
        loading="lazy"
        alt=""
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
