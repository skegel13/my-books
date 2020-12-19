import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

function Section({ className, children }: Props) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export default Section;
