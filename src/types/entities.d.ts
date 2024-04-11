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
};

type CommentType = {
  author: string;
  createdAt: Date;
  content: string;
  comments: CommentType[];
};

type BlogType = {
  id: string;
  title: string;
  createdAt: Date;
  submail: ImageMin;
  content: string;
  comments: CommentType[];
  like: number;
};

type PhotoType = {
  image: ImageMin;
  title: string;
  date: Date;
};
