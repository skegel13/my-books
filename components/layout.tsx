import React, { ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  children: ReactNode;
}

const siteTitle = 'My Books';

export default function Layout({ children, title = '' }: Props) {
  return (
    <>
      <Head>
        <title>
          {siteTitle}
          {title ? ` - ${title}` : ''}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
}
