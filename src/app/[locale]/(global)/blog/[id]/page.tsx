import React from 'react';

export default function BlogId({ params: { id } }: IdParamsType) {
  return <main className="min-h-[calc(100dvh-57px)] xsm:min-h-[calc(100dvh-352px)]">Blog id : {id}</main>;
}
