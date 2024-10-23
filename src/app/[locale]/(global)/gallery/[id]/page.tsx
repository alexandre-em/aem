import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import LazyImage from '@/components/LazyImage';
import MessagesBox from '@/components/MessagesBox';
import { Separator } from '@/components/ui/separator';
import { GalleryService, formatDate } from '@/services';

import CommentReply from '../../_components/CommentReply';
import ShareButtonGroup from '../../_components/ShareButtonGroup';

export async function generateMetadata({ params: { id } }: IdParamsType): Promise<Metadata> {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result } = await GalleryService.getById(id);
  const data = result!.data();
  const photo: PhotoType = { ...(data as Omit<PhotoType, 'id'>), id: result!.id };

  return {
    title: `A. Em | ${photo.title}`,
    description: `taken the ${formatDate(new Date((photo.date as unknown as FirebaseDateType).seconds * 1000))}`,
    openGraph: {
      title: `A. Em | ${photo.title}`,
      description: `taken the ${formatDate(new Date((photo.date as unknown as FirebaseDateType).seconds * 1000))}`,
      images: photo.image.url,
    },
  };
}

export default async function GalleryId({ params: { id } }: IdParamsType) {
  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { result, error } = await GalleryService.getById(id);
  const photo: PhotoType | undefined =
    result && result.data()
      ? {
          ...(result.data() as Omit<PhotoType, 'id'>),
          date: new Date(result.data()!.date.seconds * 1000),
          createdAt: new Date(result.data()!.createdAt.seconds * 1000),
          id: result.id,
        }
      : undefined;

  // TODO: Manage error
  if (error) return <div>Error</div>;
  if (!photo) return notFound();

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">{photo.title}</h1>
          <p className="text-muted-foreground text-sm">Taken the {formatDate(photo.date)}</p>
        </div>
      </div>

      <Separator className="my-5" />
      <div className="flex flex-col items-center">
        <LazyImage src={photo.image.url} className="max-w-[1000px] w-full sm:w-[90%] mb-1" />
        <ShareButtonGroup title={photo.title} />
        <div className="flex flex-wrap w-full justify-between items-center my-2">
          <h2 className="text-xl font-black">Comments ({photo.comments.length}): </h2>
          <CommentReply id={id} type="gallery" />
        </div>
        {photo.comments.map((comment: CommentType, i: number) => (
          <div key={`${comment.author}-${i}`}>
            <MessagesBox
              content={comment.content}
              name={comment.author}
              sentAt={new Date((comment.createdAt as unknown as FirebaseDateType).seconds * 1000)}
              comments={comment.comments}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
