export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - images (imagens públicas)
     * - favicon.ico (arquivo de favicon)
     * - login (página de login)
     * - registro (página de registro)
     */
    '/((?!api/|_next/static|_next/image|images|favicon.ico|login|registro).*)',
  ],
};
