import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';

const fontSans = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | ŠišajMe',
    default: 'ŠišajMe',
  },
  description: 'ŠišajMe je aplikacija za rezervaciju termina šišanja.',
  icons: {
    icon: '../public/favicon.ico',
    shortcut: '../public/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-dark-300 text-white font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}