import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Pre = ({ ...props }) => {
  return <div className="not-prose">{props.children}</div>;
};

export const CodeBlock = ({ ...props }) => {
  const match = /language-(\w+)/.exec(props.className || '');

  if (!props.inline && match)
    return (
      <SyntaxHighlighter
        language={props.className?.replace(/(?:lang(?:uage)?-)/, '')}
        style={oneDark}
        className="not-prose rounded-md w-[calc(100dvw-45px)] sm:w-full overflow-auto">
        {props.children}
      </SyntaxHighlighter>
    );

  return <code className="bg-primary-foreground border-2 border-primary-foreground rounded-md">{props.children}</code>;
};
