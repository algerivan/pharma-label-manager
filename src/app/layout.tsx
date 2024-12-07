//* Types & Models
import type { Metadata } from 'next';
//* Providers
import { MainProvider } from './_components/Providers/main-provider';
//* Styles
import './globals.css';

export const metadata: Metadata = {
  title: 'Pharma Label Manager',
  description: 'Pharma Label Manager Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <MainProvider>
        <body>{children}</body>
      </MainProvider>
    </html>
  );
}
