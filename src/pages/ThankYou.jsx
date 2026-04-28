import React from 'react';
import { MessageSquare, ArrowLeft, BookOpen, PlayCircle, Sparkles, ArrowRight } from 'lucide-react';

const ThankYou = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">

            <div className="p-8 rounded-2xl shadow-xl max-w-lg w-full border border-secondary/20 bg-[#FDFCF7]">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                    <Sparkles size={32} />
                </div>

                <h1 className="text-3xl font-serif text-primary mb-4 font-bold">
                    Tudo Pronto!
                </h1>

                <p className="text-neutral-sage mb-8 leading-relaxed text-sm">
                    Sua jornada de realinhamento começa agora. <br />
                    O acesso ao seu material exclusivo já foi liberado.
                </p>

                <div className="space-y-4">
                    <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-2xl text-left relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="relative z-10">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                                <BookOpen size={14} className="text-secondary" /> Experiência Digital Premium
                            </h4>
                            <p className="text-primary font-serif font-bold text-lg mb-2">
                                Ler + Ouvir + Alinhamento
                            </p>
                            <p className="text-[10px] text-neutral-sage mb-6 leading-relaxed">
                                Acesse agora o leitor inteligente: ajuste fontes, mude o tema e ouça a mensagem do Rabino sem precisar baixar nada.
                            </p>
                            <button
                                onClick={() => window.location.hash = '#/ler-online'}
                                className="w-full bg-secondary text-primary font-bold py-4 rounded-xl shadow-md hover:bg-secondary-dark transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                <PlayCircle size={18} /> Abrir Agora
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#1B3B5F]/5 border border-[#1B3B5F]/10 p-4 rounded-xl mb-4">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">
                            📧 Também enviamos o link permanente para o seu e-mail.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 mt-4">
                        <p className="text-[10px] text-neutral-sage font-bold uppercase tracking-widest mb-4">Próximo Passo:</p>
                        <a
                            href="https://l.instagram.com/?u=https%3A%2F%2Fbit.ly%2F496Zk_SaladoMapaGrupoSecreto%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1aV3l-cy1Y7XXdCp5WAQXt_TLjKPQ_P-ZvJEK8Smw0xa1IHzE00dIROGiEc_aem_2mC6U8UJROuFWz0q0cWkmQ&e=AT4XbQqkD-n2xvFMPgUX6aibMCNdkDu5ofID_fOLBfT28pWigFMa61EOee54cxblZaTjY5IrT6wncUQWeohtPiINqZzuKwJ5gb10kY-vvQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#1B3B5F] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                        >
                            <MessageSquare size={18} />
                            Entrar no Grupo da Turma Fundadora
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <button
                    onClick={() => window.location.hash = '#/'}
                    className="text-primary hover:text-secondary flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft size={14} />
                    Voltar para o Início
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
