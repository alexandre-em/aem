import {
  DocumentData,
  QueryDocumentSnapshot,
  collection as collectionRef,
  deleteDoc,
  doc,
  endBefore,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from 'firebase/firestore';

import firebase_app from '@/lib/firebase';

const db = getFirestore(firebase_app);
const MESSAGE_COLLECTION_NAME = 'messages';

export async function getAll(
  lim?: number,
  cursor?: {
    after?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    before?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  },
  orderByQuery?: { value: string; order: 'asc' | 'desc' }
) {
  const docRef = collectionRef(db, MESSAGE_COLLECTION_NAME);
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

export async function createOne(data: MessageType) {
  let result = null;
  let error = null;
  const id = crypto.randomUUID();

  try {
    result = await setDoc(doc(db, MESSAGE_COLLECTION_NAME, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { id, result, error };
}

export async function deleteOne(id: string) {
  const db = getFirestore(firebase_app);
  let result = false;
  let error = null;

  try {
    await deleteDoc(doc(db, MESSAGE_COLLECTION_NAME, id));

    result = true;
  } catch (e) {
    error = e;
  }

  return { result, error };
}
