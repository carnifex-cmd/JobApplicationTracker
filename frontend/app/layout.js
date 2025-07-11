'use client';

import { Inter } from 'next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { I18nProvider } from '@react-aria/i18n';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../hooks/useAuth';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="cache-control" content="no-cache" />
        <meta name="expires" content="0" />
        <meta name="pragma" content="no-cache" />
      </head>
      <body className={inter.className}>
        <I18nProvider locale="en-US">
          <NextUIProvider locale="en-US">
            <NextThemesProvider attribute="class" defaultTheme="light">
              <AuthProvider>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--nextui-colors-background)',
                      color: 'var(--nextui-colors-foreground)',
                      border: '1px solid var(--nextui-colors-border)',
                      zIndex: 9999,
                    },
                  }}
                  containerStyle={{
                    zIndex: 9999,
                  }}
                />
              </AuthProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </I18nProvider>
      </body>
    </html>
  );
} 