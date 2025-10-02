'use client';

import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }, 
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/product/${id}`);
          if (!response.ok) {
            throw new Error('Produto não encontrado');
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Falha ao buscar produto:", error);
          setProduct(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} foi adicionado ao carrinho!`);
    }
  };

  if (isLoading) return <p className="text-center p-8">Carregando detalhes do produto...</p>;
  if (!product) return <p className="text-center p-8">Produto não encontrado.</p>;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Coluna da Imagem */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <Image
              src={product.imageUrl}
              alt={`Imagem principal da obra de arte ${product.name}`}
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </motion.div>

          {/* Coluna dos Detalhes */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 flex flex-col justify-center"
          >
            <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4">{product.name}</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-6">{product.description}</motion.p>
            
            <motion.div variants={itemVariants}>
              <span className="text-4xl font-extrabold text-indigo-600 block mb-6">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white text-lg font-semibold py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Adicionar ao Carrinho
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
