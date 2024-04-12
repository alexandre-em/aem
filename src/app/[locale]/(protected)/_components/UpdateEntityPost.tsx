import React, { useEffect, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownReader from '@/components/MarkdownReader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type UpdateEntityPostProps = {
  entity: ProjectType | BlogType;
  onSubmit: (content: string) => void;
};

export default function UpdateEntityPost({ entity, onSubmit }: UpdateEntityPostProps) {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (!content && entity?.title) {
      setContent(entity.content);
    }
  }, [entity, content]);

  return (
    <main className="flex flex-col flex-wrap p-5 min-h-[calc(100dvh-57px)]">
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="text-3xl font-black mb-5">{entity?.title}</h1>
        <Button disabled={!!!content} onClick={() => onSubmit(content)}>
          Submit
        </Button>
      </div>
      <div className="flex flex-wrap">
        <MarkdownEditor content={content} onChange={setContent} />
        <Card className="flex-auto mt-5 p-5">
          <CardContent>{content && <MarkdownReader className="max-w-2xl" content={content} />}</CardContent>
        </Card>
      </div>
    </main>
  );
}
