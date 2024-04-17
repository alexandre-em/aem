import {
  DocumentData,
  QueryDocumentSnapshot,
  collection as collectionRef,
  deleteDoc,
  doc,
  endBefore,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import firebase_app from '@/lib/firebase';

const db = getFirestore(firebase_app);

export class EntityService {
  private collection: EntityTypes;

  constructor(collection: EntityTypes) {
    this.collection = collection;
  }

  async getAll(
    lim?: number,
    cursor?: {
      after?: QueryDocumentSnapshot<DocumentData, DocumentData>;
      before?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    },
    orderByQuery?: { value: string; order: 'asc' | 'desc' }
  ) {
    const docRef = collectionRef(db, this.collection);
    let totalDoc;

    const queryArgs = [];

    if (orderByQuery?.value) queryArgs.push(orderBy(orderByQuery.value, orderByQuery.order));

    if (lim) {
      queryArgs.push(limit(lim));
      totalDoc = (await getCountFromServer(docRef)).data().count;
    }
    if (lim && cursor) {
      if (cursor.after) {
        queryArgs.push(startAfter(cursor.after));
      }
      if (cursor.before) {
        queryArgs.push(endBefore(cursor.before));
      }
    }

    const q = query(docRef, ...queryArgs);

    let result = null;
    let error = null;

    try {
      result = await getDocs(q);
    } catch (e) {
      error = e;
    }

    return { result, error, totalDoc };
  }

  async getById(id: string) {
    const docRef = doc(db, this.collection, id);

    let result = null;
    let error = null;

    try {
      result = await getDoc(docRef);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async getByField(key: string, value: string) {
    const docRef = collectionRef(db, this.collection);

    const q = query(docRef, where(key, '==', value));

    let result = null;
    let error = null;

    try {
      result = await getDocs(q);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async createOne(data: EntityType) {
    let result = null;
    let error = null;
    const id = crypto.randomUUID();

    try {
      result = await setDoc(doc(db, this.collection, id), data, {
        merge: true,
      });
    } catch (e) {
      error = e;
    }

    return { id, result, error };
  }

  async updateOne(id: string, data: Partial<EntityType>) {
    let result = null;
    let error = null;

    try {
      result = await updateDoc(doc(db, this.collection, id), data);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async deleteOne(id: string) {
    const db = getFirestore(firebase_app);
    let result = false;
    let error = null;

    try {
      await deleteDoc(doc(db, this.collection, id));

      result = true;
    } catch (e) {
      error = e;
    }

    return { result, error };
  }
}
