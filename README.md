# 🎨 ArtStore - E-commerce Full-Stack

![Página Inicial do ArtStore](https://i.imgur.com/vHq4eYl.png) <p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<p align="center">
  Um projeto de e-commerce completo, construído para demonstrar as melhores práticas de desenvolvimento web moderno.
</p>

<p align="center">
  <a href="[https://art-store-steel.vercel.app/]"><strong>Ver Demonstração Ao Vivo »</strong></a>
</p>

## ✨ Sobre o Projeto

ArtStore é uma aplicação web full-stack que simula uma loja virtual para a venda de arte digital e posters. O projeto foi desenvolvido do zero como um item de portfólio, cobrindo todo o ciclo de vida de uma aplicação, desde a modelagem do banco de dados e APIs até a criação de uma interface de usuário interativa, reativa e segura, finalizando com o deploy em um ambiente de produção.

---

## 🚀 Funcionalidades

- **Catálogo de Produtos:** Exibição de produtos carregados de um banco de dados PostgreSQL.
- **Busca em Tempo Real:** Filtro de produtos por nome ou descrição, com otimização de performance através de *debounce*.
- **Autenticação Completa:** Sistema de registro e login de usuários com senhas criptografadas, utilizando **NextAuth.js**.
- **Rotas Protegidas:** Uso de **Middleware** para proteger páginas (como o carrinho) e exigir autenticação.
- **Carrinho de Compras:** Estado global gerenciado com React Context, com funcionalidades para adicionar, remover e alterar a quantidade de itens.
- **Persistência de Dados:** O carrinho do usuário é salvo no **LocalStorage**, mantendo os itens mesmo após recarregar a página.
- **Checkout Simulado:** Fluxo de finalização de compra que leva a uma página de sucesso.
- **Interface Moderna:** Design responsivo construído com Tailwind CSS e animações fluidas com **Framer Motion**.
- **Feedback Visual:** Notificações "toast" (`react-hot-toast`) para ações como adicionar itens ao carrinho e login.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Banco de Dados:** Prisma (ORM), PostgreSQL (Produção), SQLite (Desenvolvimento)
- **Autenticação:** NextAuth.js (Auth.js)
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Notificações:** React Hot Toast
- **Ícones:** React Icons
- **Deploy:** Vercel

---

## 🏁 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o ArtStore na sua máquina.

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Passos

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/](https://github.com/)[ArthurS357]/artstore.git
   cd artstore
````

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**

      - Crie um arquivo chamado `.env` na raiz do projeto.
      - Copie o conteúdo do arquivo `.env.example` (se você tiver um) ou adicione as seguintes variáveis:
        ```
        # URL do banco de dados (para desenvolvimento local com SQLite)
        DATABASE_URL="file:./dev.db"

        # Chave secreta para o NextAuth.js
        # Gere uma em: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
        NEXTAUTH_SECRET="SUA_CHAVE_SECRETA_AQUI"
        ```

4.  **Configure o Banco de Dados:**

      - Execute a migração para criar as tabelas do banco de dados local:
        ```bash
        npx prisma migrate dev
        ```
      - (Opcional) Popule o banco com dados de exemplo:
        ```bash
        npm run prisma:seed
        ```

5.  **Rode o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador para ver o resultado.

-----

## 👨‍💻 Autor

  - **[Arthur S.]** - [(https://www.linkedin.com/in/arthur-sabino1337-/)]

<!-- end list -->

```
```