import { arrayUnion } from 'firebase/firestore';

import { EntityService } from './entity';

export class GalleryService extends EntityService<PhotoType> {
  constructor() {
    super('gallery');
  }

  addComment(id: string, comment: CommentType) {
    super.updateOne(id, { comments: arrayUnion(comment) as unknown as CommentType[] });
  }
}
