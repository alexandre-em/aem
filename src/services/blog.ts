import { arrayUnion, doc, getFirestore, increment, updateDoc } from 'firebase/firestore';

import firebase_app from '@/lib/firebase';

import { EntityService } from './entity';

const db = getFirestore(firebase_app);

export class BlogService extends EntityService<BlogType> {
  constructor() {
    super('blog');
  }

  async incrementLike(id: string) {
    let result = null;
    let error = null;

    try {
      result = await updateDoc(doc(db, this.collection, id), {
        like: increment(1),
      });
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async addComment(id: string, comment: CommentType) {
    let result = null;
    let error = null;

    try {
      result = await updateDoc(doc(db, this.collection, id), {
        comments: arrayUnion(comment),
      });
    } catch (e) {
      error = e;
    }

    return { result, error };
  }
}
