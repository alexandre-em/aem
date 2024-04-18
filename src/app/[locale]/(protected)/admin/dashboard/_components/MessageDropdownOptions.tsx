'use client';
import { MoreVertical } from 'lucide-react';
import React, { useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { formatDateWithTime } from '@/services';

import DeleteDropdownItem from '../../../_components/DeleteDropItem';

export default function MessageDropdownOptions({ message }: { message: MessageType }) {
  const [reply, setReply] = useState('');
  const content = `\n\n\n------- Original Message -------\n On ${formatDateWithTime(message.sentAt)}, ${message.name} <${message.email}> wrote: \n\n ${message.message}`;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span>Check message content</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DeleteDropdownItem id={message.id!} type="messages" />
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>From {message.name}</DialogTitle>
          <DialogDescription>{message.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col">
          <Textarea
            placeholder="Type your reply here..."
            required
            autoFocus
            onChange={(e) => setReply(e.target.value)}
            rows={2}
          />
          <a
            href={`mailto:${message.email}?subject=Re:Message from ${message.name}&body=${encodeURIComponent(reply)} ${encodeURIComponent(content)}`}
            className={cn(buttonVariants(), 'my-2')}>
            Reply
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
