'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

export default function SuccessPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.6
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <FiCheckCircle className="text-green-500 text-7xl" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl font-extrabold text-green-600 mb-4">
          Compra Finalizada!
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-700 mb-4">
          Seu pedido foi processado com sucesso.
        </motion.p>
        
        <motion.p variants={itemVariants} className="text-gray-500 mb-8">
          Um e-mail de confirmação será enviado em breve.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link 
            href="/" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Voltar para a Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}