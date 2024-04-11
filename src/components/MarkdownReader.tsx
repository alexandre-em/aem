import React from 'react';
import Markdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { CodeBlock, Pre } from './Code';
import { Card, CardContent } from './ui/card';

const options = { code: CodeBlock, pre: Pre };

export default function MarkdownReader({ children }: { children: string }) {
  return (
    <Card className="flex-auto mt-5 p-5">
      <CardContent>
        <article>
          <Markdown className="prose prose-invert min-w-full text-primary" components={options}>
            {children}
          </Markdown>
        </article>
      </CardContent>
    </Card>
  );
}
