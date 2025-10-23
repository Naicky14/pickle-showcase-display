import { ExternalLink } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full px-4 py-3 sm:px-6 sm:py-4 flex-shrink-0">
      <nav className="w-full max-w-7xl mx-auto flex justify-end">
        <a
          href="https://www.yannickboissieux.ch/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          Portfolio
          <ExternalLink className="w-4 h-4" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
