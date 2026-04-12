import { StoreProvider } from '@/components/StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
import './globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="bg-[#0f1117] text-white min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}