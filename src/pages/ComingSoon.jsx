import React from 'react';
import { Clock, ArrowLeft, Target, ShieldCheck } from 'lucide-react';

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-[#FDFCF7] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700 select-none">
            {/* Minimal Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Target className="text-[#D4AF37]" size={24} />
                    <span className="font-serif font-bold text-[#1B3B5F] text-lg uppercase tracking-tighter">SALA DO MAPA</span>
                </div>
            </div>

            <div className="w-24 h-24 bg-[#1B3B5F]/5 text-[#D4AF37] rounded-full flex items-center justify-center mb-10 shadow-sm border border-[#D4AF37]/20">
                <Clock size={48} />
            </div>

            <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                EM BREVE
            </span>

            <h1 className="text-4xl font-serif text-[#1B3B5F] mb-6 leading-tight font-bold max-w-md">
                O seu <span className="italic underline decoration-secondary/30">Diagnóstico</span> está sendo preparado.
            </h1>

            <p className="text-neutral-500 text-base mb-12 leading-relaxed max-w-sm mx-auto">
                Este nível de acesso será liberado em alguns dias para todos os herdeiros que estão na <span className="text-[#1B3B5F] font-bold">Sala do Mapa</span>.
                <br /><br />
                Fique atento ao grupo de WhatsApp para o anúncio da abertura.
            </p>

            <a
                href="#/"
                className="flex items-center gap-2 text-[#1B3B5F] font-bold text-sm hover:gap-3 transition-all"
            >
                <ArrowLeft size={18} /> VOLTAR PARA A HOME
            </a>

            <div className="absolute bottom-8 flex flex-col items-center gap-2 text-neutral-300">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Acesso Seguro</span>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
