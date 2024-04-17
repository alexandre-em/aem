import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { ProjectService, formatDate } from '@/services';

export default async function projects({ params: { locale }, searchParams: { limit } }: LocaleParamsType & IdParamsType) {
  const { result, error } = await ProjectService.getAll(parseInt(limit as string), undefined, {
    value: 'dateStart',
    order: 'desc',
  });
  const projects: ProjectType[] = result?.docs.map((doc) => ({
    ...doc.data(),
    dateStart: new Date(doc.data().dateStart.seconds * 1000),
    dateEnd: doc.data().dateEnd ? new Date(doc.data().dateEnd.seconds * 1000) : undefined,
    createdAt: new Date(doc.data().createdAt.seconds * 1000),
    id: doc.id,
  })) as unknown as ProjectType[];

  // TODO: Manage error
  if (result === undefined) return 'Loading...';
  if (error) return <div>Error</div>;

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <h1 className="text-3xl font-black mb-2">Projects</h1>
      <div className="flex flex-wrap">
        {projects.map((proj) => (
          <Card key={proj.id} className="m-2">
            <Link href={`/projects/${proj.id}`} locale={locale}>
              <CardContent className="p-2">
                <Image
                  src={proj.images.length > 0 ? proj.images[0].url : '/images/no-image.png'}
                  width={250}
                  height={141}
                  className="w-[250px] h-[141px] object-cover"
                  alt=""
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start max-w-[250px]">
                <h2 className="text-xl font-bold">{proj.title}</h2>
                <CardDescription>
                  {formatDate(proj.dateStart)} - {proj.dateEnd ? formatDate(proj.dateEnd) : 'now'}
                </CardDescription>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
