'use client';
import { redirect, usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LimitSelect() {
  const path = usePathname();

  const handleChange = useCallback(
    (value: string) => {
      redirect(`${path}?limit=${value}`);
    },
    [path]
  );

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
