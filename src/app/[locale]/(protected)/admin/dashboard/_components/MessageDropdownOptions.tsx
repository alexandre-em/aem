'use client';
import { MoreVertical } from 'lucide-react';
import React from 'react';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DeleteDropdownItem from '../../../_components/DeleteDropItem';

export default function MessageDropdownOptions({ message }: { message: MessageType }) {
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
          <DialogDescription>Content: {message.message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
