import { arrayUnion } from 'firebase/firestore';

import { EntityService } from './entity';

export class GalleryService extends EntityService<PhotoType> {
  constructor() {
    super('gallery');
  }

  addComment(id: string, comment: CommentType) {
    const commentId = crypto.randomUUID();

    return super.updateOne(id, { comments: arrayUnion({ ...comment, id: commentId }) as unknown as CommentType[] });
  }
}
