'use client';
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import React from 'react';

import { usePathname } from '@/navigation';

type ShareButtonGroupProps = {
  title: string;
};

export default function ShareButtonGroup({ title }: ShareButtonGroupProps) {
  const path = usePathname();
  const url = `https://alexandre-em.fr${path}`;

  return (
    <div className="w-full flex justify-end items-center">
      <p className="text-muted-foreground text-xs mr-2">SHARE : </p>
      <EmailShareButton url={url} subject={title} body="">
        <EmailIcon className="m-1" size={32} round />
      </EmailShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon className="m-1" size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon className="m-1" size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} separator="::">
        <WhatsappIcon className="m-1" size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
