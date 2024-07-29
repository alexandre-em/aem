'use client';
import { HeartIcon } from 'lucide-react';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BlogService } from '@/services';

export default function LikeButton({ id, like }: { id: string; like: number }) {
  const { toast } = useToast();

  const handleLike = useCallback(() => {
    if (id) {
      BlogService.incrementLike(id)
        .then(() => {
          toast({ title: 'Thank you for the support !', description: 'Evaluation sent successfuly', variant: 'success' });
        })
        .catch(() =>
          toast({
            title: 'An error occured. Please try again later...',
            description: 'Evaluation failed',
            variant: 'destructive',
          })
        );
    }
  }, [id, toast]);

  return (
    <Button variant="ghost" className="rounded-full font-bold" onClick={handleLike}>
      <HeartIcon /> &nbsp; {like}
    </Button>
  );
}
