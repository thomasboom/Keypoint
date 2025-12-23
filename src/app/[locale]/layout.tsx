import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Keypoint - Your Privacy Hub',
  description: 'Empowering you with knowledge to protect your digital life. From beginner basics to advanced security strategies.',
  keywords: ['privacy', 'security', 'digital privacy', 'data protection', 'online safety'],
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${lexend.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
