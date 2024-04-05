'use client';
import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

export default function LazyImage({ className, src }: WithClassNameComponentType & LazyImageProps) {
  const divRef = useRef<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imgRef.current?.complete) {
      imgRef.current.style.animation = 'none';
      imgRef.current.style.content = 'none';
      imgRef.current.style.opacity = '1';

      divRef.current!.style.animation = 'none';
      divRef.current!.style.content = 'none';
      divRef.current!.style.opacity = '1';
    }
  }, [imgRef.current?.complete]);

  return (
    <div
      ref={divRef}
      className={cn(
        'bg-no-repeat bg-cover before:content-none before:absolute before:inset-0 before:opacity-0 bg-primary animate-pulse transition ease-in-out delay-300 rounded-[30px]',
        className
      )}>
      <img
        ref={imgRef}
        className="opacity-0 transition ease-in-out delay-300 rounded-[30px]"
        src={src}
        loading="lazy"
        alt="image"
      />
    </div>
  );
}
