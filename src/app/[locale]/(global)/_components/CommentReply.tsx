'use client';
import { MessageCirclePlus } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GalleryService, dynamicEntityService } from '@/services';

export default function CommentReply({ id, type }: { id: string; type: 'gallery' | 'blog' }) {
  const [comment, setComment] = useState<Omit<CommentType, 'createdAt'>>({
    author: '',
    content: '',
    comments: [],
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (comment) {
      (dynamicEntityService[type] as typeof GalleryService).addComment(id, { ...comment, createdAt: new Date() });
    }
  }, [comment, id, type]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex justify-center">
          <MessageCirclePlus className="mr-2" />
          Comment
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit} className="w-full">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a comment</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="author">Name *</Label>
            <Input type="text" id="author" onChange={handleChange} placeholder="Name" autoFocus required />
          </div>
          <Textarea id="content" placeholder="Type your comment here..." required onChange={handleChange} rows={2} />
          <DialogFooter>
            <Button className="mt-2" type="submit">
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
