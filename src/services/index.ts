import { ProjectService as PService } from './project';

export * as ImageService from './image';
export * as MessageService from './message';

export const ProjectService = new PService();

export const COLLECTIONS_NAME = {
  PROJECTS: 'projects',
  BLOG: 'blog',
  GALLERY: 'gallery',
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0].replace(/-/g, '/');
};
