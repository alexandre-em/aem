import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';

import { storage } from '@/lib/firebase';

const prefix = 'https://storage.googleapis.com/alexandre-em.appspot.com/';

export const generateMiniature = (img: Blob) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      img,
      32,
      32,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });
};

export const uploadImage = async (filename: string, fileBuffer: Blob | ArrayBuffer | Uint8Array) => {
  const storageRef = ref(storage, `uploads/pictures/${filename}`);
  const { metadata } = await uploadBytes(storageRef, fileBuffer);
  const { fullPath } = metadata;
  let error;

  if (!fullPath) {
    error = 'There was some error while uploading the file.';
  }

  const result = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`;

  return { result, error };
};

export const uploadImageWithMiniature = async (img: File, id: number): Promise<ImageMin | Error> => {
  const fileId = crypto.randomUUID();

  // Resize images to create miniature then store
  const min = new Promise((resolve) => {
    generateMiniature(img).then((minImg) => {
      (minImg as File).arrayBuffer().then((buffer: ArrayBuffer) => {
        uploadImage(`/${fileId}/min_${img.name}`, buffer).then((res) => resolve(res.result));
      });
    });
  });

  // Store images on firestore
  const url = new Promise((resolve) => {
    img.arrayBuffer().then((buffer: ArrayBuffer) => {
      uploadImage(`/${fileId}/${img.name}`, buffer).then((res) => resolve(res.result));
    });
  });

  // Wait for the two promises to finish
  const promises = await Promise.allSettled([url, min]);
  const isInvalid = promises.find((promise) => promise.status === 'rejected');

  // Checking if there's failures
  if (isInvalid) return new Error('Upload failed');

  const fullfilledUrl = promises[0] as PromiseFulfilledResult<string>;
  const fullfilledMin = promises[1] as PromiseFulfilledResult<string>;

  return { url: fullfilledUrl.value, miniature: fullfilledMin.value, id };
};

export const deleteImageWithMiniature = async (url: string) => {
  const filepath = url.split(prefix)[1];
  const imageRef = ref(storage, filepath);

  let result;
  let error;

  try {
    await deleteObject(imageRef);
    result = true;
  } catch (e) {
    error = 'An error occurred while deleting ' + url;
  }

  return { result, error };
};
