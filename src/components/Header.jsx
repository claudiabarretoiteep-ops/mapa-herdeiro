import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-secondary" />
                    <span className="font-serif text-xl font-bold text-primary tracking-wide leading-none">
                        ACESSO À SALA DO MAPA
                    </span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 items-center">
                    <a href="#inicio" className="text-primary hover:text-secondary transition-colors font-medium">Início</a>
                    <a href="#sobre" className="text-primary hover:text-secondary transition-colors font-medium">Sobre</a>
                    <a href="#contato" className="text-primary hover:text-secondary transition-colors font-medium">Contato</a>
                    <a href="#baixar" className="btn-primary py-2 px-6 text-xs">
                        Baixar Ebook
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full p-4 flex flex-col gap-4 shadow-lg">
                    <a href="#inicio" className="block text-primary py-2" onClick={() => setIsOpen(false)}>Início</a>
                    <a href="#sobre" className="block text-primary py-2" onClick={() => setIsOpen(false)}>Sobre</a>
                    <a href="#contato" className="block text-primary py-2" onClick={() => setIsOpen(false)}>Contato</a>
                    <a href="#baixar" className="btn-primary text-center block" onClick={() => setIsOpen(false)}>
                        Baixar Ebook
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
