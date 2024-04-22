'use client';
import { useTheme } from 'next-themes';
import React, { useCallback, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageService } from '@/services';

type FormInputValuesType = {
  email: string;
  name: string;
  message: string;
};

export default function ContactForm({ messages }: { messages: Record<string, string> }) {
  const [token, setToken] = useState<string | null>(null);
  const [formInputValues, setFormInputValues] = useState<FormInputValuesType>({
    email: '',
    name: '',
    message: '',
  });
  const { systemTheme, theme } = useTheme();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!token || !formInputValues.email) {
        toast({ title: 'An error occurred...', description: 'Please complete the ReCAPTCHA.', variant: 'destructive' });
        return;
      }

      const { error } = await MessageService.createOne({ ...formInputValues, sentAt: new Date() });

      if (error) {
        toast({ title: 'An error occurred...', description: `${error}`, variant: 'destructive' });
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
    <form onSubmit={handleSubmit}>
      <CardContent>
        <div className="my-2">
          <Label htmlFor="email">{messages.email}</Label>
          <Input
            value={formInputValues.email}
            type="email"
            id="email"
            placeholder={messages.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-2">
          <Label htmlFor="name">{messages.name}</Label>
          <Input value={formInputValues.name} id="name" placeholder={messages.name} onChange={handleChange} required />
        </div>
        <div className="my-2">
          <Label htmlFor="message">{messages.message}</Label>
          <Textarea
            value={formInputValues.message}
            id="message"
            placeholder={messages.message}
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
          {messages.submit}
        </Button>
      </CardFooter>
    </form>
  );
}
