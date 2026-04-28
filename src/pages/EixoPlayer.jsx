import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, SkipBack, SkipForward, Volume2,
    Share2, Instagram, Youtube, MessageCircle, Music, Globe, ChevronRight,
    Headphones, MessageSquare, Music2, Send
} from 'lucide-react';
import eixoData from '../data/eixo.json';

const IconMap = {
    instagram: Instagram,
    youtube: Youtube,
    whatsapp: MessageCircle,
    spotify: Music2,
    tiktok: Play, // Play is a good fallback for TikTok
    globe: Globe
};

const EixoPlayer = ({ slug, onNavigate }) => {
    const [session, setSession] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selectedType, setSelectedType] = useState('alignment'); // 'alignment' ou 'full'
    const audioRef = useRef(null);

    const currentAudioUrl = selectedType === 'alignment' ? session?.alignmentAudio : session?.fullBookAudio;

    useEffect(() => {
        const hash = window.location.hash;
        const queryParams = new URLSearchParams(hash.split('?')[1]);
        const initialType = queryParams.get('type');
        if (initialType === 'full' || initialType === 'alignment') {
            setSelectedType(initialType);
        }
    }, [slug]);

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(console.error);
        }
    }, [currentAudioUrl]);

    useEffect(() => {
        const found = eixoData.sessions.find(s => s.slug === slug);
        if (found) {
            setSession(found);
        }
    }, [slug]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setProgress(e.target.value);
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-neutral-offwhite flex flex-col items-center justify-center text-primary p-8 text-center font-serif">
                <h1 className="text-3xl mb-4">Sessão não encontrada.</h1>
                <button onClick={() => onNavigate('#/')} className="text-primary-light underline">Voltar para o Início</button>
            </div>
        );
    }

    const togglePlay = () => {
        if (!audioRef.current || !currentAudioUrl) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSwitchAudio = (type) => {
        if (type === selectedType) return;
        setIsPlaying(false);
        setProgress(0);
        setSelectedType(type);
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, duration);
        }
    };

    const handleSkipBack = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: session.title,
                text: session.subtitle,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Copiado para a área de transferência!");
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="min-h-screen bg-primary text-white font-sans selection:bg-secondary selection:text-primary">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end px-6 z-50 pointer-events-none">
                <button
                    onClick={handleShare}
                    className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 pointer-events-auto active:scale-95 transition-all hover:bg-white/20"
                >
                    <Share2 className="w-5 h-5 text-white" />
                </button>
            </div>

            <main className="max-w-[440px] mx-auto px-6 pt-12 pb-24">
                {/* Dual Audio Selector */}
                {session.fullBookAudio && (
                    <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl mb-10 border border-white/10 shadow-2xl">
                        <button
                            onClick={() => handleSwitchAudio('alignment')}
                            className={`flex-1 py-3.5 px-4 rounded-xl text-[12px] font-bold transition-all uppercase tracking-widest ${selectedType === 'alignment'
                                ? 'bg-secondary text-primary shadow-lg scale-[1.02]'
                                : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Sessão Eixo
                        </button>
                        <button
                            onClick={() => handleSwitchAudio('full')}
                            className={`flex-1 py-3.5 px-4 rounded-xl text-[12px] font-bold transition-all uppercase tracking-widest ${selectedType === 'full'
                                ? 'bg-secondary text-primary shadow-lg scale-[1.02]'
                                : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Audiolivro
                        </button>
                    </div>
                )}

                {/* Cover and Info */}
                <div className="text-center mb-12">
                    <div className="w-64 h-64 mx-auto mb-10 rounded-[48px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden ring-4 ring-white/20 transform hover:rotate-2 hover:scale-105 transition-all duration-700">
                        <img src={session.coverUrl} alt={session.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-6">
                        <h1 className="text-white text-3xl font-bold mb-4 tracking-tight font-serif leading-tight">
                            {selectedType === 'alignment' ? session.subtitle : `Audiolivro: ${session.subtitle}`}
                        </h1>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                            {selectedType === 'alignment' ? "Sessão de Realinhamento" : "Conteúdo Integral"}
                        </div>
                    </div>
                </div>

                {/* Player Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-[56px] p-10 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] mb-16">
                    <audio
                        ref={audioRef}
                        src={currentAudioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />

                    {/* Progress Slider */}
                    <div className="mb-10">
                        <div className="relative group">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress || 0}
                                onChange={handleSeek}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-secondary group-hover:h-3 transition-all"
                            />
                        </div>
                        <div className="flex justify-between mt-4 text-[11px] font-mono text-white/40 tracking-widest uppercase">
                            <span>{formatTime(audioRef.current?.currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6">
                        <button
                            onClick={handleSkipBack}
                            className="p-4 text-white/40 hover:text-secondary transition-all hover:scale-110 active:scale-90"
                        >
                            <SkipBack className="w-7 h-7 fill-current" />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-primary shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:shadow-[0_0_70px_rgba(212,175,55,0.5)] hover:scale-110 active:scale-90 transition-all duration-500 group"
                        >
                            {isPlaying ? (
                                <Pause className="w-10 h-10 fill-current" />
                            ) : (
                                <Play className="w-10 h-10 fill-current ml-2 transition-transform group-hover:scale-110" />
                            )}
                        </button>

                        <button
                            onClick={handleSkipForward}
                            className="p-4 text-white/40 hover:text-secondary transition-all hover:scale-110 active:scale-90"
                        >
                            <SkipForward className="w-7 h-7 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Discovery Section */}
                <div className="mb-16">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary mb-8 text-center md:text-left opacity-80">
                        MAIS SESSÕES EIXO
                    </h3>
                    <div className="space-y-4">
                        {eixoData.sessions
                            .filter(s => s.slug !== slug)
                            .map((s) => (
                                <button
                                    key={s.slug}
                                    onClick={() => onNavigate(`#/eixo/${s.slug}`)}
                                    className="w-full flex items-center gap-5 bg-white/5 p-4 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden active:scale-[0.98]"
                                >
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                                        <img src={s.coverUrl} alt={s.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-white text-base truncate">{s.subtitle}</div>
                                        <div className="text-[11px] text-white/50 line-clamp-1 uppercase tracking-wider mt-0.5">
                                            {s.title}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-secondary text-primary transform group-hover:scale-110 transition-transform">
                                        <Play className="w-4 h-4 fill-current" />
                                    </div>
                                </button>
                            ))}
                    </div>
                </div>

                {/* Social Section */}
                <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary mb-8 text-center md:text-left opacity-80">
                        SIGANOS PARA TER EIXO, DIREÇÃO E CLAREZA
                    </h3>

                    <div className="space-y-6">
                        {eixoData.socialLinks.map((link) => {
                            const iconData = IconMap[link.icon] || Globe;
                            const isImagePath = typeof iconData === 'string';
                            const DynamicIcon = iconData;

                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white/5 p-6 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all group active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-5 mb-4">
                                        <div className="p-0 rounded-2xl bg-secondary text-primary shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform overflow-hidden w-14 h-14 flex items-center justify-center">
                                            {isImagePath ? (
                                                <img src={iconData} alt={link.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <DynamicIcon className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white text-xl tracking-tight">{link.name}</div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="text-[14px] text-white/60 leading-relaxed font-medium pl-1">
                                        {link.description}
                                    </div>
                                </a>
                            );
                        })}

                        {/* Custom Mapadaherdeiro link */}
                        <a
                            href="https://mapadaherdeiro.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 py-10 text-secondary font-black text-[12px] uppercase tracking-[0.3em] hover:opacity-100 opacity-60 transition-all hover:scale-105"
                        >
                            <Globe className="w-5 h-5" />
                            mapadaherdeiro.com.br
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EixoPlayer;
