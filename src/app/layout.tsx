import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Estrela sem censura',
  description:
    'Foste silenciado pela página oficial do Estrela da Amadora no Facebook? Aqui podes comentar à vontade!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>

        <footer className="flex justify-center mx-auto text-gray-300 text-sm mb-8 gap-6">
          <Link href="/privacidade" className="hover:underline">
            Privacidade
          </Link>
        </footer>
      </body>
    </html>
  );
}
