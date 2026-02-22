import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background-light">
            {/* Background Elements - Simulating texture/light */}
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-parchment opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent z-0"></div>

            <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8">
                    <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary-dark text-xs font-bold tracking-widest uppercase mb-2">
                        Presente de Honra
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-primary">
                        Você não está perdido. <br />
                        <span className="italic text-secondary">Está desalinhado.</span>
                    </h1>

                    <div className="w-20 h-1 bg-secondary"></div>

                    <p className="text-lg md:text-xl text-neutral-sage leading-relaxed max-w-lg">
                        Descubra os 7 sinais de que você é herdeiro, mas ainda vive abaixo da sua estrutura espiritual.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#baixar" className="btn-primary flex items-center justify-center gap-2 group">
                            Baixar Agora
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#sobre" className="btn-outline flex items-center justify-center">
                            Saber Mais
                        </a>
                    </div>
                </div>

                {/* Image/Visual Content */}
                <div className="relative">
                    <div className="relative z-10 rounded shadow-2xl overflow-hidden border-8 border-white">
                        {/* Placeholder for Rabbi's image or Book Cover */}
                        <div className="aspect-[3/4] bg-primary/80 flex items-center justify-center text-white p-8 text-center">
                            <div className="space-y-4">
                                <span className="block font-serif text-2xl italic tracking-wider opacity-80">
                                    "O conhecimento ilumina o caminho."
                                </span>
                                <span className="block text-sm uppercase tracking-widest mt-4 border-t border-white/30 pt-4 inline-block">
                                    Rabino Marcos Barreto
                                </span>
                            </div>
                        </div>
                        {/* Real image will go here: <img src="/path/to/image.jpg" alt="Ebook Cover" className="w-full h-full object-cover" /> */}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary/30 z-0 rounded"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
