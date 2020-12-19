import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Badge({ children }: Props) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
      {children}
    </span>
  );
}

export default Badge;
