export { default } from "next-auth/middleware";

// Apenas as rotas listadas abaixo serão protegidas e exigirão login.
export const config = {
  matcher: [
    '/perfil/:path*',   // Protege a página de perfil
    '/cart/:path*',     // Protege a página do carrinho
    '/product/:path*',  // Protege todas as páginas de detalhes de produto
  ],
};
