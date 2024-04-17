'use client';
import { useTheme } from 'next-themes';
import React, { useCallback, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { MessageService } from '@/services';

type FormInputValuesType = {
  email: string;
  name: string;
  message: string;
};

export default function Contact() {
  const [formInputValues, setFormInputValues] = useState<FormInputValuesType>({
    email: '',
    name: '',
    message: '',
  });
  const { systemTheme, theme } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!token || !formInputValues.email) {
        toast({ title: 'An error occurred...', description: 'Please complete the ReCAPTCHA.', variant: 'destructive' });
        return;
      }

      const { result, error } = await MessageService.createOne(formInputValues);

      if (error) {
        toast({ title: 'An error occurred...', description: `${error}`, variant: 'destructive' });
        return;
      }
      if (!result) {
        toast({ title: 'An error occurred...', variant: 'destructive' });
        return;
      }

      toast({ title: 'Thank you!', description: 'Your message has been sent successfully!', variant: 'success' });
      setFormInputValues({ email: '', name: '', message: '' });
    },
    [formInputValues, token, toast]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormInputValues((prev: FormInputValuesType) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  return (
    <>
      <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)] p-5">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Contact me</CardTitle>
              <CardDescription>
                最後までご覧いただきありがとうございました。このサイトを通して、私のことを少しでも知っていただけたのなら嬉しいです。もしこのサイトや私について何かコメントがありましたら、下記フォームをご利用ください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="my-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={formInputValues.email}
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-2">
                <Label htmlFor="name">Name</Label>
                <Input value={formInputValues.name} id="name" placeholder="Name" onChange={handleChange} required />
              </div>
              <div className="my-2">
                <Label htmlFor="message">Type your message here...</Label>
                <Textarea
                  value={formInputValues.message}
                  id="message"
                  placeholder="Type your message here..."
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY!}
                onChange={(t: string | null) => setToken(t)}
                theme={(theme === 'system' ? systemTheme! : theme!) as 'light' | 'dark'}
              />
              <Button type="submit" className="mt-5">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Toaster />
    </>
  );
}
