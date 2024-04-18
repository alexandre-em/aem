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

export const formatDateWithTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutesStr;
  return (
    date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) + ` at ${strTime}`
  );
};
