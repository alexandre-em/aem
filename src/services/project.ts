import {
  DocumentData,
  QueryDocumentSnapshot,
  collection as collectionRef,
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

import { COLLECTIONS_NAME } from '.';

const db = getFirestore(firebase_app);

export const getAll = async (
  lim?: number,
  cursor?: {
    after?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    before?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  },
  orderByQuery?: { value: string; order: 'asc' | 'desc' }
) => {
  const docRef = collectionRef(db, COLLECTIONS_NAME.PROJECTS);
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
};

export const getById = async (id: string) => {
  const docRef = doc(db, COLLECTIONS_NAME.PROJECTS, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const getByField = async (key: string, value: string) => {
  const docRef = collectionRef(db, COLLECTIONS_NAME.PROJECTS);

  const q = query(docRef, where(key, '==', value));

  let result = null;
  let error = null;

  try {
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const createProject = async (data: ProjectType) => {
  let result = null;
  let error = null;
  const id = (data.id as string) || crypto.randomUUID();

  try {
    result = await setDoc(doc(db, COLLECTIONS_NAME.PROJECTS, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { id, result, error };
};

export const updateProject = async (id: string, data: Partial<ProjectType>) => {
  let result = null;
  let error = null;

  try {
    result = await updateDoc(doc(db, COLLECTIONS_NAME.PROJECTS, id), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
