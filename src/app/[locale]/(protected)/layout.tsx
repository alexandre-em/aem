import { Inter as FontSans } from 'next/font/google';

import '../../globals.css';

import { ThemeProvider } from '@/components/providers/theme.provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import Navbar from './_components/Navbar';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'A. Em - Admin dashboard',
  description: "Alexandre Em's portfolio",
};

export default function AdminLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-dvh bg-primary-foreground font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
