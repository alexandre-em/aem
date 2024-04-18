import {
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
} from 'firebase/firestore';

import firebase_app from '@/lib/firebase';

const db = getFirestore(firebase_app);
const MESSAGE_COLLECTION_NAME = 'messages';

export async function getAll(
  lim?: number,
  cursor?: { after?: string; before?: string },
  orderByQuery?: { value: string; order: 'asc' | 'desc' }
) {
  const docRef = collectionRef(db, MESSAGE_COLLECTION_NAME);
  let totalDoc;

  const queryArgs = [];

  if (orderByQuery?.value) queryArgs.push(orderBy(orderByQuery.value, orderByQuery.order));

  if (lim) {
    queryArgs.push(limit(lim));

    if (cursor?.before) {
      queryArgs.push(endBefore(await getDoc(doc(db, MESSAGE_COLLECTION_NAME, cursor.before))));
    } else {
      if (cursor?.after) {
        queryArgs.push(startAfter(await getDoc(doc(db, MESSAGE_COLLECTION_NAME, cursor.after))));
      }
    }
    totalDoc = (await getCountFromServer(docRef)).data().count;
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
export async function getById(id: string) {
  const docRef = doc(db, MESSAGE_COLLECTION_NAME, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
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
