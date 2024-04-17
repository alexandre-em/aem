'use client';
import { UserCredential } from 'firebase/auth';
import React, { useCallback } from 'react';

import { createSession } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import googleAuthInstance from '@/services/auth';

export default function AdminPage() {
  const handleSignIn = useCallback(async () => {
    try {
      const user: UserCredential = await googleAuthInstance.signIn();

      toast({
        description: 'Welcome back !',
        title: `Successfuly authenticated`,
      });

      await createSession(user.user.uid);
    } catch (error) {
      toast({
        title: 'An error occurred while signing in',
        description: `${error}`,
        variant: 'destructive',
      });
      console.log(error);
    }
  }, []);

  return (
    <main className="min-h-[calc(100dvh-57px)] flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Admin page</CardTitle>
          <CardDescription>You are trying to access to a protected route. Please authenticate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn}>Sign in with Google</Button>
        </CardContent>
      </Card>
    </main>
  );
}
