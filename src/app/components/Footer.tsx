import { FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 mt-12 py-6 border-t border-gray-200">
      <div className="container mx-auto px-8 text-center text-gray-500">
        
        <div className="flex justify-center items-center gap-6 mb-4">
          <a 
            href="https://github.com/ArthurS357/ArtStore" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <FiGithub size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/arthur-sabino1337-/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <FiLinkedin size={24} />
          </a>
        </div>

        <p className="text-sm">
          Desenvolvido por Arthur S.
        </p>
        <p className="text-xs mt-2">
          &copy; {currentYear} ArtStore. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
