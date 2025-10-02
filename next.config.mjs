/** @type {import('next').NextConfig} */
const nextConfig = {
};

// Importa o plugin do bundle analyzer
import nextBundleAnalyzer from '@next/bundle-analyzer';

// Configura o analyzer para rodar apenas quando a variável ANALYZE for 'true'
const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Exporta a configuração "envolvida" pelo analyzer
export default withBundleAnalyzer(nextConfig);