'use client';
import { ImageUp } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { ImageService } from '@/services';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

export default function MarkdownEditor({ content, onChange }: MarkdownEditorProps) {
  const [image, setImage] = useState<File | null>(null);

  const onUploadFinish = useCallback((imageMin: ImageMin | Error) => {
    if (imageMin instanceof Error) {
      toast({ title: 'An error occured...', variant: 'destructive', description: 'The image upload failed' });
    } else {
      navigator.clipboard.writeText(`![image](${imageMin.url})`).then(() => {
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
      ImageService.uploadImageWithMiniature(image, 0).then(onUploadFinish);
    }
  }, [image, onUploadFinish]);

  return (
    <div className="w-full max-w-3xl">
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
      <div className="flex flex-wrap h-full w-full">
        {/* Editor */}
        <div className="flex-auto mt-5 mr-5 min-w-56 w-1/2 h-full">
          <Textarea
            placeholder="Type your content here"
            required
            autoFocus
            value={content}
            onChange={(e) => onChange(e.target.value)}
            rows={30}
          />
        </div>
      </div>
    </div>
  );
}
