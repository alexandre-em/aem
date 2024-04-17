'use client';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ThemedStats() {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="flex flex-wrap justify-center xsm:justify-between">
      <div className="m-1">
        <h3 className="text-sm font-bold mb-3">Github</h3>
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=alexandre-em&layout=donut&theme=${theme === 'system' ? systemTheme : theme}`}
          alt="github"
          className="max-w-[300px] w-full"
        />
      </div>

      <div className="m-1">
        <h3 className="text-sm font-bold mb-3">Leetcode</h3>
        <img
          src={`https://leetcode-stats-six.vercel.app/?username=aem22&theme=${theme === 'system' ? systemTheme : theme}`}
          alt="leetcode"
          className="max-w-[300px] w-full"
        />
      </div>
    </div>
  );
}
