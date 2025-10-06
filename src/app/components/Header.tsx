'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from './ThemeSwitcher'; 
export default function Header() {
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          ArtStore
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#products"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Coleção
          </Link>
          <Link href="/cart">
            <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors">
              Carrinho ({totalItems})
            </div>
          </Link>

          {session ? (
            <>
              {/* LINK ADICIONADO AQUI */}
              <Link
                href="/perfil"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Meus Pedidos
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 hidden sm:block">
                  Olá, {session.user?.name?.split(' ')[0]}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  Sair
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                Login
              </Link>
            </motion.div>
          )}
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}