import { getTranslations } from 'next-intl/server';
import React from 'react';

import CursorPagination from '@/components/CursorPagination';
import LazyImage from '@/components/LazyImage';
import LimitSelect from '@/components/LimitSelect';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';
import { BlogService, formatDate } from '@/services';

export default async function Blog({
  params: { locale },
  searchParams: { limit = '10', after = undefined, before = undefined },
}: LocaleParamsType & IdParamsType) {
  const t = await getTranslations('Blog');
  const { result, totalDoc } = await BlogService.getAll(
    parseInt(limit as string),
    { after, before },
    {
      value: 'createdAt',
      order: 'desc',
    },
    true
  );
  const blogPosts: BlogType[] = result?.docs.map((doc) => ({
    ...doc.data(),
    createdAt: new Date(doc.data().createdAt.seconds * 1000),
    id: doc.id,
  })) as unknown as BlogType[];

  if (result === undefined) return 'Loading...';

  const cursorAfter = result?.docs[limit - 1]?.id || '';
  const cursorBefore = result?.docs[0]?.id || '';

  return (
    <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <h1 className="text-3xl font-black mb-2">{t('title')}</h1>
          {/*<p className="text-muted-foreground text-xs">{t('description')} </p>*/}
        </div>
        <LimitSelect />
      </div>
      <div className="flex flex-wrap">
        {blogPosts &&
          blogPosts.map((post) => (
            <Card key={post.id} className="m-2">
              <Link href={`/blog/${post.id}`} locale={locale}>
                <CardContent className="p-2">
                  <LazyImage src={post.thumbnail?.url || '/images/no-image.png'} className="w-[250px] h-[141px] object-cover" />
                </CardContent>
                <CardFooter className="flex flex-col items-start max-w-[250px]">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <CardDescription className="text-xs">{formatDate(post.createdAt)}</CardDescription>
                  <div className="mt-2">
                    {post.tags
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
