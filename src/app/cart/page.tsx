'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, checkout } = useCart();
  const router = useRouter();
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
  };

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <FiShoppingCart className="mx-auto text-6xl text-gray-400 dark:text-gray-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-dark-text">Seu carrinho está vazio</h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
            Adicione belas artes à sua coleção hoje mesmo.
          </p>
          <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            Ver Coleção
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-dark-text"
      >
        Seu Carrinho
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Coluna dos itens do carrinho */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="grid grid-cols-12 gap-4 items-center bg-white dark:bg-dark-surface p-4 rounded-xl shadow-lg border border-slate-200 dark:border-dark-border"
              >
                <Image
                  src={item.imageUrl}
                  alt={`Miniatura da obra de arte ${item.name}`}
                  width={100}
                  height={100}
                  className="col-span-3 md:col-span-2 w-full h-auto object-cover rounded-lg"
                />
                <div className="col-span-9 md:col-span-4">
                  <h2 className="font-semibold text-lg text-slate-800 dark:text-dark-text">{item.name}</h2>
                  <p className="text-slate-500 dark:text-dark-text-secondary">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="col-span-6 md:col-span-3 flex items-center justify-center gap-3">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => decreaseQuantity(item.id)} className="p-2 bg-slate-100 dark:bg-gray-700 text-slate-800 dark:text-dark-text rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"><FiMinus /></motion.button>
                  <span className="text-slate-800 dark:text-dark-text font-medium text-lg w-8 text-center">{item.quantity}</span>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => increaseQuantity(item.id)} className="p-2 bg-slate-100 dark:bg-gray-700 text-slate-800 dark:text-dark-text rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"><FiPlus /></motion.button>
                </div>
                <div className="col-span-4 md:col-span-2 text-right text-lg font-bold text-slate-900 dark:text-dark-text">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </div>
                <div className="col-span-2 md:col-span-1 text-right">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <FiTrash2 size={20}/>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Coluna do resumo do pedido */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg h-fit border border-slate-200 dark:border-dark-border"
        >
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-dark-text">Resumo do Pedido</h2>
          <div className="space-y-4 text-slate-600 dark:text-dark-text-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900 dark:text-dark-text">R$ {totalCost.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span className="font-medium text-slate-900 dark:text-dark-text">Grátis</span>
            </div>
          </div>
          <hr className="my-6 border-slate-200 dark:border-dark-border" />
          <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-dark-text">
            <span>Total</span>
            <span>R$ {totalCost.toFixed(2).replace('.', ',')}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Finalizar Compra
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}