import React from 'react';
import Markdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

import { CodeBlock, Pre } from './Code';
import ImageDialog from './ImageDialog';
import * as Typ from './Typing';

const options = {
  code: CodeBlock,
  pre: Pre,
  h1: Typ.TitleH1,
  h2: Typ.TitleH2,
  h3: Typ.TitleH3,
  h4: Typ.TitleH4,
  a: Typ.Link,
  blockquote: Typ.Paragraph,
  strong: Typ.Bold,
  img: ImageDialog,
};

export default function MarkdownReader({ content, className }: MarkdownReaderProps) {
  return (
    <article className={cn('text-red-500', className)}>
      <Markdown
        className="prose prose-invert text-primary"
        components={options}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, [rehypeExternalLinks, { content: { type: 'text', value: ' 🔗' } }]]}>
        {content}
      </Markdown>
    </article>
  );
}
