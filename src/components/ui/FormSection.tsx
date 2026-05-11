import { ReactNode } from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
  }
  
  export default function FormSection({ title, children }: Props) {
    return (
      <article className="border-t-[6px] border-primary border-x-2 border-b-2 border-x-primary/20 border-b-primary/20 bg-surface-container-lowest p-gutter pt-8 space-y-6">
        <span className="font-label-caps tracking-widest text-primary/60 block mb-4">
          {title}
        </span>
        {children}
      </article>
    );
  }