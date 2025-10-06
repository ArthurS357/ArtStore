'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-surface shadow-md dark:border-b dark:border-dark-border">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          ArtStore
        </Link>

        {/* Links para Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 dark:text-dark-text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
          <Link href="/#products" className="text-gray-600 dark:text-dark-text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Coleção</Link>
          <Link href="/cart">
            <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors">
              Carrinho ({totalItems})
            </div>
          </Link>

          {session ? (
            <>
              <Link href="/perfil" className="text-gray-600 dark:text-dark-text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Meus Pedidos</Link>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-dark-text-secondary hidden sm:block">
                  Olá, {session.user?.name?.split(' ')[0]}
                </span>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">Sair</motion.button>
              </div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login" className="bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-dark-text px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">Login</Link>
            </motion.div>
          )}
          <ThemeSwitcher />
        </div>
        
        {/* Botão de Menu para Mobile */}
        <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
      </nav>

      {/* Menu Dropdown Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-dark-surface absolute w-full shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="py-2">Home</Link>
              <Link href="/#products" onClick={() => setIsMenuOpen(false)} className="py-2">Coleção</Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="py-2">Carrinho ({totalItems})</Link>
              {session ? (
                <>
                  <Link href="/perfil" onClick={() => setIsMenuOpen(false)} className="py-2">Meus Pedidos</Link>
                  <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="bg-red-500 text-white px-4 py-2 rounded-lg">Sair</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-gray-200 dark:bg-dark-border px-4 py-2 rounded-lg">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
