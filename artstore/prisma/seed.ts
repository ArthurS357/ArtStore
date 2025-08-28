// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Deleta todos os produtos existentes para começar do zero
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      name: 'Cidade Majestosa',
      description: 'Uma vista panorâmica de uma cidade moderna ao entardecer.',
      price: 89.90,
      imageUrl: '/images/abstract-galaxy.jpg', 
    },
  });

  await prisma.product.create({
    data: {
      name: 'Ocean Sereno',
      description: 'Uma representação tranquila do oceano com tons suaves de azul.',
      price: 75.50,
      imageUrl: '/images/minimal-forest.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Black and White Elegance',
      description: 'Uma arte minimalista em preto e branco que traz elegância a qualquer ambiente.',
      price: 99.00,
      imageUrl: '/images/geometric-waves.jpg',
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });