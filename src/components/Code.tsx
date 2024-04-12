import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Pre = ({ ...props }) => {
  return <div className="not-prose">{props.children}</div>;
};

export const CodeBlock = ({ ...props }) => {
  return (
    <SyntaxHighlighter
      language={props.className?.replace(/(?:lang(?:uage)?-)/, '')}
      style={oneDark}
      wrapLongLines={true}
      className="not-prose rounded-md overflow-auto">
      {props.children}
    </SyntaxHighlighter>
  );
};
