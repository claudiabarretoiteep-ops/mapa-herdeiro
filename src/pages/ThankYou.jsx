import React from 'react';
import { Download, MessageSquare, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">

            <div className="p-8 rounded-2xl shadow-xl max-w-lg w-full border border-secondary/20 bg-[#FDFCF7]">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Download size={32} />
                </div>

                <h1 className="text-3xl font-serif text-primary mb-4 font-bold">
                    Parabéns, Herdeiro!
                </h1>

                <p className="text-neutral-sage mb-8 leading-relaxed text-sm">
                    Sua decisão de governar a própria história começa agora.
                    O material exclusivo que preparamos já está disponível para você.
                </p>

                <div className="space-y-4">
                    <a
                        href="/ebook-mapa-do-herdeiro.pdf"
                        download
                        className="block w-full bg-[#1B3B5F] text-[#D4AF37] font-bold py-4 rounded-xl shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                    >
                        <Download size={18} />
                        BAIXAR O MAPA EM PDF
                    </a>

                    <div className="pt-4 border-t border-neutral-100 mt-4">
                        <p className="text-[10px] text-neutral-sage font-bold uppercase tracking-widest mb-4">Próximo Passo:</p>
                        <a
                            href="https://l.instagram.com/?u=https%3A%2F%2Fbit.ly%2F496Zk_SaladoMapaGrupoSecreto%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1aV3l-cy1Y7XXdCp5WAQXt_TLjKPQ_P-ZvJEK8Smw0xa1IHzE00dIROGiEc_aem_2mC6U8UJROuFWz0q0cWkmQ&e=AT4XbQqkD-n2xvFMPgUX6aibMCNdkDu5ofID_fOLBfT28pWigFMa61EOee54cxblZaTjY5IrT6wncUQWeohtPiINqZzuKwJ5gb10kY-vvQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                        >
                            <MessageSquare size={18} />
                            Entrar no Grupo Secreto
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
                    Página Inicial
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
