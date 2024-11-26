// _layout.js
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Classifieds App',
//   description: 'A Next.js classifieds application',
// };

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={inter.className}>
          {children}
        </body>
      </html>
  );
}
