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
import { Link } from '@/navigation';
import { formatDate } from '@/services';

import DeleteDropdownItem from './DeleteDropItem';

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
                  {type === 'projects' && (
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/${type}/${entity.id}`}>Edit info</Link>
                    </DropdownMenuItem>
                  )}

                  {(type === 'blog' || type === 'projects') && (
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/${type}/${entity.id}/${type === 'projects' ? 'post' : ''}`}>Edit post</Link>
                    </DropdownMenuItem>
                  )}
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
