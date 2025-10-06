-----

# 🎨 ArtStore - E-commerce Full-Stack

\<p align="center"\>
\<img src="[https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)" alt="Next.js"\>
\<img src="[https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)" alt="TypeScript"\>
\<img src="[https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)" alt="Prisma"\>
\<img src="[https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)" alt="PostgreSQL"\>
\<img src="[https://img.shields.io/badge/Tailwind\_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)" alt="Tailwind CSS"\>
\</p\>

\<p align="center"\>
Um projeto de e-commerce completo para demonstrar as melhores práticas de desenvolvimento web moderno, com Next.js 14 App Router.
<br>
\<em\>A complete e-commerce project to demonstrate modern web development best practices, featuring Next.js 14 App Router.\</em\>
\</p\>

\<p align="center"\>
\<a href="[https://art-store-steel.vercel.app/](https://art-store-steel.vercel.app/)"\>\<strong\>Ver Demo / View Demo »\</strong\>\</a\>
\</p\>

<br>

\<details\>
\<summary\>\<strong\>🇧🇷 README em Português\</strong\>\</summary\>
<br>

## ✨ Sobre o Projeto

O ArtStore é uma aplicação web full-stack que simula uma loja virtual para a venda de arte digital e posters. O projeto foi desenvolvido do zero como um item de portfólio, utilizando as funcionalidades mais recentes do Next.js (App Router). Ele cobre todo o ciclo de vida de uma aplicação, desde a modelagem do banco de dados e APIs até a criação de uma interface de usuário interativa, reativa e segura, finalizando com o deploy em um ambiente de produção.

-----

## 🚀 Funcionalidades

  - **Catálogo de Produtos:** Exibição de produtos carregados de um banco de dados PostgreSQL, com páginas de detalhes para cada item.
  - **Busca em Tempo Real:** Filtro de produtos por nome ou descrição na página inicial, com performance otimizada através de *debounce*.
  - **Autenticação Completa:** Sistema de registro e login de usuários com senhas criptografadas, utilizando **NextAuth.js** com `CredentialsProvider`.
  - **Rotas Protegidas:** Uso de **Middleware** para proteger páginas como a de perfil, exigindo autenticação para acesso.
  - **Carrinho de Compras:** Estado global gerenciado com React Context, com funcionalidades para adicionar, remover e alterar a quantidade de itens.
  - **Persistência de Dados:** O carrinho do usuário é salvo no **LocalStorage**, mantendo os itens mesmo após recarregar a página.
  - **Checkout e Histórico de Pedidos:** Fluxo de finalização de compra que cria um pedido no banco de dados. Os usuários autenticados podem visualizar seu histórico de compras na página de perfil.
  - **Interface Moderna e Responsiva:** Design construído com Tailwind CSS, totalmente responsivo e com suporte a **Dark Mode** (tema escuro).
  - **Animações Fluidas:** Interface enriquecida com animações sutis utilizando **Framer Motion** para uma experiência de usuário mais agradável.
  - **Feedback Visual:** Notificações "toast" (`react-hot-toast`) para ações como adicionar itens ao carrinho, login e registro.
  - **Testes Automatizados:** Cobertura de testes para componentes e páginas utilizando **Jest** e **React Testing Library**.
  - **Integração Contínua (CI):** Workflow com **GitHub Actions** para rodar os testes automaticamente a cada `push` e `pull request`, garantindo a qualidade do código.

-----

## 🛠️ Tecnologias Utilizadas

  - **Framework:** Next.js 14 (App Router)
  - **Linguagem:** TypeScript
  - **Banco de Dados:**
      - **ORM:** Prisma
      - **Produção:** PostgreSQL
      - **Desenvolvimento:** SQLite
  - **Autenticação:** NextAuth.js (Auth.js)
  - **Estilização:** Tailwind CSS
  - **Animações:** Framer Motion
  - **Validação de Formulários/API:** Zod
  - **Notificações:** React Hot Toast
  - **Ícones:** React Icons
  - **Testes:** Jest, React Testing Library
  - **CI/CD:** GitHub Actions
  - **Deploy:** Vercel

-----

## 🏁 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o ArtStore na sua máquina.

### Pré-requisitos

  - Node.js (v20.x ou superior)
  - npm ou yarn

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ArthurS357/ArtStore.git
    cd ArtStore
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
      - Crie um arquivo chamado `.env` na raiz do projeto (você pode duplicar o `.env.example` se ele existir).
      - Adicione as seguintes variáveis:
        ```
        # URL do banco de dados (para desenvolvimento local com SQLite)
        DATABASE_URL="file:./prisma/dev.db"

        # Chave secreta para o NextAuth.js
        # Gere uma em: https://generate-secret.vercel.app/32
        NEXTAUTH_SECRET="SUA_CHAVE_SECRETA_AQUI"
        ```
4.  **Configure o Banco de Dados com Prisma:**
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

## 🧪 Testes

Para executar os testes unitários e de integração, utilize o comando:

```bash
npm test
```

-----

## 👨‍💻 Autor

  - **Arthur S.** - [LinkedIn](https://www.linkedin.com/in/arthur-sabino1337-/)

\</details\>

<br>

\<details\>
\<summary\>\<strong\>🇬🇧 README in English\</strong\>\</summary\>
<br>

## ✨ About the Project

ArtStore is a full-stack web application that simulates a virtual store for selling digital art and posters. The project was developed from scratch as a portfolio item, using the latest features of Next.js (App Router). It covers the entire application lifecycle, from database and API modeling to creating an interactive, reactive, and secure user interface, finishing with deployment to a production environment.

-----

## 🚀 Features

  - **Product Catalog:** Displays products loaded from a PostgreSQL database, with detail pages for each item.
  - **Real-Time Search:** Filter products by name or description on the home page, with performance optimization through *debounce*.
  - **Complete Authentication:** User registration and login system with encrypted passwords using **NextAuth.js** with a `CredentialsProvider`.
  - **Protected Routes:** Use of **Middleware** to protect pages like the profile, requiring authentication for access.
  - **Shopping Cart:** Global state managed with React Context, with features to add, remove, and change item quantities.
  - **Data Persistence:** The user's cart is saved in **LocalStorage**, keeping items even after reloading the page.
  - **Checkout and Order History:** A checkout flow that creates an order in the database. Authenticated users can view their purchase history on their profile page.
  - **Modern and Responsive Interface:** Design built with Tailwind CSS, fully responsive, and with **Dark Mode** support.
  - **Fluid Animations:** Interface enriched with subtle animations using **Framer Motion** for a more pleasant user experience.
  - **Visual Feedback:** "Toast" notifications (`react-hot-toast`) for actions like adding items to the cart, logging in, and registering.
  - **Automated Tests:** Test coverage for components and pages using **Jest** and **React Testing Library**.
  - **Continuous Integration (CI):** Workflow with **GitHub Actions** to automatically run tests on every `push` and `pull request`, ensuring code quality.

-----

## 🛠️ Technologies Used

  - **Framework:** Next.js 14 (App Router)
  - **Language:** TypeScript
  - **Database:**
      - **ORM:** Prisma
      - **Production:** PostgreSQL
      - **Development:** SQLite
  - **Authentication:** NextAuth.js (Auth.js)
  - **Styling:** Tailwind CSS
  - **Animations:** Framer Motion
  - **Form/API Validation:** Zod
  - **Notifications:** React Hot Toast
  - **Icons:** React Icons
  - **Testing:** Jest, React Testing Library
  - **CI/CD:** GitHub Actions
  - **Deployment:** Vercel

-----

## 🏁 How to Run the Project Locally

Follow the steps below to run ArtStore on your machine.

### Prerequisites

  - Node.js (v20.x or higher)
  - npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArthurS357/ArtStore.git
    cd ArtStore
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the Environment Variables:**
      - Create a file named `.env` in the project root (you can duplicate `.env.example` if it exists).
      - Add the following variables:
        ```
        # Database URL (for local development with SQLite)
        DATABASE_URL="file:./prisma/dev.db"

        # Secret key for NextAuth.js
        # Generate one at: https://generate-secret.vercel.app/32
        NEXTAUTH_SECRET="YOUR_SECRET_KEY_HERE"
        ```
4.  **Set up the Database with Prisma:**
      - Run the migration to create the local database tables:
        ```bash
        npx prisma migrate dev
        ```
      - (Optional) Seed the database with sample data:
        ```bash
        npm run prisma:seed
        ```
5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

-----

## 🧪 Testing

To run the unit and integration tests, use the following command:

```bash
npm test
```

-----

## 👨‍💻 Author

  - **Arthur S.** - [LinkedIn](https://www.linkedin.com/in/arthur-sabino1337-/)

\</details\>
