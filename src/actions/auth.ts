'use server';
import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from '@/constants';
import { redirect } from '@/navigation';

export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });

  redirect('/admin/dashboard');
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect('/');
}
