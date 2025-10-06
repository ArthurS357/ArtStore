import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from './components/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtStore - Venda de Arte Digital',
  description: 'Sua loja online de posters e arte digital.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col min-h-screen`}
      >
        <link rel="preload" href="/images/hero-bg.webp" as="image" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <Toaster position="bottom-center" />
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}