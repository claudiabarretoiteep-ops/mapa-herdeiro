import React from 'react';
import { ArrowRight, BookOpen, Volume2, Sparkles } from 'lucide-react';
const ebookCover = "/eixos/images/eixo/v3/eixo0.png";

const Hero = () => {
    return (
        <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background-light">
            {/* Background Elements - Simulating texture/light */}
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-parchment opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent z-0"></div>

            <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest animate-fade-in">
                        <Sparkles className="w-3 h-3" />
                        Experiência Digital Imersiva
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-primary hero-title">
                        Você não está Perdido. <br />
                        <span className="text-3xl md:text-4xl lg:text-5xl italic text-secondary block mt-2">Está desalinhado.</span>
                    </h1>

                    <div className="w-20 h-1 bg-secondary"></div>

                    <p className="text-lg md:text-xl text-neutral-sage leading-relaxed max-w-lg">
                        Um ensaio conciso e prático sobre maturidade espiritual e governo interior.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="button"
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
                            className="btn-primary flex items-center justify-center gap-2 group text-center w-full sm:w-auto shadow-xl transition-all active:scale-95"
                        >
                            Acessar Experiência Digital
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => {
                                const el = document.getElementById('sobre');
                                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                            }}
                            className="btn-outline flex items-center justify-center text-center cursor-pointer bg-transparent"
                        >
                            Conhecer o Autor
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 pt-4">
                        <div className="flex items-center gap-3 text-sm text-neutral-sage font-bold uppercase tracking-wider">
                            <BookOpen className="w-5 h-5 text-secondary" />
                            Leitura Adaptativa
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-sage font-bold uppercase tracking-wider">
                            <Volume2 className="w-5 h-5 text-secondary" />
                            Audiobook & Eixo
                        </div>
                    </div>
                </div>

                {/* Image/Visual Content */}
                <div className="relative flex justify-center">
                    <div
                        className="relative z-10 rounded-xl shadow-2xl overflow-hidden border-4 md:border-8 border-white ebook-placeholder w-full max-w-[400px]"
                        style={{
                            background: 'linear-gradient(135deg, #1B3B5F 0%, #152C47 100%)',
                        }}
                    >
                        {/* Camada de brilho dourado como placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent opacity-30 z-0"></div>

                        <img
                            src={ebookCover}
                            alt="Novo Leitor Digital Mapa do Herdeiro"
                            width="400"
                            height="533"
                            fetchpriority="high"
                            loading="eager"
                            decoding="async"
                            className="w-full h-auto object-cover relative z-10 transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary/30 z-0 rounded-xl"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
