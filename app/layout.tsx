import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import Providers from '@/components/Providers'; // ako koristiš kontekste

const fontSans = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | ŠišajMe',
    default: 'Welcome | ŠišajMe',
  },
  description: 'ŠišajMe is an application for haircut appointments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Možeš dodati i <meta> tagove ovdje ako želiš */}
      </head>
      <body
        className={cn(
          'min-h-screen bg-dark-300 text-white font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}