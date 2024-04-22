'use client';
import React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { MessageService, dynamicEntityService } from '@/services';

const services = { ...dynamicEntityService, messages: MessageService };

export default function DeleteDropdownItem({ id, type }: { id: string; type: EntityTypes | 'messages' }) {
  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => {
        services[type]
          .deleteOne(id)
          .then((res) => {
            if (res.result) toast({ title: 'Successfully deleted', description: id });
            else toast({ title: 'Failed to delete document...', description: id, variant: 'destructive' });
          })
          .catch(() => toast({ title: 'Failed to delete document...', description: id, variant: 'destructive' }));
      }}>
      Delete
    </DropdownMenuItem>
  );
}
