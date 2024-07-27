'use client';
import { HeartIcon } from 'lucide-react';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { BlogService } from '@/services';

export default function LikeButton({ id, like }: { id: string; like: number }) {
  const handleLike = useCallback(() => {
    if (id) {
      BlogService.incrementLike(id);
    }
  }, [id]);

  return (
    <Button variant="ghost" className="rounded-full font-bold" onClick={handleLike}>
      <HeartIcon /> &nbsp; {like}
    </Button>
  );
}
