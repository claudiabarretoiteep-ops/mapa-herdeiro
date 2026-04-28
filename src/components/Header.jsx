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
                        MAPA DO HERDEIRO
                    </span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 items-center">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-transparent border-none cursor-pointer text-primary hover:text-secondary transition-colors font-medium">Início</button>
                    <button onClick={() => {
                        const el = document.getElementById('sobre');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }} className="bg-transparent border-none cursor-pointer text-primary hover:text-secondary transition-colors font-medium">Sobre</button>
                    <button onClick={() => {
                        const el = document.getElementById('baixar');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }} className="bg-transparent border-none cursor-pointer text-primary hover:text-secondary transition-colors font-medium">Contato</button>
                    <button
                        onClick={() => {
                            const element = document.getElementById('baixar');
                            if (element) {
                                const offset = 80;
                                const bodyRect = document.body.getBoundingClientRect().top;
                                const elementRect = element.getBoundingClientRect().top;
                                const elementPosition = elementRect - bodyRect;
                                const offsetPosition = elementPosition - offset;

                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-lg text-xs border-none cursor-pointer transition-all active:scale-95 shadow-md"
                    >
                        Receber o e-book
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full p-4 flex flex-col gap-4 shadow-lg">
                    <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }} className="text-left text-primary py-2 bg-transparent border-none cursor-pointer">Início</button>
                    <button onClick={() => {
                        const el = document.getElementById('sobre');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                        setIsOpen(false);
                    }} className="text-left text-primary py-2 bg-transparent border-none cursor-pointer">Sobre</button>
                    <button onClick={() => {
                        const el = document.getElementById('baixar');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                        setIsOpen(false);
                    }} className="text-left text-primary py-2 bg-transparent border-none cursor-pointer">Contato</button>
                    <button onClick={() => {
                        const element = document.getElementById('baixar');
                        if (element) {
                            const offset = 80;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                        setIsOpen(false);
                    }} className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 rounded-lg text-center block w-full border-none cursor-pointer shadow-lg outline-none">
                        Receber o e-book
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
