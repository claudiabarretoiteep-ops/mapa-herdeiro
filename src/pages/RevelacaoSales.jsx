import React, { useState } from 'react';
import { BookOpen, ChevronDown, Play, Shield, Star, Clock, Award, ArrowRight, Lock, Eye, Flame, CheckCircle } from 'lucide-react';

const CHECKOUT_URL = 'https://pay.voompcreators.com.br/14514';

const RevelacaoSales = ({ onNavigate }) => {
    const [openFaq, setOpenFaq] = useState(null);

    const scrollToOffer = () => {
        document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="font-sans antialiased text-neutral-sage bg-white selection:bg-secondary selection:text-white">

            {/* ─── HERO ─── */}
            <section className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 40%)'
                    }} />
                </div>
                <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-5 py-2 mb-8">
                        <Eye size={14} className="text-secondary" />
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Aula Reveladora</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] mb-6">
                        A Revelação<br />
                        <span className="text-secondary">do Herdeiro</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed">
                        O que Gálatas 4 revela sobre a sua identidade — e que ninguém nunca te explicou.
                    </p>

                    <p className="text-sm text-white/50 max-w-xl mx-auto mb-10 italic font-serif">
                        Uma aula de 1h45 com o Rabino Marcos Barreto que muda a forma como você entende herança, identidade e propósito na Escritura.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={scrollToOffer}
                            className="bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/20 flex items-center gap-3"
                        >
                            <Play size={18} /> Quero Assistir Agora
                        </button>
                        <span className="text-white/30 text-xs">Acesso imediato após a confirmação</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mt-14 text-white/40 text-xs font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Clock size={14} /> 1h45 de Aula</span>
                        <span className="flex items-center gap-2"><BookOpen size={14} /> Gálatas 3 e 4</span>
                        <span className="flex items-center gap-2"><Shield size={14} /> Acesso Vitalício</span>
                    </div>
                </div>
            </section>

            {/* ─── PROBLEMA: A DOR ─── */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-6">
                        Você sabe que é filho de Deus.<br />
                        <span className="text-secondary">Então por que vive como escravo?</span>
                    </h2>
                    <div className="w-16 h-0.5 bg-secondary mx-auto mb-10" />

                    <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-sage">
                        <p>
                            Você lê a Bíblia, ora, frequenta a igreja há anos. Sabe de cor que é "filho do Altíssimo".
                            Mas no dia a dia — nas finanças, nas decisões, nos relacionamentos — algo trava.
                        </p>
                        <p>
                            Sente culpa quando prospera. Medo quando ousa. Confusão quando precisa agir com ousadia.
                            Como se houvesse uma trava invisível entre o que você <em>sabe</em> que é e o que você <em>vive</em>.
                        </p>
                        <p className="text-primary font-semibold font-serif text-lg md:text-xl border-l-4 border-secondary pl-6 py-2">
                            "O herdeiro, enquanto é menino, em nada difere do escravo, ainda que seja senhor de tudo."
                            <span className="block text-sm text-neutral-sage font-sans font-normal mt-2 not-italic">— Gálatas 4:1</span>
                        </p>
                        <p>
                            Paulo não escreveu isso como metáfora. É um <strong>diagnóstico</strong>.
                            Existe um mecanismo espiritual que mantém herdeiros vivendo como escravos —
                            e a maioria dos ensinamentos que você recebeu nunca sequer mencionou isso.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── A REVELAÇÃO ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">O que esta aula revela</span>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mt-4 mb-4">
                            O mecanismo que Gálatas 4<br />nunca te deu
                        </h2>
                        <p className="text-neutral-sage max-w-2xl mx-auto">
                            Em 1 hora e 45 minutos, o Rabino Marcos Barreto abre Gálatas 3 e 4 verso a verso —
                            na raiz hebraica — e revela o que a tradução portuguesa escondeu.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <BookOpen size={20} />,
                                title: 'Bereshit — O Projeto Original',
                                desc: 'A primeira palavra da Bíblia contém 4 conceitos que revelam exatamente o que Deus planejou pra você. Casa, domínio, identidade — tudo está ali.',
                            },
                            {
                                icon: <Lock size={20} />,
                                title: 'O Que Se Perdeu na Tradução',
                                desc: 'De hebraico pra grego, do grego pro latim, do latim pro português. Em cada passagem, significados inteiros desapareceram. Shalom não é só "paz".',
                            },
                            {
                                icon: <Eye size={20} />,
                                title: 'Herdeiro Menino = Escravo',
                                desc: 'Paulo revela: o herdeiro que não amadureceu vive idêntico ao escravo. Tem herança, mas não acessa. Tem direito, mas não recebe. E isso tem sinais claros.',
                            },
                            {
                                icon: <Flame size={20} />,
                                title: 'Tutores e Curadores',
                                desc: 'Quem administra a herança do herdeiro menino? Paulo nomeia: tutores e curadores. Quem são eles? Essa revelação muda tudo o que você entende sobre batalha espiritual.',
                            },
                            {
                                icon: <Star size={20} />,
                                title: 'De Escravo a Ben Elohim',
                                desc: 'Ben Elohim não é título. É posição. É o filho que saiu da administração dos tutores e tomou posse da herança. A aula mostra exatamente como essa transição acontece.',
                            },
                            {
                                icon: <Shield size={20} />,
                                title: 'O Evangelho Que Te Ensinaram Errado',
                                desc: 'O evangelho franciscano: "quanto mais pobre, mais perto de Deus". Yeshua tinha tesoureiro. Abraão era riquíssimo. A Escritura não ensina pobreza como virtude.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-neutral-parchment/50 border border-neutral-200/60 rounded-xl p-6 hover:border-secondary/30 transition-all">
                                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-secondary mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif font-bold text-primary text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-sage leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ANTES / DEPOIS ─── */}
            <section className="py-20 md:py-28 bg-primary">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white text-center mb-14">
                        O que muda depois dessa aula
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6">Antes</h3>
                            {[
                                'Sente culpa quando prospera',
                                'Lê Gálatas sem entender o mecanismo',
                                'Acha que batalha espiritual é só oração',
                                'Vive entre fé e medo de errar',
                                'Não sabe por que está travado',
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-3 text-white/60 text-sm">
                                    <span className="text-red-400 mt-0.5">✕</span>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6">Depois</h3>
                            {[
                                'Entende que prosperidade é herança, não vaidade',
                                'Vê o mecanismo de Gálatas 4 com clareza total',
                                'Sabe quem são os tutores e curadores',
                                'Age como Ben Elohim — filho adulto, não menino',
                                'Identifica exatamente o que te travava',
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-3 text-white text-sm">
                                    <CheckCircle size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── QUEM ENSINA ─── */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Quem Ensina</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-4 mb-8">
                        Rabino Marcos Barreto
                    </h2>
                    <div className="text-left space-y-4 text-base text-neutral-sage leading-relaxed">
                        <p>
                            Líder espiritual, professor e psicanalista. Ordenado rabino por convicção, não por conveniência.
                            Mais de 20 anos ensinando a Escritura nas raízes hebraicas — em seminários, igrejas e plataformas digitais.
                        </p>
                        <p>
                            Três infartos o colocaram diante da morte. Voltou com uma urgência que não cabe em superficialidade.
                            Seu ensino une três dimensões que ninguém junta: <strong>Bíblia profunda</strong> (na raiz judaica),
                            <strong> Mente</strong> (base psicanalítica) e <strong>Alma</strong> (reconciliação espiritual).
                        </p>
                        <p className="text-primary font-serif italic text-lg border-l-4 border-secondary pl-6">
                            "Você não está travado por falta de fé — está travado por uma fé mal ensinada."
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── OFERTA ─── */}
            <section id="oferta" className="py-20 md:py-28 bg-white">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="bg-gradient-to-b from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center shadow-2xl border border-secondary/10">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Acesso Completo</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-4 mb-2">
                            A Revelação do Herdeiro
                        </h2>
                        <p className="text-white/50 text-sm mb-8">Aula completa com o Rabino Marcos Barreto — 1h45</p>

                        <div className="space-y-3 text-left max-w-sm mx-auto mb-10">
                            {[
                                'Aula completa em vídeo (1h45)',
                                'Acesso vitalício — assista quando quiser',
                                'Exegese de Gálatas 3 e 4 na raiz hebraica',
                                'Bereshit decodificado (a primeira palavra da Bíblia)',
                                'Revelação sobre tutores e curadores',
                                'De escravo a Ben Elohim — a transição completa',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                                    <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-8">
                            <p className="text-white/30 text-xs line-through mb-1">R$ 297,00</p>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-secondary text-4xl md:text-5xl font-serif font-bold">R$ 197</span>
                                <span className="text-white/40 text-sm">,00</span>
                            </div>
                            <p className="text-white/40 text-xs mt-2">Pagamento único — sem mensalidade</p>
                        </div>

                        <a
                            href={CHECKOUT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-10 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/30"
                        >
                            <Play size={18} /> Quero Minha Revelação
                        </a>

                        <div className="flex items-center justify-center gap-6 mt-8 text-white/25 text-[10px] uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-1"><Shield size={12} /> Compra segura</span>
                            <span className="flex items-center gap-1"><Lock size={12} /> 7 dias de garantia</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PRA QUEM É / PRA QUEM NÃO É ─── */}
            <section className="py-20 md:py-28 bg-neutral-parchment">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 border border-neutral-200">
                            <h3 className="font-serif font-bold text-primary text-lg mb-6 flex items-center gap-2">
                                <CheckCircle size={20} className="text-secondary" /> Essa aula é pra você se:
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-sage">
                                {[
                                    'Estuda a Bíblia há anos mas sente que algo fundamental não clicou',
                                    'Sabe que é filho mas vive com mentalidade de servo',
                                    'Quer entender Gálatas na raiz hebraica, não só na tradução',
                                    'Sente culpa entre fé e prosperidade',
                                    'Busca profundidade, não fórmulas mágicas',
                                    'Quer sair do ciclo de orar pedindo o que já é seu',
                                ].map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <ArrowRight size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-8 border border-neutral-200">
                            <h3 className="font-serif font-bold text-primary text-lg mb-6 flex items-center gap-2">
                                <span className="text-red-400">✕</span> Essa aula NÃO é pra você se:
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-sage">
                                {[
                                    'Busca fórmulas de "tome posse" sem base bíblica',
                                    'Quer motivacional gospel — isso aqui é ensino profundo',
                                    'Não tem paciência pra exegese verso a verso',
                                    'Acha que já sabe tudo sobre Gálatas',
                                    'Prefere ensinamento raso e rápido',
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

            {/* ─── FAQ ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-2xl font-serif font-bold text-primary text-center mb-12">
                        Perguntas Frequentes
                    </h2>
                    <div className="space-y-3">
                        {[
                            {
                                q: 'Preciso saber hebraico pra acompanhar?',
                                a: 'Não. O Rabino explica cada termo hebraico de forma simples e clara, com analogias do cotidiano. Você vai entender tudo mesmo sem saber uma palavra em hebraico.',
                            },
                            {
                                q: 'É diferente de outros estudos sobre Gálatas?',
                                a: 'Completamente. A maioria dos estudos para na superfície da tradução portuguesa. Aqui, o Rabino volta à raiz hebraica e ao contexto judaico do primeiro século — revelando mecanismos que a tradução escondeu.',
                            },
                            {
                                q: 'Quanto tempo tenho pra assistir?',
                                a: 'Acesso vitalício. Assista quantas vezes quiser, no seu ritmo. Muitos alunos assistem 2 ou 3 vezes porque cada revisão revela algo novo.',
                            },
                            {
                                q: 'Tem garantia?',
                                a: 'Sim. 7 dias de garantia incondicional. Se a aula não fizer sentido pra você, devolvemos 100% do valor.',
                            },
                            {
                                q: 'É teologia da prosperidade?',
                                a: 'Não. É exatamente o oposto. O Rabino confronta tanto a "pobreza santa" quanto a "prosperidade vazia". O ensino é baseado em exegese rigorosa — não em fórmulas.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden">
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

            {/* ─── CTA FINAL ─── */}
            <section className="py-20 md:py-24 bg-primary text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                        A herança já é sua.<br />
                        <span className="text-secondary">Falta a revelação.</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-10 max-w-lg mx-auto">
                        Enquanto você não entender o mecanismo de Gálatas 4, vai continuar pedindo o que já é seu.
                        Essa aula muda isso.
                    </p>
                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-10 py-4 rounded-lg text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-secondary/30"
                    >
                        <Play size={18} /> Assistir A Revelação do Herdeiro
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

export default RevelacaoSales;
