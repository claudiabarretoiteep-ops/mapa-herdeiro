import { X, Send, User, Mail, Phone, Tag, Thermometer, Clipboard, Save, Trash2 } from 'lucide-react';
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

                    {/* Respostas da Pesquisa (Qualificação) */}
                    {(lead.perfil_aluno || lead.maior_dificuldade) && (
                        <div className="space-y-4 pt-4 border-t border-neutral-100">
                            <label className="block text-[10px] uppercase font-black text-secondary tracking-widest flex items-center gap-2">
                                <Clipboard size={14} /> Mapa de Posicionamento Espiritual
                            </label>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Perfil do Herdeiro</p>
                                    <p className="text-sm text-primary font-bold">
                                        {lead.perfil_aluno === '1' ? 'Iniciante: Buscando primeiros passos' :
                                            lead.perfil_aluno === '2' ? 'Líder: Já ensino ou lidero others' :
                                                lead.perfil_aluno === '3' ? 'Desalinhado: Vida precisa de ordem' :
                                                    lead.perfil_aluno === '4' ? 'Investidor: Alinhamento financeiro' :
                                                        lead.perfil_aluno || 'Não respondido'}
                                    </p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Exerce Liderança?</p>
                                    <p className="text-sm text-primary font-bold">{lead.perfil_lideranca || 'Não respondido'}</p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">Maior Dificuldade Atual</p>
                                    <p className="text-sm text-primary font-medium italic italic">"{lead.maior_dificuldade || 'Não respondido'}"</p>
                                </div>
                                <div className="bg-[#FDFCF7] p-4 rounded-xl border border-secondary/10">
                                    <p className="text-[9px] font-bold text-neutral-sage uppercase mb-1">O que espera da Sala do Mapa?</p>
                                    <p className="text-sm text-primary font-medium italic italic">"{lead.expectativas || 'Não respondido'}"</p>
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
