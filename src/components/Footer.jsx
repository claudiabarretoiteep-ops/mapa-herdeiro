import React from 'react';
import { Instagram, Youtube, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-3xl md:text-4xl text-secondary font-bold tracking-wide">
                            Ecossistema do Herdeiro
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Uma iniciativa do Rabino Marcos Barreto para reconectar você aos fundamentos da fé e viver uma vida prática guiada pelas Escrituras — com clareza, maturidade e direção.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-sm uppercase tracking-widest text-white/50">Links Rápidos</h5>
                        <div className="flex flex-col gap-2 text-sm text-gray-300">
                            <a href="#inicio" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Início</a>
                            <a href="#sobre" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Sobre</a>
                            <a href="#baixar" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Receber eBook</a>
                            <a href="#/termos" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Termos de Uso</a>
                            <a href="#/privacidade" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Políticas de Privacidade</a>
                        </div>
                    </div>

                    {/* Social / Contact */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-sm uppercase tracking-widest text-white/50">Conecte-se</h5>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/rabinomarcosbarreto.oficial/" target="_blank" rel="noopener noreferrer" aria-label="Siga o Rabino Marcos Barreto no Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.youtube.com/prmarcosbarreto" target="_blank" rel="noopener noreferrer" aria-label="Siga o Canal do Rabino Marcos Barreto no Youtube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-black transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=5537991494464&text=Pra.%20Cl%C3%A1udia%20%20Barreto,%20ITEEP-%20ESCOLA%20DE%20PROFETAS/%20INSTITUTO%20%20MARCOS%20BARRETO" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                            <a href="mailto:contato@mapadoherdeiro.com.br" aria-label="Envie um e-mail para nós" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-black transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="text-sm text-gray-200 space-y-1">
                            <p>Email: contato@mapadoherdeiro.com.br</p>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-gray-400">
                    <p>© 2026 Ecossistema do Herdeiro. Todos os direitos reservados. Parte do Instituto Marcos Barreto.</p>
                    <p>Desenvolvido com excelência estratégica by Cláudia Barreto</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
