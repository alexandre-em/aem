import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '@/lib/firebase';

class GoogleAuthentication {
  async signIn() {
    const provider = new GoogleAuthProvider();

    const response = await signInWithPopup(auth, provider);

    return response;
  }

  signOut() {
    return signOut(auth);
  }

  authStateChanged() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        resolve(currentUser);
      });
    });
  }
}

const googleAuthInstance = new GoogleAuthentication();

export default googleAuthInstance;
