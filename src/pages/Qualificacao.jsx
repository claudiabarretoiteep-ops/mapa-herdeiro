import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, ArrowRight, Target, Heart, ShieldCheck } from 'lucide-react';

const Qualificacao = ({ onBack }) => {
    const [step, setStep] = useState(1); // 1: Email, 2: Questions, 3: Success
    const [loading, setLoading] = useState(false);
    const [leadEmail, setLeadEmail] = useState('');
    const [formData, setFormData] = useState({
        q1_dor_principal: '',
        q2_prosperidade: '',
        q3_perfil: '',
        q4_texto_livre: '',
        q5_fase_vida: ''
    });

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('id, name')
                .eq('email', leadEmail.toLowerCase().trim())
                .single();

            if (error || !data) {
                alert('Email não encontrado. Por favor, use o mesmo email que você usou para baixar o ebook.');
                return;
            }
            setStep(2);
        } catch (error) {
            console.error('Erro ao buscar lead:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Processar Tags Automáticas conforme PRD V2.1
            const tags = [];

            // Tags Q1 (Dor)
            const dorTags = {
                '1': 'dor_linguagem_biblica',
                '2': 'dor_aplicacao_pratica',
                '3': 'dor_fe_estagnada',
                '4': 'dor_rotina_oracao_estudo',
                '5': 'dor_proposito'
            };
            if (dorTags[formData.q1_dor_principal]) tags.push(dorTags[formData.q1_dor_principal]);

            // Tags Q2 (Prosperidade)
            if (formData.q2_prosperidade === 'sim') tags.push('interesse_prosperidade_sim');
            if (formData.q2_prosperidade === 'cautela') tags.push('interesse_prosperidade_cautela');
            if (formData.q2_prosperidade === 'nao') tags.push('interesse_prosperidade_nao');

            // Tags Q3 (Perfil)
            const perfilTags = {
                'aluno': 'perfil_aluno',
                'lider': 'perfil_lider',
                'empresario': 'perfil_empresario',
                'recomeco': 'perfil_recomeco'
            };
            if (perfilTags[formData.q3_perfil]) tags.push(perfilTags[formData.q3_perfil]);

            // Tags Q5 (Fase de Vida)
            const idadeTags = {
                '18_24': 'idade_18_24',
                '25_34': 'idade_25_34',
                '35_44': 'idade_35_44',
                '45_54': 'idade_45_54',
                '55_plus': 'idade_55_plus'
            };
            if (idadeTags[formData.q5_fase_vida]) tags.push(idadeTags[formData.q5_fase_vida]);

            // 2. Lógica de Temperatura
            let novaTemperatura = 'Morno';
            const isEstrategico = ['lider', 'empresario'].includes(formData.q3_perfil);
            if (isEstrategico && formData.q2_prosperidade !== 'nao') {
                novaTemperatura = 'Quente';
            } else if (formData.q2_prosperidade === 'cautela') {
                novaTemperatura = 'Morno';
            }

            // 3. Obter lead atual (Usando select().eq() sem .single() para evitar crash se houver duplicidade ou erro de conexão)
            const { data: leadsFound } = await supabase
                .from('leads')
                .select('name, status, tags, temperatura')
                .eq('email', leadEmail.toLowerCase().trim());

            const currentLead = leadsFound?.[0];

            if (!currentLead) {
                throw new Error('Lead não encontrado para o email informado.');
            }

            const finalTags = Array.from(new Set([...(currentLead?.tags || []), ...tags]));
            const finalStatus = currentLead?.status === 'Comprador' ? 'Comprador' : 'Qualificado';

            // 4. Update Supabase
            const { error } = await supabase
                .from('leads')
                .update({
                    perfil_aluno: formData.q3_perfil,
                    perfil_lideranca: formData.q3_perfil === 'lider' ? 'Sim' : 'Não',
                    maior_dificuldade: formData.q1_dor_principal,
                    expectativas: formData.q4_texto_livre,
                    tags: finalTags,
                    status: finalStatus,
                    temperatura: novaTemperatura,
                    fase_vida: formData.q5_fase_vida
                })
                .eq('email', leadEmail.toLowerCase().trim());

            if (error) throw error;

            // Enviar para Google Sheets (em background)
            const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
            if (webhookUrl) {
                fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({
                        email: leadEmail,
                        name: currentLead?.name,
                        whatsapp: currentLead?.whatsapp || '',
                        perfil: formData.q3_perfil,
                        dor_principal: formData.q1_dor_principal,
                        prosperidade: formData.q2_prosperidade,
                        expectativas: formData.q4_texto_livre,
                        fase_vida: formData.q5_fase_vida,
                        tags: finalTags.join(', '),
                        temperatura: novaTemperatura,
                        status: finalStatus
                    })
                })
                    .then(() => console.log('Dados do diagnóstico enviados!'))
                    .catch(err => console.error('Erro ao conectar com Google:', err));
            }

            setStep(3);
        } catch (error) {
            console.error('Erro ao atualizar lead:', error);
            alert('Erro ao salvar suas respostas. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-[#FDFCF7] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif text-[#1B3B5F] mb-4 font-bold">Perfil Qualificado!</h2>
                <p className="text-neutral-500 mb-8 leading-relaxed max-w-xs">
                    Suas raízes foram mapeadas. Seus ensinos na Sala do Mapa serão muito mais profundos agora.
                </p>
                <a
                    href="https://l.instagram.com/?u=https%3A%2F%2Fbit.ly%2F496Zk_SaladoMapaGrupoSecreto%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1aV3l-cy1Y7XXdCp5WAQXt_TLjKPQ_P-ZvJEK8Smw0xa1IHzE00dIROGiEc_aem_2mC6U8UJROuFWz0q0cWkmQ&e=AT4XbQqkD-n2xvFMPgUX6aibMCNdkDu5ofID_fOLBfT28pWigFMa61EOee54cxblZaTjY5IrT6wncUQWeohtPiINqZzuKwJ5gb10kY-vvQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs bg-[#1B3B5F] text-[#D4AF37] py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                >
                    ENTRAR NA SALA (WHATSAPP)
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF7] flex flex-col font-sans select-none">
            {/* Minimal Header for Mobile */}
            <header className="p-6 flex items-center justify-between border-b border-neutral-100 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <Target className="text-[#D4AF37]" size={24} />
                    <span className="font-serif font-bold text-[#1B3B5F] text-lg uppercase tracking-tighter">SALA DO MAPA</span>
                </div>
            </header>

            <main className="flex-1 p-6 md:flex md:items-center md:justify-center">
                <div className="max-w-md w-full mx-auto">
                    {step === 1 ? (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                                MAPA DE POSICIONAMENTO ESPIRITUAL
                            </span>
                            <h1 className="text-3xl font-serif text-[#1B3B5F] mb-4 leading-tight font-bold">
                                Como está o seu <span className="italic">posicionamento</span> atual?
                            </h1>
                            <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
                                Antes de avançarmos, precisamos entender sua fase e seus desafios para te entregar o caminho certo.
                            </p>

                            <form onSubmit={handleEmailSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-neutral-400 tracking-widest ml-1">E-mail de Cadastro</label>
                                    <input
                                        type="email"
                                        required
                                        value={leadEmail}
                                        onChange={(e) => setLeadEmail(e.target.value)}
                                        placeholder="ex: voce@email.com"
                                        className="w-full p-5 bg-white border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-primary shadow-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#1B3B5F] text-[#D4AF37] py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#254a75] transition-all shadow-xl shadow-primary/10 disabled:opacity-50 active:scale-95"
                                >
                                    {loading ? 'BUSCANDO...' : <><ArrowRight size={20} /> INICIAR PESQUISA</>}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500 pb-12">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-xl font-serif text-[#1B3B5F] font-bold">Responda com sinceridade</h2>
                                <span className="text-[10px] font-bold text-neutral-400">PASSO 2/2</span>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                {/* Q1 (OBRIGATÓRIA) - Dor */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-[#1B3B5F]">Hoje, o que mais te trava na caminhada?</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: '1', label: 'Dificuldade em entender a linguagem bíblica' },
                                            { id: '2', label: 'Não sei como aplicar os ensinos no dia a dia' },
                                            { id: '3', label: 'Sinto que minha fé está estagnada' },
                                            { id: '4', label: 'Dificuldade em manter rotina de oração/estudo' },
                                            { id: '5', label: 'Dúvidas sobre o meu propósito de vida' }
                                        ].map((opt) => (
                                            <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${formData.q1_dor_principal === opt.id ? 'bg-[#1B3B5F]/5 border-[#D4AF37]' : 'border-neutral-100 bg-white'}`}>
                                                <input
                                                    type="radio"
                                                    required
                                                    name="q1"
                                                    value={opt.id}
                                                    checked={formData.q1_dor_principal === opt.id}
                                                    onChange={(e) => setFormData({ ...formData, q1_dor_principal: e.target.value })}
                                                    className="accent-[#D4AF37] h-4 w-4"
                                                />
                                                <span className="text-xs font-bold text-[#1B3B5F]/90">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q2 (OPCIONAL) - Prosperidade */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-[#1B3B5F]">Você tem interesse em prosperidade bíblica?</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'sim', label: 'Sim, quero aprender e aplicar' },
                                            { id: 'cautela', label: 'Tenho curiosidade, mas com cautela' },
                                            { id: 'nao', label: 'Não é meu foco agora' }
                                        ].map((opt) => (
                                            <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${formData.q2_prosperidade === opt.id ? 'bg-[#1B3B5F]/5 border-[#D4AF37]' : 'border-neutral-100 bg-white'}`}>
                                                <input
                                                    type="radio"
                                                    name="q2"
                                                    value={opt.id}
                                                    checked={formData.q2_prosperidade === opt.id}
                                                    onChange={(e) => setFormData({ ...formData, q2_prosperidade: e.target.value })}
                                                    className="accent-[#D4AF37] h-4 w-4"
                                                />
                                                <span className="text-xs font-bold text-[#1B3B5F]/90">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q3 (OPCIONAL) - Perfil */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-[#1B3B5F]">Hoje você se vê mais como...</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'aluno', label: 'Aluno buscando fundamento e clareza' },
                                            { id: 'lider', label: 'Líder / obreiro / pastor' },
                                            { id: 'empresario', label: 'Empreendedor / empresário' },
                                            { id: 'recomeco', label: 'Recomeçando a vida espiritual' },
                                            { id: 'oculto', label: 'Prefiro não dizer' }
                                        ].map((opt) => (
                                            <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${formData.q3_perfil === opt.id ? 'bg-[#1B3B5F]/5 border-[#D4AF37]' : 'border-neutral-100 bg-white'}`}>
                                                <input
                                                    type="radio"
                                                    name="q3"
                                                    value={opt.id}
                                                    checked={formData.q3_perfil === opt.id}
                                                    onChange={(e) => setFormData({ ...formData, q3_perfil: e.target.value })}
                                                    className="accent-[#D4AF37] h-4 w-4"
                                                />
                                                <span className="text-xs font-bold text-[#1B3B5F]/90">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q4 (OPCIONAL) - Texto Livre */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-[#1B3B5F]">Em 1 frase, o que você mais quer destravar agora?</label>
                                    <input
                                        type="text"
                                        value={formData.q4_texto_livre}
                                        onChange={(e) => setFormData({ ...formData, q4_texto_livre: e.target.value })}
                                        placeholder="Sua resposta sugestiva..."
                                        maxLength={100}
                                        className="w-full p-5 bg-white border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-sm shadow-sm"
                                    />
                                </div>

                                {/* Q5 (OPCIONAL) - Fase de Vida */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-[#1B3B5F]">Em que fase de vida você está hoje?</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: '18_24', label: '18–24 (começando a vida adulta)' },
                                            { id: '25_34', label: '25–34 (construindo base/família/carreira)' },
                                            { id: '35_44', label: '35–44 (consolidando e liderando)' },
                                            { id: '45_54', label: '45–54 (reorganizando prioridades)' },
                                            { id: '55_plus', label: '55+ (legado e maturidade)' },
                                            { id: 'oculto', label: 'Prefiro não dizer' }
                                        ].map((opt) => (
                                            <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${formData.q5_fase_vida === opt.id ? 'bg-[#1B3B5F]/5 border-[#D4AF37]' : 'border-neutral-100 bg-white'}`}>
                                                <input
                                                    type="radio"
                                                    name="q5"
                                                    value={opt.id}
                                                    checked={formData.q5_fase_vida === opt.id}
                                                    onChange={(e) => setFormData({ ...formData, q5_fase_vida: e.target.value })}
                                                    className="accent-[#D4AF37] h-4 w-4"
                                                />
                                                <span className="text-xs font-bold text-[#1B3B5F]/90">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#1B3B5F] text-[#D4AF37] py-5 rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-xl shadow-[#1B3B5F]/10 active:scale-95 transition-all text-sm h-16"
                                >
                                    {loading ? 'ANALISANDO...' : <><Heart size={20} fill="currentColor" /> CONCLUIR MEU DIAGNÓSTICO</>}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-8 text-center bg-white border-t border-neutral-50">
                <div className="flex items-center justify-center gap-2 mb-2 text-neutral-400">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Acesso Seguro</span>
                </div>
                <p className="text-[10px] text-neutral-300">
                    © 2026 Sala do Mapa do Herdeiro
                </p>
            </footer>
        </div>
    );
};

export default Qualificacao;
