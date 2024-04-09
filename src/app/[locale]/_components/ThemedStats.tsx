'use client';
import { useTheme } from 'next-themes';
import React from 'react';

import { Separator } from '@/components/ui/separator';

export default function ThemedStats() {
  const { theme, systemTheme } = useTheme();

  return (
    <div>
      <h3 className="text-sm font-bold mb-3">Github</h3>
      <img
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=alexandre-em&layout=donut&theme=${theme === 'system' ? systemTheme : theme}`}
        alt="github"
      />
      <div className="w-full flex justify-center">
        <Separator orientation="vertical" className="h-5" />
      </div>
      <h3 className="text-sm font-bold mb-3">Leetcode</h3>
      <img
        src={`https://leetcode-stats-six.vercel.app/?username=aem22&theme=${theme === 'system' ? systemTheme : theme}`}
        alt="leetcode"
      />
    </div>
  );
}
