import React, { useState } from 'react';
import colecaoData from '../../data/colecao.json';
import { Settings, Book, Headphones, Globe, Database, Loader2, Save, ExternalLink, Shield, X, Upload } from 'lucide-react';

const AdminEixos = ({ onNavigate }) => {
    const [data, setData] = useState(colecaoData);
    const [saving, setSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSave = () => {
        setSaving(true);
        // Simulação de salvamento - no futuro integraria com API/Supabase
        setTimeout(() => {
            setSaving(false);
            alert("Metadados da coleção sincronizados com sucesso!");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1A365D]">
            {/* Modal de Zoom da Capa */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-10 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={40} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="max-w-full max-h-full shadow-2xl rounded-sm border border-white/10 animate-in zoom-in-95 duration-300"
                    />
                </div>
            )}

            {/* Header Admin */}
            <header className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-[#1A365D] p-2 rounded-lg text-white">
                        <Database size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Painel da Coleção</h1>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Gestão Estratégica de Ativos</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => onNavigate('#/admin/dashboard')}
                        className="text-sm font-bold text-slate-500 hover:text-[#1A365D]"
                    >
                        Dashboard Principal
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#1A365D] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#244A7F] transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Salvar Alterações
                    </button>
                </div>
            </header>

            <main className="p-8 max-w-7xl mx-auto space-y-10">
                {/* Info Geral */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coleção</span>
                        <p className="text-2xl font-serif font-bold text-[#1A365D]">{data.colecao}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Autor</span>
                        <p className="text-2xl font-serif font-bold text-[#1A365D]">{data.autor}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mentor</span>
                        <p className="text-2xl font-serif font-bold text-[#1A365D]">{data.mentor}</p>
                    </div>
                </div>

                {/* Grid de Eixos */}
                <div className="grid gap-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#B8860B] border-l-4 border-[#B8860B] pl-4">Volumes na Prateleira</h2>

                    {data.eixos.map((eixo) => (
                        <div key={eixo.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row">
                                {/* Preview Lateral */}
                                <div className="md:w-48 bg-slate-50 p-6 flex flex-col items-center justify-center border-r border-slate-100 gap-4">
                                    <div className="relative group">
                                        <img src={eixo.capa_v2} alt={eixo.titulo} className="w-32 h-auto shadow-lg rounded-sm" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <button
                                                onClick={() => setSelectedImage(eixo.capa_v2)}
                                                className="text-white text-[10px] font-bold p-2 border border-white"
                                            >
                                                VER CAPA
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${eixo.ebook_status === 'pronto' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {eixo.ebook_status}
                                        </span>
                                        <span className="text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter bg-blue-100 text-blue-700">
                                            v3
                                        </span>
                                    </div>
                                </div>

                                {/* Form de Dados */}
                                <div className="flex-1 p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Título do Volume</label>
                                            <p className="text-lg font-serif font-bold text-[#1A365D]">{eixo.titulo}</p>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">ISBN</label>
                                            <input
                                                type="text"
                                                defaultValue={eixo.isbn}
                                                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-[#1A365D]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Link Checkout (Voomp)</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    defaultValue={eixo.voomp_link}
                                                    className="flex-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm text-[#1A365D]"
                                                />
                                                <button className="p-2 text-slate-400 hover:text-[#1A365D]"><ExternalLink size={16} /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Audiobook</label>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${eixo.audio_status === 'concluido' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                                    <span className="text-xs font-bold uppercase">{eixo.audio_status}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Status Venda</label>
                                                <div className="flex items-center gap-2 text-[#B8860B]">
                                                    <Globe size={14} />
                                                    <span className="text-xs font-bold uppercase">Online</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end gap-3">
                                        <button
                                            onClick={() => onNavigate('#/eixo-' + eixo.id)}
                                            className="w-full bg-[#1A365D] text-white py-2 rounded font-bold text-xs hover:bg-[#244A7F] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            <Globe size={14} />
                                            Página de Vendas
                                        </button>
                                        <button
                                            onClick={() => onNavigate('#/leitura?eixo=' + eixo.id)}
                                            className="w-full bg-white border border-[#B8860B] text-[#B8860B] py-2 rounded font-bold text-xs hover:bg-[#B8860B] hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            <Book size={14} />
                                            Acessar Ebook (Reader)
                                        </button>
                                        <button className="w-full bg-[#B8860B]/10 text-[#B8860B] py-2 rounded font-bold text-xs hover:bg-[#B8860B] hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                            <Upload size={14} />
                                            Subir Nova Capa (v3)
                                        </button>
                                        <button className="w-full bg-[#F8FAFC] text-slate-400 py-2 rounded font-bold text-xs hover:text-[#1A365D] transition-all uppercase tracking-widest">
                                            Subir Novo PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Banner de Segurança */}
            <div className="px-8 pb-12">
                <div className="bg-[#1A365D]/5 border border-[#1A365D]/10 rounded-xl p-8 flex items-center gap-6">
                    <div className="text-[#1A365D] opacity-40"><Shield size={40} /></div>
                    <div>
                        <h4 className="font-bold text-[#1A365D]">Central de Ativos Protegida</h4>
                        <p className="text-sm text-slate-500 max-w-2xl font-light">
                            Este cérebro de dados permite que agentes autônomos compreendam a estrutura da sua coleção e gerem novos conteúdos de forma coerente e alinhada ao design sistema.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEixos;
