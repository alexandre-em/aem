type LazyImageProps = {
  src: string;
  miniature?: string;
};

type LinkedCardItemProps = {
  title: string;
  description: string;
  date: string;
  url: string;
  src: string; // image url
};

type NavbarComponentsProps = {
  locale: 'en' | 'fr' | 'jp';
};

type MarkdownEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

type MarkdownReaderProps = {
  content: string;
} & Partial<WithClassNameComponentType>;

type MessageBoxProps = {
  content: string;
  name: string;
  sentAt: Date;
};
