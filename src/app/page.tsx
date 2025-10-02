'use client';

import { useState, useEffect } from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants} 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl"
    >
      <Link 
        href={`/product/${product.id}`} 
        className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
      >
        <div className="bg-white rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
          <div className="overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={`Poster da obra de arte chamada ${product.name}`} 
              width={400}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{product.description.substring(0, 50)}...</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-indigo-600">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                Ver detalhes →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products`);
        if (!response.ok) throw new Error('Falha ao buscar produtos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialProducts();
  }, []); 
  useEffect(() => {
    if (searchTerm === '' && products.length > 0) return;

    const delayDebounceFn = setTimeout(() => {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/products?search=${searchTerm}`);
          if (!response.ok) throw new Error('Falha ao buscar produtos');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Erro ao buscar com busca:", error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      };
      
      if (products.length > 0 || searchTerm !== '') {
         fetchProducts();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


  return (
    <main className="min-h-screen bg-gray-100">
      <div
        className="relative text-white flex items-center justify-center p-16"
        style={{
          backgroundImage: `url('/images/hero-bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-2xl"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-4">
            Inspire-se. Decore sua vida.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg mb-8 opacity-90">
            Descubra uma coleção única de arte digital e posters para transformar seu espaço.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="#products"
              className="bg-indigo-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Ver Coleção
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <section id="products" className="container mx-auto p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Nossa Coleção de Arte
        </motion.h2>

        <div className="mb-12 relative max-w-lg mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {isLoading ? (
          <p className="text-center">Buscando...</p>
        ) : (
          <motion.div
            key={searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado para sua busca.</p>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
}