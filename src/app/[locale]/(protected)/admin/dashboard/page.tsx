import Link from 'next/link';
import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MessageService, formatDate } from '@/services';

import MessageDropdownOptions from './_components/MessageDropdownOptions';

export default async function Dashboard({ searchParams: { limit = '10', after = undefined, before = undefined } }: IdParamsType) {
  const { result, error } = await MessageService.getAll(
    parseInt(limit as string),
    { after, before },
    {
      value: 'sentAt',
      order: 'desc',
    }
  );

  const messages: MessageType[] | undefined = result?.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email,
      name: data.name,
      message: data.message,
      sentAt: new Date(doc.data().sentAt.seconds * 1000),
    };
  });

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  if (error) return <div>An error occured...</div>;

  if (!messages) return <div>Loading...</div>;

  return (
    <main className="flex flex-col flex-wrap p-5">
      <h1 className="text-3xl font-black">Dashboard</h1>
      <div className="flex flex-wrap justify-around">
        {['projects', 'gallery', 'blog'].map((type) => (
          <Card key={type} className="m-3">
            <CardHeader>
              <CardTitle className="capitalize">{type}</CardTitle>
              <CardDescription>Manage {type} data...</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/admin/${type}`} className={buttonVariants({ size: 'sm' })}>
                Here
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator className="my-2" />

      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-2xl font-bold m-2">Messages</h2>
        <LimitSelect />
      </div>
      {!messages.length && <div className="flex flex-wrap w-full justify-center p-10">No more items...</div>}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'my-1 border flex flex-wrap flex-col h-fit p-3')}>
          <div className="w-full flex flex-wrap justify-between">
            <h2 className="capitalize font-bold">{msg.name}</h2>
            <MessageDropdownOptions message={msg} />
          </div>
          <div className="text-xs self-start mb-2">{formatDate(msg.sentAt)}</div>
          <div className="line-clamp-2 text-xs text-muted-foreground self-start">{msg.message.substring(0, 300)}</div>
        </div>
      ))}
      <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
    </main>
  );
}
