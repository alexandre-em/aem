'use client';
import React, { useCallback, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function BlogForm({ entity, onSubmit }: { entity?: BlogType; onSubmit: (updP: BlogType) => void }) {
  const [title, setTitle] = useState(entity?.title || '');
  const [content, setContent] = useState(entity?.content || '');
  const [thumbnail, setThumbnail] = useState(entity?.thumbnail.url || '');
  const [tags, setTags] = useState(entity?.tags.join(',') || '');

  const handleSubmit = useCallback(() => {
    const parsedUrl = thumbnail.split('/');
    const filename = parsedUrl.pop();
    const miniature = `${parsedUrl.join('/')}/min_${filename}`;

    const updatedEntity: BlogType = {
      title,
      content,
      thumbnail: {
        id: 0,
        url: thumbnail,
        miniature,
      },
      tags: tags.split(','),
      createdAt: new Date(),
      like: 0,
      comments: [],
    };

    onSubmit(updatedEntity);
  }, [title, content, onSubmit, thumbnail, tags]);

  return (
    <main className="flex flex-col flex-wrap p-5">
      <h1 className="text-3xl font-black mb-5">{entity ? 'Edit' : 'Add'} a Blog post</h1>
      <Input
        className="flex-[0.7]"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <Input
        type="text"
        id="thumbnail"
        className="my-3"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        placeholder="Image url"
        required
      />
      <Input
        type="text"
        id="tags"
        className="mb-3"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags: separate with a comma"
        required
      />
      <div className="flex flex-wrap">
        <MarkdownEditor content={content} onChange={setContent} />
        <Card className="flex-auto mt-5 p-5">
          <CardContent>{content && <MarkdownReader className="max-w-2xl" content={content} />}</CardContent>
        </Card>
      </div>
      <Button className="mt-5" disabled={!!!content} onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  );
}
