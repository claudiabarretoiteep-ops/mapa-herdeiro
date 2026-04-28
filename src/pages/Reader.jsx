import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    Settings,
    Type,
    Moon,
    Sun,
    BookOpen,
    MessageSquare,
    ArrowRight,
    PlayCircle,
    Copy,
    Share2,
    X,
    Lock,
    Mail,
    Loader2,
    Sparkles,
    ChevronRight,
    Search,
    Link as LinkIcon,
    Headphones,
    Music
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import glossaryData from '../data/glossary.json';
import eixoData from '../data/eixo.json';

const Reader = ({ onNavigate }) => {
    const [ebookData, setEbookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(18);
    const [theme, setTheme] = useState('sepia'); // white, sepia, dark
    const [showSettings, setShowSettings] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Kindle-like Features States
    const [highlights, setHighlights] = useState(() => JSON.parse(localStorage.getItem('reader_highlights') || '[]'));
    const [glossaryTerm, setGlossaryTerm] = useState(null);
    const [showGlossary, setShowGlossary] = useState(false);
    const [lastPosition, setLastPosition] = useState(() => localStorage.getItem('reader_last_position'));

    // Access Control States
    const [hasAccess, setHasAccess] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem('reader_email') || '');
    const [isVerifying, setIsVerifying] = useState(false);
    const [accessError, setAccessError] = useState('');
    const [currentEixoId, setCurrentEixoId] = useState('0');

    // Dynamic Content Loading
    useEffect(() => {
        const loadEbookData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(window.location.hash.split('?')[1]);
                const eixoId = params.get('eixo') || '0';
                setCurrentEixoId(eixoId);

                // Carregamento dinâmico do arquivo JSON correspondente
                const module = await import(`../data/eixo${eixoId}-ebook-content.json`);
                setEbookData(module.default);
            } catch (error) {
                console.error("Erro ao carregar conteúdo do Eixo:", error);
                // Fallback para o Eixo 0 se falhar
                try {
                    const fallback = await import('../data/eixo0-ebook-content.json');
                    setEbookData(fallback.default);
                } catch (e) {
                    setEbookData([]);
                }
            } finally {
                setLoading(false);
            }
        };

        loadEbookData();
        window.addEventListener('hashchange', loadEbookData);
        return () => window.removeEventListener('hashchange', loadEbookData);
    }, []);

    // Re-verificar acesso quando o eixo muda ou no mount inicial
    useEffect(() => {
        setHasAccess(false);
        if (email) {
            handleVerifyEmail(email);
        }
    }, [currentEixoId]);

    const handleVerifyEmail = async (inputEmail) => {
        setIsVerifying(true);
        setAccessError('');

        const cleanEmail = inputEmail.trim().toLowerCase();

        // BYPASS ADMINISTRADOR (Claudia) - Acesso garantido para testes
        if (cleanEmail === 'claudiabarreto.iteep@gmail.com' || cleanEmail === 'mbarreto@iteep.com.br') {
            onAccessGranted(cleanEmail);
            return;
        }

        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const eixoId = params.get('eixo') || '0';

        try {
            // Eixo 0 é gratuito — basta ser lead cadastrado
            if (eixoId === '0') {
                const { data, error } = await supabase
                    .from('leads')
                    .select('email')
                    .eq('email', cleanEmail)
                    .single();

                if (error || !data) {
                    setAccessError('E-mail não encontrado. Por favor, cadastre-se primeiro para liberar o acesso.');
                    setHasAccess(false);
                } else {
                    onAccessGranted(cleanEmail);
                }
            } else {
                // Eixos 1-5 são pagos — verificar compra na tabela leads_access
                const { data, error } = await supabase
                    .from('leads_access')
                    .select('allowed_ebooks')
                    .eq('email', cleanEmail)
                    .single();

                if (error || !data) {
                    setAccessError('Acesso não liberado. Este eixo requer compra. Adquira o seu na página do eixo.');
                    setHasAccess(false);
                } else {
                    // Verificar se o eixo específico está na lista de ebooks permitidos
                    const allowedEbooks = data.allowed_ebooks || [];
                    const eixoSlug = `eixo-${eixoId}`;
                    const hasEixoAccess = allowedEbooks.includes(eixoSlug) || allowedEbooks.includes('all');

                    if (hasEixoAccess) {
                        onAccessGranted(cleanEmail);
                    } else {
                        setAccessError('Você ainda não adquiriu este eixo. Acesse a página de compra para liberar.');
                        setHasAccess(false);
                    }
                }
            }
        } catch (err) {
            setAccessError('Erro técnico ao verificar acesso. Tente novamente.');
        } finally {
            setIsVerifying(false);
        }
    };

    const onAccessGranted = (cleanEmail) => {
        setHasAccess(true);
        setEmail(cleanEmail);
        localStorage.setItem('reader_email', cleanEmail);
        if (!sessionStorage.getItem('reader_onboarded')) {
            setShowOnboarding(true);
            sessionStorage.setItem('reader_onboarded', 'true');
        }
    };

    // Scroll progress tracking
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setReadingProgress(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const themes = {
        white: 'bg-white text-gray-900',
        sepia: 'bg-[#F4ECD8] text-[#5B4636]',
        dark: 'bg-[#121212] text-[#E0E0E0]'
    };

    const enhanceText = (text, blockId) => {
        if (!text) return text;
        let elements = [text];
        Object.keys(glossaryData).forEach(term => {
            const newElements = [];
            elements.forEach(el => {
                if (typeof el !== 'string') {
                    newElements.push(el);
                    return;
                }
                const parts = el.split(new RegExp(`(${term})`, 'gi'));
                parts.forEach((part, i) => {
                    if (part.toLowerCase() === term.toLowerCase()) {
                        newElements.push(
                            <span
                                key={`${blockId}-${term}-${i}`}
                                className="cursor-help border-b border-secondary/60 hover:bg-secondary/20 transition-colors text-secondary font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGlossaryTerm({ term: part, definition: glossaryData[term] });
                                    setShowGlossary(true);
                                }}
                            >
                                {part}
                            </span>
                        );
                    } else if (part) {
                        newElements.push(part);
                    }
                });
            });
            elements = newElements;
        });
        return elements;
    };

    const toggleHighlight = (id) => {
        const newHighlights = highlights.includes(id)
            ? highlights.filter(h => h !== id)
            : [...highlights, id];
        setHighlights(newHighlights);
        localStorage.setItem('reader_highlights', JSON.stringify(newHighlights));
    };

    useEffect(() => {
        if (hasAccess && lastPosition) {
            const el = document.getElementById(lastPosition);
            if (el) {
                setTimeout(() => {
                    if (window.scrollY < 100) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1000);
            }
        }
    }, [hasAccess]);

    useEffect(() => {
        const handleSavePosition = () => {
            const sections = document.querySelectorAll('section[id], div[id]');
            let currentId = '';
            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= 300) {
                    currentId = section.id;
                    break;
                }
            }
            if (currentId && currentId !== lastPosition) {
                setLastPosition(currentId);
                localStorage.setItem('reader_last_position', currentId);
            }
        };
        window.addEventListener('scroll', handleSavePosition);
        return () => window.removeEventListener('scroll', handleSavePosition);
    }, [lastPosition]);

    const renderContent = (item) => {
        switch (item.type) {
            case 'title':
                return (
                    <div className="py-20 text-center border-b border-current/10 mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4 block">
                            {item.collection}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                            {item.title}
                        </h1>
                        <p className="text-xl italic opacity-80 mb-8 max-w-lg mx-auto">
                            {item.subtitle}
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs uppercase tracking-widest opacity-60">por</span>
                                <span className="text-xl font-serif font-bold tracking-wide">{item.author}</span>
                            </div>
                            <div className="w-12 h-px bg-secondary/30"></div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-sm font-bold opacity-80">Pra. Cláudia Barreto</span>
                                <span className="text-[10px] uppercase tracking-widest opacity-60">Idealizadora e diretora estratégica da Sala do Mapa</span>
                            </div>
                        </div>
                    </div>
                );
            case 'chapter':
                return (
                    <div className="mt-24 mb-12 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-bold opacity-40 uppercase tracking-widest">Capítulo {item.number}</span>
                            <div className="h-px flex-1 bg-current opacity-10"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 leading-tight">
                            {item.title}
                        </h2>
                        <div className="space-y-6">
                            {item.content.map((block, idx) => renderBlock(block, idx))}
                        </div>
                    </div>
                );
            case 'content':
                return (
                    <div className="py-12 border-b border-current/10 mb-12">
                        <h3 className="text-2xl font-serif font-bold mb-8 uppercase tracking-wide opacity-80">
                            {item.title}
                        </h3>
                        <div className="space-y-6">
                            {item.paragraphs.map((p, idx) => {
                                const highlightId = `${item.id}-p-${idx}`;
                                const isHighlighted = highlights.includes(highlightId);
                                return (
                                    <p
                                        key={idx}
                                        className={`leading-relaxed opacity-90 cursor-pointer p-1 rounded transition-colors ${isHighlighted ? 'bg-secondary/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'hover:bg-current/5'}`}
                                        style={{ fontSize: `${fontSize}px` }}
                                        onClick={() => toggleHighlight(highlightId)}
                                    >
                                        {enhanceText(p, highlightId)}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderBlock = (block, idx) => {
        const baseStyle = { fontSize: `${fontSize}px`, lineHeight: 1.6 };
        switch (block.type) {
            case 'text':
                const isHighlighted = highlights.includes(`${idx}-${block.text?.length}`);
                return (
                    <p
                        key={idx}
                        style={baseStyle}
                        className={`mb-6 opacity-90 cursor-pointer p-1 rounded transition-colors ${isHighlighted ? 'bg-secondary/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'hover:bg-current/5'}`}
                        onClick={() => toggleHighlight(`${idx}-${block.text?.length}`)}
                    >
                        {enhanceText(block.text, idx)}
                    </p>
                );
            case 'highlight':
                return (
                    <div key={idx} className="my-10 p-8 border-l-4 border-secondary bg-current/5 rounded-r-xl">
                        <p style={baseStyle} className="font-serif italic font-medium">{block.text}</p>
                    </div>
                );
            case 'quote':
                return (
                    <div key={idx} className="my-12 py-10 text-center border-y border-current/10">
                        <p style={{ fontSize: `${fontSize * 1.3}px` }} className="font-serif font-bold leading-tight italic">“{block.text}”</p>
                    </div>
                );
            case 'reflection':
                return (
                    <div key={idx} className="my-12 bg-secondary/10 border border-secondary/20 text-current p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MessageSquare size={80} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-secondary">
                            <BookOpen size={14} /> Momento de Reflexão
                        </h4>
                        <p style={{ fontSize: `${fontSize * 1.1}px` }} className="font-medium relative z-10 leading-relaxed italic opacity-90">{block.text}</p>
                    </div>
                );
            case 'exercise':
                return (
                    <div key={idx} className="my-10 border-2 border-secondary/30 p-8 rounded-2xl bg-secondary/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-secondary">Ação Prática (Eixo)</h4>
                        <p style={baseStyle} className="font-medium">{block.text}</p>
                    </div>
                );
            case 'signal':
                return (
                    <div key={idx} className="my-16">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xl shadow-lg">{block.number}</span>
                            <h3 className="text-2xl font-serif font-bold text-secondary">{block.title}</h3>
                        </div>
                        <p style={baseStyle} className="mb-8 opacity-90 leading-relaxed">{block.text}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 bg-current/5 rounded-xl border border-current/10">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">Confronto</span>
                                <p className="text-sm font-medium italic">{block.reflection}</p>
                            </div>
                            <div className="p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-2">Eixo Prático</span>
                                <p className="text-sm font-medium">{block.exercise}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'list':
                return (
                    <div key={idx} className="my-8">
                        {block.title && <p className="font-bold mb-4 uppercase tracking-wide text-sm opacity-60">{block.title}</p>}
                        <ul className="space-y-4">
                            {block.items.map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                                    <span style={baseStyle} className="opacity-90">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!hasAccess) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${themes[theme]}`}>
                <div className={`max-w-md w-full rounded-3xl shadow-2xl p-10 border transition-all duration-500 ${theme === 'dark' ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
                    <div className="flex flex-col items-center mb-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 rotate-3 ${theme === 'dark' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                            <Lock size={32} />
                        </div>
                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-secondary/30 text-secondary' : 'bg-secondary/20 text-primary'}`}>
                            Site Version: v28.1 - PREMIUM WHITE COVERS
                        </span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-center mb-4 leading-tight">Experiência Digital Premium</h2>
                    <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">Este é um ambiente de honra. Para liberar o <b>Modo Leitura e Áudio</b>, informe o e-mail cadastrado.</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleVerifyEmail(email); }} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all placeholder:text-gray-300 font-medium" required />
                        </div>
                        {accessError && (
                            <div className="space-y-3">
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold leading-relaxed">{accessError}</div>
                                {currentEixoId !== '0' && (
                                    <button
                                        type="button"
                                        onClick={() => window.location.hash = `#/eixo-${currentEixoId}`}
                                        className="w-full bg-secondary text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                                    >
                                        Adquirir Eixo {currentEixoId}
                                    </button>
                                )}
                            </div>
                        )}
                        <button type="submit" disabled={isVerifying} className={`w-full ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-primary text-secondary'} font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-70`}>
                            {isVerifying ? <Loader2 size={20} className="animate-spin" /> : <>LIBERAR ACESSO <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-secondary selection:text-white ${themes[theme]}`}>
            <style dangerouslySetInnerHTML={{ __html: `.no-select { -webkit-user-select: none; user-select: none; } a { color: inherit !important; text-decoration: underline !important; text-decoration-color: rgba(212, 175, 55, 0.4) !important; }` }} />
            {showOnboarding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-500">
                    <div className="max-w-sm w-full bg-white text-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-100 animate-in zoom-in-95 duration-500 text-center">
                        <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3"><Sparkles size={32} /></div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Bem-vindo à Sua Experiência</h3>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">Você pode <b>Ler</b>, <b>Ouvir</b> o livro completo ou escutar o <b>Alinhamento (Eixo)</b> do Rabino.</p>
                        <button onClick={() => setShowOnboarding(false)} className="w-full bg-primary text-secondary font-bold py-4 rounded-2xl shadow-lg uppercase tracking-widest text-xs">Começar Agora</button>
                    </div>
                </div>
            )}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${readingProgress > 2 ? 'bg-current/5 backdrop-blur-md border-b border-current/10 py-3' : 'py-6'}`}>
                <div className="container mx-auto px-4 max-w-3xl flex justify-between items-center">
                    <button onClick={() => window.location.hash = '#/'} className="p-2 hover:bg-current/10 rounded-full transition-colors flex items-center gap-2"><ChevronLeft size={20} /><span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Início</span></button>

                    <div className="flex items-center gap-3">
                        {/* Audiobook Buttons Integration */}
                        <div className="hidden md:flex items-center gap-2 bg-black/5 rounded-full p-1 border border-current/5">
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams(window.location.hash.split('?')[1]);
                                    const eid = params.get('eixo') || '0';
                                    const slug = eixoData.sessions[parseInt(eid)]?.slug;
                                    if (slug) window.location.hash = `#/eixo/${slug}?type=alignment`;
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-secondary hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider"
                            >
                                <Headphones size={14} />
                                <span>Ouvir Alinhamento</span>
                            </button>
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams(window.location.hash.split('?')[1]);
                                    const eid = params.get('eixo') || '0';
                                    const slug = eixoData.sessions[parseInt(eid)]?.slug;
                                    if (slug) window.location.hash = `#/eixo/${slug}?type=full`;
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-secondary hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider border-l border-current/5"
                            >
                                <Music size={14} />
                                <span>Ouvir Livro</span>
                            </button>
                        </div>

                        {/* Mobile Audiobook Icon */}
                        <button
                            onClick={() => {
                                const params = new URLSearchParams(window.location.hash.split('?')[1]);
                                const eid = params.get('eixo') || '0';
                                const slug = eixoData.sessions[parseInt(eid)]?.slug;
                                if (slug) window.location.hash = `#/eixo/${slug}`;
                            }}
                            className="md:hidden p-2 hover:bg-current/10 rounded-full transition-colors text-secondary"
                        >
                            <Headphones size={20} />
                        </button>

                        <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-full transition-all ${showSettings ? 'bg-secondary text-white' : 'hover:bg-current/10'}`}><Settings size={20} /></button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-current/5"><div className="h-full bg-secondary transition-all duration-300" style={{ width: `${readingProgress}%` }}></div></div>
            </header>
            {showSettings && (
                <div className="fixed top-20 right-4 sm:right-[calc(50%-180px)] z-50 w-72 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-6 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6"><h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Preferências</h4><button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-900"><X size={16} /></button></div>
                    <div className="mb-8"><div className="flex justify-between items-center mb-4"><span className="text-xs font-bold">Tamanho da Letra</span><span className="text-xs font-bold text-secondary">{fontSize}px</span></div>
                        <div className="flex items-center gap-4"><button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="flex-1 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-center text-xs font-bold">A-</button><div className="flex-1 h-px bg-gray-100"></div><button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="flex-1 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-center text-xs font-bold">A+</button></div></div>
                    <div><span className="text-xs font-bold block mb-4">Cor da Página</span><div className="grid grid-cols-3 gap-3">
                        {['white', 'sepia', 'dark'].map((t) => (
                            <button key={t} onClick={() => setTheme(t)} className={`h-12 rounded-xl flex items-center justify-center border-2 transition-all ${theme === t ? 'border-secondary' : 'border-gray-100'} ${t === 'white' ? 'bg-white' : t === 'sepia' ? 'bg-[#F4ECD8]' : 'bg-[#121212]'}`}>
                                {t === 'white' && <div className="text-[10px] font-bold text-gray-900">Claro</div>}
                                {t === 'sepia' && <div className="text-[10px] font-bold text-[#5B4636]">Sépia</div>}
                                {t === 'dark' && <div className="text-[10px] font-bold text-white">Noite</div>}
                            </button>
                        ))}
                    </div></div>
                </div>
            )}
            <main className="container mx-auto px-6 py-24 max-w-3xl selection:bg-secondary selection:text-primary no-select">
                {loading ? (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-secondary">
                        <Loader2 size={48} className="animate-spin opacity-20" />
                        <p className="font-serif italic animate-pulse">Relendo manuscritos...</p>
                    </div>
                ) : (
                    ebookData.map((item, idx) => (
                        <React.Fragment key={item.id}>
                            <section id={item.id}>{renderContent(item)}</section>
                            {item.type === 'title' && (
                                <section className="my-24 py-16 border-y border-current/10">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-secondary text-center">Sumário Interativo</h3>
                                    <div className="grid gap-4 max-w-xl mx-auto">
                                        {/* Sumário dinâmico ou estático baseado no conteúdo */}
                                        {ebookData.filter(i => i.type === 'chapter' || i.type === 'content').map(sec => (
                                            <button key={sec.id} onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-between p-4 rounded-xl hover:bg-current/5 transition-all text-left">
                                                <div><span className="block text-xl font-bold uppercase tracking-widest group-hover:text-secondary">{sec.title}</span></div>
                                                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 text-secondary" />
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </React.Fragment>
                    ))
                )}
            </main>
            {showGlossary && glossaryTerm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowGlossary(false)}>
                    <div className="bg-white text-primary max-w-sm w-full rounded-3xl shadow-2xl p-8 border border-secondary/20 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-2"><Search size={24} /></div><button onClick={() => setShowGlossary(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button></div>
                        <h3 className="text-2xl font-serif font-bold mb-2 flex items-baseline gap-2">{glossaryTerm.term}<span className="text-[10px] uppercase tracking-widest opacity-40 font-sans">Dicionário Bíblico</span></h3>
                        <p className="text-gray-600 leading-relaxed italic mb-6">{glossaryTerm.definition}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reader;
