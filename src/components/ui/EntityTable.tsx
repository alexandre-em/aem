'use client';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/services';

import { toast } from './use-toast';

function DeleteDropdownItem({ id }: { id: string }) {
  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => {
        // await deleteProduct(id)
        toast({ title: 'Successfully deleted', description: id, variant: 'destructive' });
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
                  <DeleteDropdownItem id={entity.id!} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
