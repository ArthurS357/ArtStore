'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Entrando...');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    toast.dismiss(toastId);

    if (result?.error) {
      toast.error('Email ou senha inválidos.');
    } else {
      toast.success('Login bem-sucedido!');
      router.push('/');
      router.refresh();
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg dark:border dark:border-dark-border"
      >
        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 dark:text-dark-text mb-8">
            Bem-vindo de volta!
          </motion.h2>
          
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                id="email" 
                type="email"
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 pl-10 border border-gray-300 dark:border-dark-border rounded-lg text-gray-800 dark:text-dark-text bg-white dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="password" className="sr-only">Senha</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                id="password" 
                type="password"
                placeholder="Senha"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 pl-10 border border-gray-300 dark:border-dark-border rounded-lg text-gray-800 dark:text-dark-text bg-white dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                required 
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Entrar
            </button>
          </motion.div>
        </motion.form>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 dark:text-dark-text-secondary mt-6"
        >
          Não tem uma conta? <Link href="/registro" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Registre-se</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}