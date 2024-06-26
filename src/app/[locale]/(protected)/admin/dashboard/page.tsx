import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import MessagesBox from '@/components/MessagesBox';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/navigation';
import { MessageService } from '@/services';

export default async function Dashboard({ searchParams: { limit = '10', after = undefined, before = undefined } }: IdParamsType) {
  const { result, error, totalDoc } = await MessageService.getAll(
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
      <div className="flex flex-wrap">
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
        <h2 className="text-2xl font-bold m-2">Messages ({totalDoc})</h2>
        <LimitSelect />
      </div>
      {!messages.length && <div className="flex flex-wrap w-full justify-center p-10">No more items...</div>}
      {messages.map((msg) => (
        <MessagesBox key={msg.id} content={msg.message} name={msg.name} sentAt={msg.sentAt} />
      ))}
      <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
    </main>
  );
}
