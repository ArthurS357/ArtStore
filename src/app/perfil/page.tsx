'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiPackage, FiCalendar, FiDollarSign, FiShoppingBag } from 'react-icons/fi';

type OrderItemProduct = {
  name: string;
  imageUrl: string;
  price: number;
};

type OrderItem = {
  quantity: number;
  product: OrderItemProduct;
};

type Order = {
  id: string;
  amount: number;
  createdAt: string;
  items: OrderItem[];
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Falha ao buscar pedidos');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <p className="text-center p-8">Carregando seu histórico...</p>;
  }

   return (
    <main className="container mx-auto p-4 md:p-8 dark:bg-dark-background min-h-[calc(100vh-200px)]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-dark-text mb-2">
          Olá, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-dark-text-secondary mb-12">
          Aqui está o seu histórico de pedidos.
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center p-10 bg-white dark:bg-dark-surface rounded-xl shadow-md">
          <FiShoppingBag className="mx-auto text-5xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-dark-text mb-2">Nenhum pedido encontrado</h2>
          <p className="text-gray-500 dark:text-dark-text-secondary mb-6">Você ainda não fez nenhuma compra. Que tal explorar nossa coleção?</p>
          <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Ver Produtos
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-surface rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-border"
            >
              <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b dark:border-dark-border">
                {/* ... (conteúdo do cabeçalho do pedido) */}
              </div>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.product.name} className="flex items-center gap-4">
                    <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="rounded-md" />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800 dark:text-dark-text">{item.product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{item.quantity} x R$ {item.product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <p className="font-semibold text-gray-700 dark:text-dark-text">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}