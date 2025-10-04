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
    <main className="container mx-auto p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Olá, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 mb-12">
          Aqui está o seu histórico de pedidos.
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center p-10 bg-white rounded-xl shadow-md">
          <FiShoppingBag className="mx-auto text-5xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Nenhum pedido encontrado</h2>
          <p className="text-gray-500 mb-6">Você ainda não fez nenhuma compra. Que tal explorar nossa coleção?</p>
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
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiPackage />
                  <span className="font-bold text-gray-700">Pedido:</span>
                  <span className="font-mono text-xs">#{order.id.substring(0, 8)}...</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar />
                  <span className="font-bold text-gray-700">Data:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-500">
                  <FiDollarSign />
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-indigo-600">R$ {order.amount.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.product.name} className="flex items-center gap-4">
                    <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="rounded-md" />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} x R$ {item.product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <p className="font-semibold text-gray-700">
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