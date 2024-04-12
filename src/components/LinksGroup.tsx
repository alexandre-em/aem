import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from './ui/button';

export default function LinksGroup() {
  return (
    <div className="flex justify-center">
      <a href="https://github.com/alexandre-em" target="_blank">
        <Button variant="outline" className="mr-2 rounded-full w-14 h-14">
          <Github />
        </Button>
      </a>
      <a href="https://leetcode.com/aem22" target="_blank">
        <Button variant="outline" className="mr-2 rounded-full w-14 h-14">
          <Image width="60" height="60" src="/leetcode.svg" alt="" className="invert" />
        </Button>
      </a>
      <a href="https://www.linkedin.com/in/em-a" target="_blank">
        <Button variant="outline" className="ml-2 mr-2 rounded-full w-14 h-14">
          <Linkedin />
        </Button>
      </a>
      <a href="mailto:alexandre.em@pm.me">
        <Button variant="outline" className="ml-2 rounded-full w-14 h-14">
          <Mail />
        </Button>
      </a>
    </div>
  );
}
