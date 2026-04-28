import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Phone, Tag, Thermometer, Clipboard, Save, Trash2, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const LeadDetailModal = ({ lead, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        ...lead,
        tags: lead?.tags || []
    });
    const [saving, setSaving] = useState(false);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        setFormData({
            ...lead,
            tags: lead?.tags || []
        });
    }, [lead]);

    if (!lead) return null;

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('leads')
                .update({
                    status: formData.status,
                    temperatura: formData.temperatura,
                    tags: formData.tags,
                    observacoes_internas: formData.observacoes_internas,
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp
                })
                .eq('id', lead.id);

            if (error) throw error;
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar lead:', error);
            alert('Falha ao salvar as alterações.');
        } finally {
            setSaving(false);
        }
    };

    const addTag = () => {
        const currentTags = formData.tags || [];
        if (newTag && !currentTags.includes(newTag)) {
            setFormData({ ...formData, tags: [...currentTags, newTag] });
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        const currentTags = formData.tags || [];
        setFormData({ ...formData, tags: currentTags.filter(t => t !== tagToRemove) });
    };

    return (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-primary text-secondary p-6 flex justify-between items-center border-b border-secondary/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary border border-secondary/20 font-serif text-xl">
                            {lead.name[0]}
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold leading-tight">{lead.name}</h2>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Perfil do Herdeiro</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block text-[10px] uppercase font-black text-neutral-sage tracking-widest">Informações de Contato</label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-primary p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <Mail size={16} className="text-neutral-sage" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-transparent border-none outline-none w-full font-medium"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-sm text-primary p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <Phone size={16} className="text-neutral-sage" />
                                    <input
                                        type="text"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="bg-transparent border-none outline-none w-full font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] uppercase font-black text-neutral-sage tracking-widest">Status da Jornada</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-neutral-sage px-1">STATUS</span>
                                    <select
                                        value={formData.status || 'Novo'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full text-xs font-bold p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                                    >
                                        <option value="Novo">Novo</option>
                                        <option value="Engajado">Engajado</option>
                                        <option value="Qualificado">Qualificado</option>
                                        <option value="Interessado">Interessado</option>
                                        <option value="Comprador">Comprador</option>
                                        <option value="Inativo">Inativo</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-neutral-sage px-1">TEMPERATURA</span>
                                    <select
                                        value={formData.temperatura || 'Morno'}
                                        onChange={(e) => setFormData({ ...formData, temperatura: e.target.value })}
                                        className="w-full text-xs font-bold p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                                    >
                                        <option value="Quente">🔥 Quente</option>
                                        <option value="Morno">🟠 Morno</option>
                                        <option value="Frio">❄️ Frio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                        <label className="block text-[10px] uppercase font-black text-neutral-sage tracking-widest">Tags de Identificação</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.tags?.map((tag) => (
                                <div key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[11px] font-bold">
                                    <Tag size={12} />
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors ml-1"><X size={12} /></button>
                                </div>
                            ))}
                            {(!formData.tags || formData.tags.length === 0) && <p className="text-xs text-neutral-sage italic">Sem tags definidas.</p>}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Nova tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                className="flex-1 text-xs border border-neutral-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                            />
                            <button onClick={addTag} className="bg-neutral-100 text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-neutral-200 transition-colors">ADICIONAR</button>
                        </div>
                    </div>

                    {/* Diagnóstico & Próximo Passo (V2.2 - Regras Automáticas) */}
                    <div className="space-y-4 pt-4 border-t border-secondary/20">
                        <label className="block text-[10px] uppercase font-black text-secondary tracking-widest flex items-center gap-2">
                            <Target size={14} className="text-secondary" /> Diagnóstico & Próximo Passo Recomendado
                        </label>

                        {(() => {
                            const tags = formData.tags || [];
                            const dorTag = tags.find(t => t.startsWith('dor_'));
                            const perfilTag = tags.find(t => t.startsWith('perfil_'));
                            const prospeTag = tags.find(t => t.startsWith('interesse_prosperidade_'));

                            // Motor de Regras
                            let linha = "Clareza & Contexto";
                            let ideias = ["Verso com contexto", "Bíblia sem confusão", "Explicação simples"];
                            let cta = "Sala do Mapa";

                            if (dorTag === 'dor_aplicacao_pratica') {
                                linha = "Passo & Rotina";
                                ideias = ["Checklist diário", "Rotina semanal", "Decisão segura em 10 min"];
                                cta = "Diagnóstico";
                            } else if (dorTag === 'dor_fe_estagnada') {
                                linha = "Retomada & Constância";
                                ideias = ["Protocolo Perdi um Dia", "Recomeço sem culpa", "Consistência espiritual"];
                                cta = "Sala do Mapa";
                            } else if (dorTag === 'dor_rotina_oracao_estudo') {
                                linha = "Hábito & Disciplina";
                                ideias = ["Plano de 7 dias", "Agenda curta de oração", "Método de leitura"];
                                cta = "Diagnóstico";
                            } else if (dorTag === 'dor_proposito') {
                                linha = "Direção & Identidade";
                                ideias = ["Mapa de decisões", "Propósito prático", "Identidade/Aliança"];
                                cta = "Sala do Mapa";
                            }

                            // Ajustes de Tom por Perfil
                            const tom = perfilTag === 'perfil_lider' ? " (Foco em Liderança/Condução)" :
                                perfilTag === 'perfil_empresario' ? " (Foco em Mordomia/Ética)" : "";

                            // Ajuste Prosperidade
                            const ganchoProsp = (prospeTag === 'interesse_prosperidade_sim' || prospeTag === 'interesse_prosperidade_cautela')
                                ? " + Gancho de Mordomia Bíblica" : "";

                            return (
                                <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-neutral-sage uppercase mb-1">Linha Editorial Sugerida</p>
                                        <p className="text-sm font-serif font-bold text-primary italic">"{linha}{tom}{ganchoProsp}"</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {ideias.map((ideia, idx) => (
                                            <div key={idx} className="bg-white p-3 rounded-xl border border-secondary/10 shadow-sm">
                                                <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Ideia {idx + 1}</p>
                                                <p className="text-[11px] font-bold text-primary">{ideia}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <p className="text-[10px] font-black text-neutral-sage uppercase">CTA Recomendado:</p>
                                        <span className="bg-primary text-secondary px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            {cta}
                                        </span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Respostas da Pesquisa (Qualificação) */}
                    {(lead.perfil_aluno || lead.maior_dificuldade) && (
                        <div className="space-y-4 pt-4 border-t border-neutral-100">
                            <label className="block text-[10px] uppercase font-black text-secondary tracking-widest flex items-center gap-2">
                                <Clipboard size={14} /> Mapa de Qualificação (Perfil)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Perfil do Herdeiro</p>
                                    <p className="text-sm text-primary font-bold lowercase capitalize">
                                        {lead.perfil_aluno || 'Não respondido'}
                                    </p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Fase de Vida</p>
                                    <p className="text-sm text-primary font-bold">{lead.fase_vida?.replace('_', '–').replace('plus', '+') || 'Não respondido'}</p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10 md:col-span-2">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Dor Principal</p>
                                    <p className="text-sm text-primary font-bold">
                                        {lead.maior_dificuldade === '1' ? 'Dificuldade em entender a linguagem bíblica' :
                                            lead.maior_dificuldade === '2' ? 'Não sei como aplicar os ensinos no dia a dia' :
                                                lead.maior_dificuldade === '3' ? 'Sinto que minha fé está estagnada' :
                                                    lead.maior_dificuldade === '4' ? 'Dificuldade em manter rotina de oração/estudo' :
                                                        lead.maior_dificuldade === '5' ? 'Dúvidas sobre o meu propósito de vida' : lead.maior_dificuldade || 'Não respondido'}
                                    </p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10 md:col-span-2">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Observação (O que quer destravar)</p>
                                    <p className="text-sm text-primary font-medium italic italic">"{lead.expectativas || 'Nenhuma observação deixada.'}"</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                        <label className="block text-[10px] uppercase font-black text-neutral-sage tracking-widest flex items-center gap-2">
                            <Clipboard size={14} /> Observações Internas (Só você vê)
                        </label>
                        <textarea
                            value={formData.observacoes_internas || ''}
                            onChange={(e) => setFormData({ ...formData, observacoes_internas: e.target.value })}
                            placeholder="Adicione notas estratégicas sobre este lead..."
                            className="w-full h-32 text-sm p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none font-medium leading-relaxed"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-neutral-50 p-6 flex justify-between items-center border-t border-neutral-200">
                    <p className="text-[10px] text-neutral-sage font-medium italic">Cadastrado em {new Date(lead.created_at).toLocaleString('pt-BR')}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-xs font-bold text-neutral-sage hover:bg-neutral-200 transition-all"
                        >
                            CANCELAR
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-secondary text-primary px-8 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-secondary/20 transition-all disabled:opacity-50"
                        >
                            {saving ? 'SALVANDO...' : <><Save size={16} /> SALVAR ALTERAÇÕES</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetailModal;
