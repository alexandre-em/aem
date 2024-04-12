'use client';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import useHandler from './handlers';

export default function CreateProject() {
  const { images, handleSubmitImage, handleSubmit, handleSelectImage, handleChangeData } = useHandler();

  return (
    <main className="flex flex-col flex-wrap p-5">
      <h1 className="text-3xl font-black mb-5">Add a project</h1>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Upload pictures</CardTitle>
          <CardDescription>you can select up to 5 pictures maximum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            {images.length > 0 && (
              <Carousel className="w-[calc(100%-64px)] max-w-sm">
                <CarouselContent className="-ml-1">
                  {images.map(
                    (img: File | null, i) =>
                      img && (
                        <CarouselItem key={`${img.name}_${i}`} className="pl-1 md:basis-1/2 lg:basis-1/3">
                          <div className="p-1 flex justify-center items-center h-full">
                            <Image
                              src={URL.createObjectURL(img)}
                              alt="img"
                              width="200"
                              height="200"
                              className="m-2 object-contain"
                            />
                          </div>
                        </CarouselItem>
                      )
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>

          <Label htmlFor="picture">Pictures</Label>
          <Input id="picture" type="file" accept="image/*" multiple onChange={handleSelectImage} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitImage} disabled={images.length < 1}>
            Upload picture{images.length > 0 ? 's' : ''}
          </Button>
        </CardFooter>
      </Card>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Project&apos;s related information</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input type="text" id="title" onChange={handleChangeData} placeholder="Title" required />
            </div>
            <div className="flex flex-wrap">
              <div className="mt-2 mr-5">
                <Label htmlFor="dateStart">Start date *</Label>
                <Input type="date" id="dateStart" onChange={handleChangeData} placeholder="Start date" required />
              </div>
              <div className="mt-2">
                <Label htmlFor="dateEnd">End date</Label>
                <Input type="date" id="dateEnd" onChange={handleChangeData} placeholder="End date" />
              </div>
            </div>
            <div className="mt-2">
              <Label htmlFor="github">Github</Label>
              <Input type="text" id="github" onChange={handleChangeData} placeholder="https://github.com/example/test-projet" />
            </div>
            <div className="mt-2">
              <Label htmlFor="demo">Demo</Label>
              <Input type="text" id="demo" onChange={handleChangeData} placeholder="https://example.alexandre-em.fr" />
            </div>
            <div className="mt-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                type="text"
                id="keywords"
                onChange={handleChangeData}
                placeholder="Keywords: skills, tech, etc. separate with a comma ','"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Next</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
