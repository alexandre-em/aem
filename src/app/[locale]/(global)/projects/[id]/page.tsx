import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

import CarouselDialog from '@/components/CarouselDialog';
import MarkdownReader from '@/components/MarkdownReader';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { redis, redisKeys } from '@/lib/redis';
import { ProjectService, formatDate } from '@/services';

import ButtonGroup from './_components/ButtonGroup';
import ShareButtonGroup from '../../_components/ShareButtonGroup';

export const dynamicParams = true;

const getProjectById = cache((id: string) => {
  return ProjectService.getById(id);
});

export default async function ProjectId({ params: { id } }: IdParamsType) {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result, error } = await getProjectById(id);
  const project: ProjectType | undefined =
    result && result.data()
      ? {
          ...(result.data() as Omit<ProjectType, 'id'>),
          dateStart: new Date(result.data()!.dateStart.seconds * 1000),
          dateEnd: result.data()!.dateEnd ? new Date(result.data()!.dateEnd.seconds * 1000) : null,
          createdAt: new Date(result.data()!.createdAt.seconds * 1000),
          id: result.id,
          images: result.data()!.images.toSorted((a: ImageMin, b: ImageMin) => a.id - b.id),
        }
      : undefined;

  if (!result) return 'Loading...';
  // TODO: Manage error
  if (error) return <div>Error</div>;
  if (!project) return notFound();

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">{project.title}</h1>
          <p className="text-muted-foreground text-sm">
            {formatDate(project.dateStart)} - {project.dateEnd ? formatDate(project.dateEnd) : 'now'}
          </p>
        </div>

        <ButtonGroup github={project.github} demo={project.demo} />
      </div>

      <div className="mt-2">
        {project.keywords.map((k: string, i: number) => (
          <Badge className="m-2 uppercase text-muted" key={`${k}-${i}`}>
            {k}
          </Badge>
        ))}
      </div>

      <Separator className="mt-1 mb-1" />
      <h2 className="text-xl font-extrabold mb-2">Screenshots</h2>
      <div className="flex justify-center">{project.images.length > 0 && <CarouselDialog images={project.images} />}</div>

      <Separator className="mt-2 mb-1" />
      <ShareButtonGroup title={project.title} />
      <div className="flex justify-center">
        <MarkdownReader className="max-w-[640px]" content={project.content} />
      </div>
    </main>
  );
}

export async function generateMetadata({ params: { id } }: IdParamsType): Promise<Metadata> {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result } = await getProjectById(id);
  const data = result!.data();
  const project: ProjectType = { ...(data as Omit<ProjectType, 'id'>), id: result!.id };

  return {
    title: `A. Em | ${project.title}`,
    description: project.content
      .replace(/[!@#$%^&*~>]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '')
      .substring(0, 150),
    keywords: project.keywords,
    openGraph: {
      title: `A. Em | ${project.title}`,
      description: project.content
        .replace(/[!@#$%^&*~>]/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '')
        .substring(0, 150),
      images: project.images,
      url: project.demo || project.github,
    },
  };
}

export async function generateStaticParams() {
  const projectIds: string | null = await redis.get(redisKeys.projects);

  return projectIds!.split(';').map((id) => ({
    id,
  }));
}
