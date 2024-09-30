import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

import LazyImage from '@/components/LazyImage';
import MarkdownReader from '@/components/MarkdownReader';
import MessagesBox from '@/components/MessagesBox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { redis, redisKeys } from '@/lib/redis';
import { getReadTime } from '@/lib/utils';
import { BlogService, formatDate } from '@/services';

import LikeButton from './_components/LikeButton';
import NewComment from './_components/NewComment';
import ShareButtonGroup from '../../_components/ShareButtonGroup';

const getBlogById = cache((id: string) => {
  return BlogService.getById(id);
});

export default async function ProjectId({ params: { id } }: IdParamsType) {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result, error } = await getBlogById(id);
  const blog: BlogType | undefined =
    result && result.data()
      ? {
          ...(result.data() as Omit<BlogType, 'id'>),
          createdAt: new Date(result.data()!.createdAt.seconds * 1000),
          id: result.id,
        }
      : undefined;

  if (!result) return 'Loading...';
  // TODO: Manage error
  if (error) return <div>Error</div>;
  if (!blog) return notFound();

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div>
        <LazyImage src={blog.thumbnail.url} className="w-full h-[200px] object-cover" />
        <h1 className="text-3xl font-black my-2">{blog.title}</h1>
        <p className="text-muted-foreground text-sm">
          Published the {formatDate(blog.createdAt)} - {getReadTime(blog.content)} min read
        </p>
      </div>

      <div className="mt-2">
        {blog.tags.map((k: string, i: number) => (
          <Badge className="m-2 uppercase text-muted" key={`${k}-${i}`}>
            {k}
          </Badge>
        ))}
      </div>

      <Separator className="mt-2 mb-1" />
      <div className="flex justify-center">
        <MarkdownReader className="max-w-[640px]" content={blog.content} />
      </div>
      <ShareButtonGroup title={blog.title} />
      <LikeButton id={blog.id!} like={blog.like} />
      <Separator className="my-2" />
      <h2 className="font-extrabold text-2xl">Comments ({blog.comments.length})</h2>
      <NewComment id={blog.id!} />
      {blog.comments.map((post, i) => (
        <MessagesBox
          key={post.email + i}
          name={`${post.author}#${i + 1}`}
          content={post.content}
          sentAt={new Date((post.createdAt as unknown as FirebaseDateType).seconds * 1000)}
        />
      ))}
    </main>
  );
}

export async function generateMetadata({ params: { id } }: IdParamsType): Promise<Metadata> {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result } = await getBlogById(id);
  const data = result!.data();
  const blog: BlogType = { ...(data as Omit<BlogType, 'id'>), id: result!.id };

  return {
    title: `A. Em | ${blog.title}`,
    description: blog.content
      .replace(/[!@#$%^&*~>]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '')
      .substring(0, 150),
    keywords: blog.tags,
    openGraph: {
      title: `A. Em | ${blog.title}`,
      description: blog.content
        .replace(/[!@#$%^&*~>]/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '')
        .substring(0, 150),
      images: blog.thumbnail.url,
    },
  };
}

export async function generateStaticParams() {
  const projectIds: string | null = await redis.get(redisKeys.blog);

  return projectIds!.split(';').map((id) => ({
    id,
  }));
}
