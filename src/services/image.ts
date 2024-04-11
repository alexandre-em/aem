import { ref, uploadBytes } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';

import { storage } from '@/lib/firebase';

// TODO: Implement image resizing
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
  const fileId = crypto.randomUUID();
  const storageRef = ref(storage, `uploads/${fileId}/${filename}`);
  const { metadata } = await uploadBytes(storageRef, fileBuffer);
  const { fullPath } = metadata;
  let error;

  if (!fullPath) {
    error = 'There was some error while uploading the file.';
  }

  const result = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`;

  return { result, error };
};
