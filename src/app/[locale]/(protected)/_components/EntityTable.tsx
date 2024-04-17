'use client';
import { MoreVertical } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Link } from '@/navigation';
import { ProjectService, formatDate } from '@/services';

const services = {
  projects: ProjectService,
  gallery: ProjectService, // TODO: Replace by the gallery service
  blog: ProjectService, // TODO: Replace by blog service
};

function DeleteDropdownItem({ id, type }: { id: string; type: EntityTypes }) {
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

export default function EntityTable({ type, entities }: { type: EntityTypes; entities: EntityType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entities.map((entity) => (
          <TableRow key={entity.id}>
            <TableCell>{entity.title}</TableCell>
            <TableCell>{formatDate(entity.createdAt)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/${type}/${entity.id}`}>Edit info</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/${type}/${entity.id}`}>Edit description</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={entity.id!} type={type} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
