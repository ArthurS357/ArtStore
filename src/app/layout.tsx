import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from './components/AuthProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtStore - Venda de Arte Digital',
  description: 'Sua loja online de posters e arte digital.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-100 flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-center" />
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}