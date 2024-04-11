'use client';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { redirect, usePathname } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';
import { toast } from '../ui/use-toast';

const AuthContext = createContext<AuthProviderValueType>({
  user: null,
  googleSignIn: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const path = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (path !== '/admin' && !user) {
      redirect('/admin');
    }
  }, [path, user]);

  return <AuthContext.Provider value={{ user, googleSignIn, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
