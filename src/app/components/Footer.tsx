export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-8 py-4 text-center text-gray-500">
        <p>&copy; {currentYear} ArtStore. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}