'use client';
import { ImageUp } from 'lucide-react';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { ImageService } from '@/services';

import MarkdownReader from './MarkdownReader';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

export default forwardRef(function MarkdownEditor({}, ref) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const onUploadFinish = useCallback(({ error, result }: { error?: string; result: string }) => {
    if (error) {
      toast({ title: 'An error occured...', variant: 'destructive', description: 'The image upload failed' });
    } else {
      navigator.clipboard.writeText(`![image](${result})`).then(() => {
        toast({ title: 'Copied!', description: 'The image link has been copied to the clipboard !' });
      });
    }
  }, []);

  const handleSelectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }, []);

  const handleSubmitImage = useCallback(() => {
    if (image) {
      image.arrayBuffer().then((buffer: ArrayBuffer) => {
        ImageService.uploadImage(image.name, buffer).then(onUploadFinish);
      });
    }
  }, [image, onUploadFinish]);

  useImperativeHandle(ref, () => ({
    content,
    setContent,
  }));

  return (
    <div>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">
              <ImageUp />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Upload a picture</DrawerTitle>
              <DrawerDescription>The picture&apos;s link will be paste on your clipboard</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Input id="picture" type="file" accept="image/*" onChange={handleSelectImage} />
              <Button onClick={handleSubmitImage}>Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-wrap h-full">
        {/* Editor */}
        <div className="flex-auto max-w-3xl mt-5 mr-5 min-w-56 w-1/2 h-full">
          <Textarea
            placeholder="Type your content here"
            required
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={30}
          />
        </div>

        {/* Preview */}
        <MarkdownReader>{content}</MarkdownReader>
      </div>
    </div>
  );
});
