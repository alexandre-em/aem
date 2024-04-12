'use client';
import { redirect } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

import { useAuth } from '@/components/providers/google.provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function AdminPage() {
  const { user, googleSignIn } = useAuth();
  const { toast } = useToast();

  const handleSignIn = useCallback(async () => {
    try {
      await googleSignIn();
      toast({
        description: 'Welcome back !',
        title: `Successfuly authenticated`,
      });
    } catch (error) {
      toast({
        title: 'An error occurred while signing in',
        description: `${error}`,
        variant: 'destructive',
      });
    }
  }, [googleSignIn, toast]);

  useEffect(() => {
    if (user?.accessToken) {
      redirect('/admin/dashboard');
    }
  }, [user]);

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
