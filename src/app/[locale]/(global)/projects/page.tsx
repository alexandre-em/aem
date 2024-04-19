import Image from 'next/image';
import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LimitSelect from '@/components/LimitSelect';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';
import { ProjectService, formatDate } from '@/services';

export default async function projects({
  params: { locale },
  searchParams: { limit = '10', after = undefined, before = undefined },
}: LocaleParamsType & IdParamsType) {
  const { result, totalDoc } = await ProjectService.getAll(
    parseInt(limit as string),
    { after, before },
    {
      value: 'dateStart',
      order: 'desc',
    }
  );
  const projects: ProjectType[] = result?.docs.map((doc) => ({
    ...doc.data(),
    dateStart: new Date(doc.data().dateStart.seconds * 1000),
    dateEnd: doc.data().dateEnd ? new Date(doc.data().dateEnd.seconds * 1000) : undefined,
    createdAt: new Date(doc.data().createdAt.seconds * 1000),
    id: doc.id,
  })) as unknown as ProjectType[];

  if (result === undefined) return 'Loading...';

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">My work</h1>
          <p className="text-muted-foreground text-xs">
            Here you can find all my work related to the development: personal, scholar projects, etc.
          </p>
        </div>
        <LimitSelect />
      </div>
      <div className="flex flex-wrap">
        {projects.map((proj) => (
          <Card key={proj.id} className="m-2">
            <Link href={`/projects/${proj.id}`} locale={locale}>
              <CardContent className="p-2">
                <Image
                  src={proj.images.length > 0 ? proj.images.find((img) => img.id === 0)!.url : '/images/no-image.png'}
                  width={250}
                  height={141}
                  className="w-[250px] h-[141px] object-cover"
                  alt=""
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start max-w-[250px]">
                <h2 className="text-xl font-bold">{proj.title}</h2>
                <CardDescription className="text-xs">
                  {formatDate(proj.dateStart)} - {proj.dateEnd ? formatDate(proj.dateEnd) : 'now'}
                </CardDescription>
                <div className="mt-2">
                  {proj.keywords
                    .filter((_, i) => i < 3)
                    .map((k: string, i: number) => (
                      <Badge className="m-1 uppercase text-muted" key={`${k}-${i}`}>
                        {k}
                      </Badge>
                    ))}
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
      {totalDoc && Math.ceil(totalDoc / parseInt(limit)) > 1 && (
        <CursorPagination cursor={{ after: cursorAfter, before: cursorBefore }} limit={limit} />
      )}
    </main>
  );
}
