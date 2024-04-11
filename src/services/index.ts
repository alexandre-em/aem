export * as ProjectService from './project';
export * as ImageService from './image';

export const COLLECTIONS_NAME = {
  PROJECTS: 'projects',
  BLOG: 'blog',
  GALLERY: 'gallery',
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0].replace(/-/g, '/');
};
