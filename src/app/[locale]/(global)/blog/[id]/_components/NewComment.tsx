'use client';
import { SendIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { BlogService } from '@/services';

export default function NewComment({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = useCallback(() => {
    if (id) {
      BlogService.addComment(id, {
        author: name,
        email,
        createdAt: new Date(),
        content: comment,
        comments: [],
      })
        .then(() => {
          toast({ title: 'Comment sent', description: 'Thank you for your comment', variant: 'success' });
        })
        .catch(() => {
          toast({ title: 'An error occured...', description: 'Please try again later...' });
        })
        .finally(() => {
          setComment('');
        });
    }
  }, [comment, email, id, name]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full my-2">
          Write/Reply a comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New comment</DialogTitle>
          <DialogDescription>If you want to reply don&apos;t hesitate to @ his name</DialogDescription>
        </DialogHeader>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Textarea
          value={comment}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          className="my-2"
        />

        <DialogFooter>
          <Button className="font-bold w-full" onClick={handleSubmit}>
            <SendIcon /> &nbsp;Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
