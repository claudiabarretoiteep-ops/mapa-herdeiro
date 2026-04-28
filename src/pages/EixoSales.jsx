import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Star, Layout, Eye, Headphones, Target } from 'lucide-react';
import colecaoData from '../data/colecao.json';

const EixoSales = ({ eixoId, onNavigate }) => {
    const eixo = colecaoData.eixos.find(e => e.id === eixoId) || colecaoData.eixos[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eixoId]);

    // Definição de cores por Eixo (Sutil diferenciação)
    const axisColors = {
        primary: "#1A365D", // Azul Sabedoria
        accent: "#B8860B",  // Ouro
        bgLight: "#FAF9F6", // Pergaminho
        textMain: "#2D3748",
        textMuted: "#718096"
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#2D3748] font-sans selection:bg-[#C9A84C] selection:text-white antialiased overflow-x-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                
                .font-serif-premium { font-family: 'Playfair Display', serif; }
                .font-cinzel { font-family: 'Cinzel', serif; }
                
                .bg-parchment {
                    background-color: #FAF9F6;
                    background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
                }

                .hero-label {
                    background: #FDF9F0;
                    border: 1px solid #E8D08A;
                    color: #B8860B;
                    padding: 4px 16px;
                    border-radius: 99px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }

                .btn-golden {
                    background: #D4AF37;
                    color: white;
                    padding: 14px 28px;
                    border-radius: 4px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 12px;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                }

                .btn-golden:hover {
                    background: #B8860B;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(184, 134, 11, 0.2);
                }

                .btn-outline {
                    border: 2px solid #1A365D;
                    color: #1A365D;
                    padding: 14px 28px;
                    border-radius: 4px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }

                .feature-card {
                    background: #F8FAFC;
                    padding: 40px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    border-bottom: 3px solid transparent;
                }

                .feature-card:hover {
                    background: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    border-bottom: 3px solid #D4AF37;
                    transform: translateY(-5px);
                }

                .discover-box {
                    background: #FDF9F0;
                    border-radius: 8px;
                    padding: 60px;
                    border: 1px solid #E8D08A;
                }
            `}} />

            {/* HEADER FIXO */}
            <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
                <div className="container mx-auto px-12 py-4 flex justify-between items-center max-w-7xl">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('#/')}>
                        <BookOpen className="w-8 h-8 text-[#B8860B]" />
                        <span className="font-cinzel text-xl font-bold text-[#1A365D] tracking-wide">
                            MAPA DO HERDEIRO
                        </span>
                    </div>

                    <nav className="hidden md:flex gap-8 items-center">
                        <button onClick={() => onNavigate('#/')} className="bg-transparent border-none cursor-pointer text-[#1A365D] hover:text-[#B8860B] transition-colors font-bold uppercase tracking-widest text-[11px]">Início</button>
                        <button onClick={() => onNavigate('#/')} className="bg-transparent border-none cursor-pointer text-[#1A365D] hover:text-[#B8860B] transition-colors font-bold uppercase tracking-widest text-[11px]">Sobre</button>
                        <button onClick={() => onNavigate('#/')} className="bg-transparent border-none cursor-pointer text-[#1A365D] hover:text-[#B8860B] transition-colors font-bold uppercase tracking-widest text-[11px]">Contato</button>
                        <a
                            href={eixo.id === 0 ? "#/ler-online" : eixo.voomp_link}
                            className="bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bold py-2 px-6 rounded-lg text-[10px] uppercase tracking-widest transition-all shadow-md no-underline"
                        >
                            {eixo.id === 0 ? "Receber o e-book" : "Adquirir agora"}
                        </a>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="pt-48 pb-24 px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8 animate-fade-in">
                    <span className="hero-label">✨ EXPERIÊNCIA DIGITAL IMERSIVA</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-primary hero-title">
                        {eixo.titulo.includes('|') ? (
                            eixo.titulo.split('|').map((line, index, array) => {
                                const isGold = index === 1 && [1, 2, 3, 4, 5].includes(eixo.id);

                                const lineClasses = isGold
                                    ? "text-3xl md:text-4xl lg:text-5xl italic text-[#D4AF37] block mt-2"
                                    : index === 0
                                        ? ""
                                        : "text-3xl md:text-4xl lg:text-5xl block mt-2";

                                return (
                                    <span key={index} className={lineClasses}>
                                        {line.trim()}
                                        {index < array.length - 1 && <br />}
                                    </span>
                                );
                            })
                        ) : (
                            <span className="block">{eixo.titulo}</span>
                        )}
                    </h1>
                    {eixo.id !== 0 && <div className="w-24 h-1.5 bg-[#D4AF37] mb-8"></div>}
                    <p className="text-xl text-[#718096] leading-relaxed max-w-xl font-light">
                        {eixo.subtitulo}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                            href={eixo.id === 0 ? `#/ler-online` : (eixo.voomp_link === "#" ? `#/leitura?eixo=${eixo.id}` : eixo.voomp_link)}
                            className="btn-golden"
                        >
                            {eixo.id === 0 ? "ACESSAR GRATUITAMENTE" : (eixo.voomp_link === "#" ? "ACESSAR EXPERIÊNCIA" : "ADQUIRIR EXPERIÊNCIA DIGITAL")}
                            <ArrowRight size={16} />
                        </a>
                        <button onClick={() => window.location.hash = "#/"} className="btn-outline">Conhecer o Autor</button>
                    </div>
                    {![2, 3, 4].includes(eixo.id) && (
                        <div className="flex gap-8 pt-6">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#718096]">
                                <BookOpen size={14} className="text-[#B8860B]" />
                                LEITURA ADAPTATIVA
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#718096]">
                                <Headphones size={14} className="text-[#B8860B]" />
                                AUDIOBOOK & EIXO
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative group">
                    <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-lg shadow-sm border border-slate-100">
                        <img
                            src={eixo.capa_v2}
                            alt={`Capa Eixo ${eixo.id} Minimalista`}
                            className="w-full h-auto shadow-2xl rounded-sm transform transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2 - EXPERIÊNCIA */}
            <section className="py-24 px-12 bg-white">
                <div className="max-w-7xl mx-auto text-center space-y-6 mb-20">
                    <h2 className="font-serif-premium text-4xl md:text-5xl font-bold text-[#1A365D]">Uma Experiência de Sabedoria Digital</h2>
                    <p className="text-[#718096] max-w-2xl mx-auto font-light leading-relaxed">Muito mais que um livro digital, você está acessando um portal de realinhamento projetado para sua jornada de herdeiro.</p>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <BookOpen />, title: "Leitura Premium", desc: "Acesse o conteúdo em um leitor digital sofisticado, otimizado para qualquer tela." },
                        { icon: <Eye />, title: "Conforto Visual", desc: "Ajuste o tamanho da letra e escolha temas (Claro/Escuro) para melhorar sua leitura." },
                        { icon: <Headphones />, title: "Leitura Imersiva", desc: "Ouça o conteúdo na própria voz do Rabino Marcos, potencializando a compreensão." },
                        { icon: <Target />, title: "Eixo de Alinhamento", desc: "Reflexões guiadas em cada etapa pelo Rabino, para cada capítulo da jornada." }
                    ].map((feature, idx) => (
                        <div key={idx} className="feature-card group">
                            <div className="text-[#D4AF37] mb-6 transform transition-transform group-hover:scale-110 duration-300">
                                {React.cloneElement(feature.icon, { size: 28 })}
                            </div>
                            <h3 className="font-serif-premium text-xl font-bold text-[#1A365D] mb-4">{feature.title}</h3>
                            <p className="text-sm text-[#718096] leading-relaxed font-light">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEÇÃO 3 - DESCOBERTAS DINÂMICAS (ARQUÉTIPO DO SÁBIO) */}
            <section className="py-24 px-12 bg-parchment">
                <div className="max-w-6xl mx-auto discover-box shadow-xl bg-white border-white/50">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="font-serif-premium text-4xl md:text-5xl font-bold text-[#1A365D]">Nesta experiência, você vai descobrir:</h2>
                            <div className="space-y-6">
                                {(eixo.discoveries || []).map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="mt-1 w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                                            <CheckCircle2 size={12} />
                                        </div>
                                        <span className="text-lg font-light text-[#4A5568] opacity-80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/80">
                            <img src={eixo.context_image} alt={`Arquétipo do Sábio - ${eixo.titulo}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO AUTOR - QUEM TE GUIA NESSA JORNADA */}
            <section className="py-32 px-12 bg-[#1A365D] text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:row items-center gap-20">
                    <div className="w-full md:w-1/3">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden border-4 border-[#B8860B]/50 shadow-2xl relative group">
                            <img
                                src="/eixos/images/eixo/rabino_marcos_barreto.png"
                                alt="Rabino Marcos Barreto"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                                <p className="font-serif-premium text-2xl text-white">{colecaoData.autor}</p>
                                <p className="text-xs text-[#D4AF37] tracking-[0.3em] uppercase font-bold">Mentor Espiritual</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-8">
                        <h2 className="text-4xl md:text-5xl text-[#B8860B] font-serif-premium font-bold">Quem te guia nesta jornada?</h2>

                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
                            <p className="text-justify">
                                <strong className="text-white font-bold">{colecaoData.autor}</strong> é Professor, Teólogo (reconhecido pelo MEC), capelão, psicanalista e educador bíblico há mais de 20 anos, dedicado a ensinar as Escrituras com clareza e profundidade.
                            </p>

                            <p className="text-justify">
                                Sua missão é reconectar pessoas aos fundamentos da fé cristã, trazendo luz dos originais hebraicos e uma vida prática alinhada com o Eterno.
                            </p>

                            <p className="text-justify">
                                Criou o <strong className="text-white font-bold">Mapa do Herdeiro</strong> para transformar “fé confusa” em direção — ajudando o aluno a governar mente, emoções e decisões sob princípios bíblicos.
                            </p>

                            <div className="bg-white/5 p-8 rounded border-l-2 border-[#D4AF37]/30 my-10">
                                <h4 className="text-[#D4AF37] font-serif-premium font-bold mb-3 uppercase tracking-widest text-sm">Promessa Ética</h4>
                                <p className="italic text-white/80 text-lg">
                                    "Ensino com verdade e responsabilidade — sem manipulação emocional, sem pressão e sem 'gatilhos'; só clareza, maturidade e passos aplicáveis."
                                </p>
                            </div>

                            <blockquote className="border-l-4 border-[#B8860B] pl-8 py-4 italic text-white/90 text-2xl font-serif">
                                "Mais do que seguidores, eu quero formar herdeiros: gente que aprende a governar a própria história com maturidade."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER - ECOSSISTEMA */}
            <footer className="bg-[#0D1B2A] text-white pt-24 pb-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="grid md:grid-cols-3 gap-20 mb-20">
                        {/* Brand */}
                        <div className="space-y-6">
                            <h4 className="font-serif-premium text-3xl text-[#D4AF37] font-bold">
                                Ecossistema do Herdeiro
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                Uma iniciativa de Rabino Marcos Barreto para reconectar você aos fundamentos de fé e viver uma vida prática guiada pelas Escrituras — com clareza, maturidade e direção.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="space-y-6">
                            <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-white/30">Links Rápidos</h5>
                            <ul className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-white/50">
                                <li className="hover:text-[#D4AF37] cursor-pointer" onClick={() => onNavigate('#/')}>Início</li>
                                <li className="hover:text-[#D4AF37] cursor-pointer" onClick={() => onNavigate('#/')}>Sobre</li>
                                <li className="hover:text-[#D4AF37] cursor-pointer" onClick={() => onNavigate('#/ler-online')}>Receber eBook</li>
                                <li className="hover:text-[#D4AF37] cursor-pointer" onClick={() => onNavigate('#/termos')}>Termos de Uso</li>
                                <li className="hover:text-[#D4AF37] cursor-pointer" onClick={() => onNavigate('#/privacidade')}>Políticas de Privacidade</li>
                            </ul>
                        </div>

                        {/* Social / Contact */}
                        <div className="space-y-6">
                            <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-white/30">Conecte-se</h5>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/rabinomarcosbarreto.oficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all">
                                    <Star size={18} />
                                </a>
                                <a href="https://www.youtube.com/prmarcosbarreto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all">
                                    <Layout size={18} />
                                </a>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2">Suporte e alinhamento</p>
                                <p className="text-sm text-[#D4AF37] font-bold">contato@mapadoherdeiro.com.br</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 text-center md:flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">
                        <p>© 2026 Ecossistema do Herdeiro. Todos os direitos reservados.</p>
                        <p className="mt-4 md:mt-0 font-light italic">Desenvolvido com excelência estratégica by Cláudia Barreto</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EixoSales;
