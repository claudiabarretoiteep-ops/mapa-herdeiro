import React, { useState } from 'react';
import { Play, Shield, Lock, Eye, CheckCircle, ChevronDown, ArrowRight, BookOpen, Headphones, Compass, Crown, Flame, Sprout, Clock, Zap, Target, Heart, Star, Award, AlertTriangle } from 'lucide-react';

const CHECKOUT_COMPLETO = 'https://pay.voompcreators.com.br/14514';
const EIXO_ZERO_URL = 'https://mapadoherdeiro.com.br/eixos/';

const eixos = [
    {
        id: 0,
        nome: 'Despertar',
        titulo: 'Você não está perdido. Está desalinhado.',
        desc: 'A primeira chave de consciência. Você descobre os 7 sinais de desalinhamento e recebe os primeiros passos práticos para o realinhamento imediato.',
        icon: <Eye size={22} />,
        cor: 'from-neutral-400 to-neutral-500',
        tag: 'Gratuito',
        tagColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        link: EIXO_ZERO_URL,
    },
    {
        id: 1,
        nome: 'Consciência',
        titulo: 'Fé herdada ou fé compreendida?',
        desc: 'Você começa a enxergar onde está quebrado. Sai da repetição religiosa e entra em entendimento com fundamento, clareza e direção.',
        icon: <Compass size={22} />,
        cor: 'from-blue-500 to-blue-600',
        tag: 'R$ 67',
        tagColor: 'bg-secondary/10 text-secondary-dark border-secondary/20',
        link: 'https://pay.voompcreators.com.br/11814',
    },
    {
        id: 2,
        nome: 'Confronto',
        titulo: 'Promessa não é estrutura.',
        desc: 'Você encara os padrões que estão travando sua vida. Entende por que potencial sem ordem gera frustração — e como transformar promessa em direção prática.',
        icon: <Flame size={22} />,
        cor: 'from-orange-500 to-orange-600',
        tag: 'R$ 67',
        tagColor: 'bg-secondary/10 text-secondary-dark border-secondary/20',
        link: 'https://pay.voompcreators.com.br/13741',
    },
    {
        id: 3,
        nome: 'Direção',
        titulo: 'Governo começa dentro.',
        desc: 'Você para de reagir e começa a decidir. Alinha emoções, decisões e rotina a partir do governo interior — não do impulso.',
        icon: <Target size={22} />,
        cor: 'from-indigo-500 to-indigo-600',
        tag: 'R$ 67',
        tagColor: 'bg-secondary/10 text-secondary-dark border-secondary/20',
        link: 'https://pay.voompcreators.com.br/13743',
    },
    {
        id: 4,
        nome: 'Governo',
        titulo: 'Prosperar sem culpa.',
        desc: 'Você assume responsabilidade e posicionamento. Quebra a teologia da escassez e entende que prosperidade é herança, não vaidade.',
        icon: <Crown size={22} />,
        cor: 'from-secondary-dark to-secondary',
        tag: 'R$ 67',
        tagColor: 'bg-secondary/10 text-secondary-dark border-secondary/20',
        link: 'https://pay.voompcreators.com.br/13744',
    },
    {
        id: 5,
        nome: 'Expansão',
        titulo: 'Teshuvá: O retorno ao eixo.',
        desc: 'Você sai do modo sobrevivência e entra em construção. Faz o inventário da alma, consolida o processo e inicia o florescimento do herdeiro.',
        icon: <Sprout size={22} />,
        cor: 'from-emerald-500 to-emerald-600',
        tag: 'R$ 67',
        tagColor: 'bg-secondary/10 text-secondary-dark border-secondary/20',
        link: 'https://pay.voompcreators.com.br/13745',
    },
];

const SistemaEixosSales = ({ onNavigate }) => {
    const [openFaq, setOpenFaq] = useState(null);

    const scrollToOffer = () => {
        document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="font-sans antialiased text-neutral-sage bg-white selection:bg-secondary selection:text-white">

            {/* ═══════════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative bg-primary overflow-hidden min-h-[90vh] flex items-center">
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(212,175,55,0.05) 0%, transparent 40%), radial-gradient(circle at 50% 10%, rgba(255,255,255,0.03) 0%, transparent 30%)'
                    }} />
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-5 py-2 mb-10">
                        <Compass size={13} className="text-secondary" />
                        <span className="text-secondary/80 text-[10px] font-bold uppercase tracking-[0.25em]">Série Eixos do Herdeiro</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-white leading-[1.12] mb-8">
                        Sistema Guiado de<br />
                        <span className="text-secondary">Realinhamento do Herdeiro</span>
                    </h1>

                    <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
                        Uma jornada progressiva em 6 Eixos para restaurar sua clareza, alinhar suas decisões
                        e ativar seu governo espiritual e prático.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-6 max-w-lg mx-auto mb-10">
                        <p className="text-white/50 text-lg md:text-xl italic font-serif leading-relaxed">
                            Você não vai consumir conteúdo.<br />
                            <span className="text-white/80 font-bold not-italic">Você vai passar por um processo.</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <button
                            onClick={scrollToOffer}
                            className="bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/20 flex items-center gap-3"
                        >
                            <Zap size={18} /> Acessar Todos os Eixos
                        </button>
                        <a
                            href={EIXO_ZERO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-secondary text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                            ou comece grátis pelo Eixo 0 <ArrowRight size={12} />
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2"><BookOpen size={13} /> 6 Eixos Progressivos</span>
                        <span className="flex items-center gap-2"><Headphones size={13} /> Leitura + Áudio</span>
                        <span className="flex items-center gap-2"><Shield size={13} /> Acesso Vitalício</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                O PROBLEMA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-3xl mx-auto px-6">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] block text-center mb-4">Você já percebeu isso</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-12">
                        O problema não é falta de capacidade.<br />
                        <span className="text-secondary">É desalinhamento.</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        {[
                            { icon: <AlertTriangle size={16} />, text: 'Muito conhecimento, pouca direção' },
                            { icon: <AlertTriangle size={16} />, text: 'Começa coisas e não sustenta' },
                            { icon: <AlertTriangle size={16} />, text: 'Sente que está travado, mas não sabe onde' },
                            { icon: <AlertTriangle size={16} />, text: 'Vive ciclos repetidos sem sair do lugar' },
                            { icon: <AlertTriangle size={16} />, text: 'Ora, estuda, busca — mas algo não conecta' },
                            { icon: <AlertTriangle size={16} />, text: 'Sabe o que deveria fazer, mas não consegue' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 border border-neutral-200/60">
                                <span className="text-red-400/60">{item.icon}</span>
                                <span className="text-sm text-primary font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-base md:text-lg text-neutral-sage leading-relaxed max-w-xl mx-auto mb-8">
                            Você não precisa de mais informação. Não precisa de motivação.
                            Precisa de <strong className="text-primary">realinhamento</strong> — eixo por eixo,
                            camada por camada, até que sua vida volte a operar em clareza, direção e governo.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                A SOLUÇÃO
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">A Solução</span>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mt-4 mb-6">
                        O Sistema dos Eixos foi desenhado<br />para uma coisa só:
                    </h2>
                    <p className="text-2xl md:text-3xl font-serif font-bold text-secondary mb-10">
                        te colocar de volta no eixo.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                        {[
                            'Sem teoria solta',
                            'Sem motivação vazia',
                            'Sem espiritualidade desconectada da vida',
                        ].map((t, i) => (
                            <div key={i} className="bg-primary/5 rounded-lg px-4 py-3">
                                <p className="text-xs font-bold text-primary">{t}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-neutral-sage text-base mt-10 max-w-lg mx-auto leading-relaxed">
                        Cada eixo atua em uma camada específica do seu desalinhamento.
                        Um processo progressivo — do despertar à expansão — onde cada etapa
                        prepara a próxima.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                OS 6 EIXOS
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">A Jornada Completa</span>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mt-4">
                            Os 6 Eixos do Herdeiro
                        </h2>
                    </div>

                    {/* Timeline visual */}
                    <div className="relative">
                        {/* Linha vertical central (desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-300 via-secondary/30 to-emerald-300" />

                        <div className="space-y-6 md:space-y-0">
                            {eixos.map((eixo, i) => (
                                <div key={eixo.id} className={`md:flex md:items-center md:gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'} md:mb-12`}>
                                    {/* Card */}
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white rounded-xl border border-neutral-200/80 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all">
                                            <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${eixo.cor} flex items-center justify-center text-white`}>
                                                    {eixo.icon}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Eixo {eixo.id}</span>
                                                    <h3 className="font-serif font-bold text-primary text-lg leading-tight">{eixo.nome}</h3>
                                                </div>
                                                <span className={`ml-auto md:ml-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${eixo.tagColor}`}>
                                                    {eixo.tag}
                                                </span>
                                            </div>
                                            <p className={`text-primary font-serif italic text-sm mb-2 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                                                "{eixo.titulo}"
                                            </p>
                                            <p className={`text-sm text-neutral-sage leading-relaxed ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                                                {eixo.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center dot (desktop) */}
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${eixo.cor} flex items-center justify-center text-white text-xs font-bold shadow-md border-4 border-neutral-parchment`}>
                                            {eixo.id}
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href={EIXO_ZERO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:text-secondary-dark transition-colors"
                        >
                            Comece agora pelo Eixo 0 — é gratuito <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                COMO COMEÇAR — EIXO 0 GRATUITO
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Por Onde Começar</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-4 mb-4">
                            Comece pelo Eixo 0 — sem compromisso
                        </h2>
                        <p className="text-neutral-sage max-w-xl mx-auto text-sm leading-relaxed">
                            Antes de investir, experimente. O Eixo 0 (Despertar) é gratuito e te dá a primeira
                            chave de consciência. Cadastre-se, receba por e-mail e descubra se o processo faz sentido pra você.
                        </p>
                    </div>

                    {/* Passo a passo visual */}
                    <div className="grid sm:grid-cols-3 gap-6 mb-12">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-serif font-bold text-lg mx-auto mb-4">1</div>
                            <h4 className="font-serif font-bold text-primary text-sm mb-2">Cadastre-se gratuitamente</h4>
                            <p className="text-xs text-neutral-sage">Informe seu nome, e-mail e WhatsApp na página do Eixo 0.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-serif font-bold text-lg mx-auto mb-4">2</div>
                            <h4 className="font-serif font-bold text-primary text-sm mb-2">Receba o Eixo 0 por e-mail</h4>
                            <p className="text-xs text-neutral-sage">Acesso imediato à leitura + áudio do Despertar — direto no seu e-mail.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-serif font-bold text-lg mx-auto mb-4">3</div>
                            <h4 className="font-serif font-bold text-primary text-sm mb-2">Decida continuar a jornada</h4>
                            <p className="text-xs text-neutral-sage">Se fizer sentido, avance para os Eixos 1–5 (individual ou sistema completo).</p>
                        </div>
                    </div>

                    {/* CTA forte pro Eixo 0 */}
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 md:p-10 text-center border border-secondary/10">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
                            <CheckCircle size={12} className="text-emerald-500" />
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">100% Gratuito</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                            Eixo 0 — Despertar
                        </h3>
                        <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                            "Você não está perdido. Está desalinhado." — a primeira chave pra entender onde você realmente está.
                        </p>
                        <a
                            href={EIXO_ZERO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/30"
                        >
                            <BookOpen size={18} /> Receber o Eixo 0 Grátis
                        </a>
                        <p className="text-white/20 text-[10px] mt-4">Cadastro rápido — acesso imediato por e-mail</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                COMO FUNCIONA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-primary">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-secondary/60 text-[10px] font-bold uppercase tracking-[0.3em]">Como Funciona</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-4 mb-4">
                            Cada eixo é uma experiência guiada
                        </h2>
                        <p className="text-white/40 max-w-lg mx-auto text-sm">
                            Não é leitura passiva. É um processo que combina compreensão, escuta e ação.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <BookOpen size={24} />,
                                title: 'Leitura Imersiva',
                                desc: 'Ambiente adaptativo projetado para concentração profunda. Sem distrações.',
                            },
                            {
                                icon: <Headphones size={24} />,
                                title: 'Sessão Guiada em Áudio',
                                desc: 'A voz do Rabino conduz cada eixo. Ouça enquanto caminha, dirige ou medita.',
                            },
                            {
                                icon: <Compass size={24} />,
                                title: 'Direcionamento Claro',
                                desc: 'Cada eixo termina com direção aplicável. Você sabe exatamente o próximo passo.',
                            },
                            {
                                icon: <Zap size={24} />,
                                title: 'Ativações Práticas',
                                desc: 'Exercícios que conectam o aprendizado à sua vida real. Você não apenas entende — você executa.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif font-bold text-white text-sm mb-2">{item.title}</h3>
                                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                OFERTA
            ═══════════════════════════════════════════════════════════ */}
            <section id="oferta" className="py-20 md:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Escolha Seu Acesso</span>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mt-4">
                            Como você quer se alinhar?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* ── Card: Individual ── */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-10 relative">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em]">Acesso Individual</span>
                            <h3 className="text-xl font-serif font-bold text-primary mt-2 mb-2">Por Eixo</h3>
                            <p className="text-sm text-neutral-sage mb-6">Para quem quer avançar aos poucos, um eixo de cada vez.</p>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-serif font-bold text-primary">R$ 67</span>
                                <span className="text-neutral-sage text-sm">,00 / eixo</span>
                            </div>

                            <div className="space-y-3 mb-8">
                                {[
                                    'Acesso vitalício ao eixo escolhido',
                                    'Leitura imersiva + áudio guiado',
                                    'Ativações práticas do eixo',
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-sage">
                                        <CheckCircle size={14} className="text-neutral-400 flex-shrink-0" />
                                        <span>{t}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 text-sm text-red-400/60">
                                    <span className="text-xs">✕</span>
                                    <span>Sem continuidade entre eixos</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-red-400/60">
                                    <span className="text-xs">✕</span>
                                    <span>Risco de travar no meio do processo</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {eixos.filter(e => e.id > 0).map(e => (
                                    <a
                                        key={e.id}
                                        href={e.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-2.5 transition-colors group"
                                    >
                                        <span className="text-xs font-bold text-primary">Eixo {e.id} — {e.nome}</span>
                                        <ArrowRight size={14} className="text-neutral-300 group-hover:text-secondary transition-colors" />
                                    </a>
                                ))}
                            </div>

                            <p className="text-[10px] text-neutral-400 text-center mt-4">
                                Total separado: 5 × R$ 67 = <span className="font-bold">R$ 335,00</span>
                            </p>
                        </div>

                        {/* ── Card: Completo (Destaque) ── */}
                        <div className="bg-gradient-to-b from-primary to-primary-dark rounded-2xl p-8 md:p-10 relative border border-secondary/20 shadow-2xl">
                            {/* Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <div className="bg-secondary text-primary-dark text-[10px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                    <Star size={10} /> Mais Escolhido
                                </div>
                            </div>

                            <span className="text-secondary/60 text-[10px] font-bold uppercase tracking-[0.3em]">Acesso Completo</span>
                            <h3 className="text-xl font-serif font-bold text-white mt-2 mb-2">Sistema Completo</h3>
                            <p className="text-sm text-white/50 mb-6">Para quem decidiu se alinhar de verdade. Jornada completa, sem interrupção.</p>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-white/30 text-sm line-through">R$ 335,00</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl md:text-5xl font-serif font-bold text-secondary">R$ 197</span>
                                <span className="text-white/40 text-sm">,00</span>
                            </div>

                            {/* Economia badge */}
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2 mb-8 inline-block">
                                <span className="text-emerald-400 text-xs font-bold">
                                    Economia de R$ 138,00 (41% OFF)
                                </span>
                            </div>

                            <div className="space-y-3 mb-10">
                                {[
                                    'Todos os 5 eixos (1 ao 5) com acesso vitalício',
                                    'Jornada completa e progressiva',
                                    'Leitura imersiva + áudio guiado em cada eixo',
                                    'Ativações práticas em todas as etapas',
                                    'Continuidade garantida — sem travar no meio',
                                    'Eixo 0 incluso gratuitamente',
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                                        <CheckCircle size={14} className="text-secondary flex-shrink-0" />
                                        <span>{t}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={CHECKOUT_COMPLETO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/30"
                            >
                                <Zap size={18} /> Acessar o Sistema Completo
                            </a>

                            <div className="flex items-center justify-center gap-6 mt-6 text-white/20 text-[10px] uppercase tracking-widest font-bold">
                                <span className="flex items-center gap-1"><Shield size={10} /> Compra segura</span>
                                <span className="flex items-center gap-1"><Lock size={10} /> 7 dias de garantia</span>
                            </div>

                            <p className="text-white/20 text-[10px] text-center mt-4">Pagamento único — sem mensalidade</p>
                        </div>
                    </div>

                    {/* Gatilho extra de economia */}
                    <div className="max-w-2xl mx-auto mt-12 bg-neutral-parchment border border-secondary/10 rounded-xl p-6 md:p-8 text-center">
                        <h4 className="font-serif font-bold text-primary text-lg mb-3">Por que o sistema completo?</h4>
                        <div className="grid sm:grid-cols-3 gap-4 text-sm text-neutral-sage">
                            <div className="space-y-1">
                                <Award size={20} className="text-secondary mx-auto" />
                                <p className="font-bold text-primary">Economia real</p>
                                <p className="text-xs">R$ 138 a menos do que comprar separado</p>
                            </div>
                            <div className="space-y-1">
                                <ArrowRight size={20} className="text-secondary mx-auto" />
                                <p className="font-bold text-primary">Continuidade</p>
                                <p className="text-xs">Cada eixo prepara o próximo. Sem pausas, sem perdas</p>
                            </div>
                            <div className="space-y-1">
                                <Target size={20} className="text-secondary mx-auto" />
                                <p className="font-bold text-primary">Processo completo</p>
                                <p className="text-xs">Do despertar à expansão — a jornada inteira</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                QUEM ENSINA
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Quem Guia o Processo</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-4 mb-8">
                        Rabino Marcos Barreto
                    </h2>
                    <div className="text-left space-y-4 text-base text-neutral-sage leading-relaxed">
                        <p>
                            Teólogo e psicanalista com mais de duas décadas de imersão nos originais hebraicos.
                            Ordenado rabino por convicção. Três infartos o colocaram diante da morte — e lhe
                            deram autoridade sobre a fragilidade da vida e a urgência do propósito.
                        </p>
                        <p>
                            Seu ensino une três dimensões que ninguém junta: <strong>Bíblia profunda</strong> (na raiz judaica),
                            <strong> Mente</strong> (base psicanalítica) e <strong>Alma</strong> (reconciliação espiritual).
                            Na Sala do Mapa, ele lidera uma jornada de realinhamento para aqueles que cansaram
                            da superficialidade e decidiram governar a partir da verdade eterna.
                        </p>
                        <p className="text-primary font-serif italic text-lg border-l-4 border-secondary pl-6">
                            "Você não está travado por falta de fé — está travado por uma fé mal ensinada."
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                POSICIONAMENTO — NÃO É PARA TODOS
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-14">
                        Isso não é um produto para curiosos.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-neutral-parchment rounded-xl p-8 border border-neutral-200/60">
                            <h3 className="font-serif font-bold text-primary text-lg mb-6 flex items-center gap-2">
                                <CheckCircle size={20} className="text-secondary" /> É para você se:
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-sage">
                                {[
                                    'Está cansado de viver travado sem saber por quê',
                                    'Sabe que precisa se alinhar — não de mais informação',
                                    'Decidiu parar de viver no automático',
                                    'Quer profundidade bíblica com aplicação prática',
                                    'Está disposto a passar por um processo, não por um atalho',
                                    'Busca governo interior antes de conquista exterior',
                                ].map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <ArrowRight size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-neutral-parchment rounded-xl p-8 border border-neutral-200/60">
                            <h3 className="font-serif font-bold text-primary text-lg mb-6 flex items-center gap-2">
                                <span className="text-red-400">✕</span> Não é para você se:
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-sage">
                                {[
                                    'Busca fórmulas rápidas e motivação vazia',
                                    'Quer "conteúdo" pra consumir e esquecer',
                                    'Prefere espiritualidade desconectada da vida real',
                                    'Não tem paciência pra um processo progressivo',
                                    'Acha que já está alinhado e não precisa de ajuste',
                                ].map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-red-400 text-xs mt-1">—</span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FAQ
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-2xl font-serif font-bold text-primary text-center mb-12">
                        Perguntas Frequentes
                    </h2>
                    <div className="space-y-3">
                        {[
                            {
                                q: 'O que exatamente é o Sistema de Eixos?',
                                a: 'É um processo guiado de realinhamento espiritual e prático, estruturado em 6 etapas progressivas (Eixos 0 a 5). Cada eixo atua em uma camada específica da sua vida — do despertar à expansão. Não é curso, não é conteúdo avulso. É um sistema com começo, meio e direção.',
                            },
                            {
                                q: 'Preciso seguir na ordem?',
                                a: 'Sim. Os eixos são progressivos. Cada um prepara o terreno para o próximo. Começar pelo Eixo 3 sem ter passado pelo 1 e 2 é como construir um segundo andar sem fundação. O processo foi desenhado com essa sequência por uma razão.',
                            },
                            {
                                q: 'Posso começar gratuitamente?',
                                a: 'Sim. O Eixo 0 (Despertar) é gratuito. Ele é a porta de entrada — te dá a primeira chave de consciência e mostra se o processo faz sentido pra você. Sem compromisso.',
                            },
                            {
                                q: 'Qual a diferença entre comprar separado e o sistema completo?',
                                a: 'Comprando eixo por eixo, o total é R$ 335,00. O sistema completo sai por R$ 197,00 — economia de R$ 138 (41%). Além do preço, o sistema completo garante continuidade: você não trava no meio do processo esperando comprar o próximo.',
                            },
                            {
                                q: 'Quanto tempo tenho pra acessar?',
                                a: 'Acesso vitalício. Assista, leia e ouça quantas vezes quiser, no seu ritmo. Muitos alunos passam pelos eixos mais de uma vez — cada revisão revela camadas mais profundas.',
                            },
                            {
                                q: 'Tem garantia?',
                                a: 'Sim. 7 dias de garantia incondicional. Se o processo não fizer sentido pra você, devolvemos 100% do valor.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                                >
                                    <span className="font-serif font-bold text-primary text-sm">{item.q}</span>
                                    <ChevronDown size={18} className={`text-secondary transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-5 pb-5 text-sm text-neutral-sage leading-relaxed border-t border-neutral-100 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CTA FINAL
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-primary text-center relative overflow-hidden">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 50%)'
                }} />
                <div className="max-w-2xl mx-auto px-6 relative z-10">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                        Você não está perdido.<br />
                        <span className="text-secondary">Está desalinhado.</span>
                    </h2>
                    <p className="text-white/40 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
                        O sistema foi criado para te reposicionar, eixo por eixo,
                        até que sua vida volte a operar em clareza, direção e governo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <a
                            href={CHECKOUT_COMPLETO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-10 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/30"
                        >
                            <Zap size={18} /> Acessar o Sistema Completo
                        </a>
                    </div>
                    <a
                        href={EIXO_ZERO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-secondary text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                    >
                        ou comece grátis pelo Eixo 0 <ArrowRight size={12} />
                    </a>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-primary-dark py-8 text-center">
                <p className="text-white/20 text-xs">
                    Mapa do Herdeiro &copy; {new Date().getFullYear()} — Rabino Marcos Barreto
                </p>
                <div className="flex justify-center gap-6 mt-3">
                    <a href="#/termos" className="text-white/20 text-xs hover:text-white/40 transition-colors">Termos de Uso</a>
                    <a href="#/privacidade" className="text-white/20 text-xs hover:text-white/40 transition-colors">Privacidade</a>
                </div>
            </footer>
        </div>
    );
};

export default SistemaEixosSales;
