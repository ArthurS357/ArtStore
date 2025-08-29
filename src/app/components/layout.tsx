import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtStore - Venda de Arte Digital',
  description: 'Sua loja online de posters e arte digital.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <CartProvider>
          {}
          <Toaster position="bottom-center" />
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}