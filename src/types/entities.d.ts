type ImageMin = {
  id: number;
  url: string;
  miniature: string;
};

type ProjectType = {
  id?: string;
  title: string;
  dateStart: Date;
  dateEnd: Date | null;
  keywords: string[];
  images: ImageMin[];
  content: string;
  github?: string;
  demo?: string;
  createdAt: Date;
};

type CommentType = {
  author: string;
  createdAt: Date;
  content: string;
  comments: CommentType[];
};

type BlogType = {
  id?: string;
  title: string;
  createdAt: Date;
  submail: ImageMin;
  content: string;
  comments: CommentType[];
  like: number;
};

type PhotoType = {
  id?: string;
  image: ImageMin;
  title: string;
  date: Date;
  createdAt: Date;
};

type EntityTypes = 'projects' | 'blog' | 'gallery';
type EntityType = ProjectType | BlogType | PhotoType;
