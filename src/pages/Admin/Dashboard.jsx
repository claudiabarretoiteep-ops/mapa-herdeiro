import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Download, LogOut, Users, Target, ShoppingBag, Flame, Filter, ChevronRight, MessageSquare, Book, Database, Headphones, Globe, ExternalLink, Shield, Upload, X, Map, Plus, Check, Search, Edit3, Trash2, Save } from 'lucide-react';
import LeadDetailModal from '../../components/Admin/LeadDetailModal';
import colecaoData from '../../data/colecao.json';

const AdminDashboard = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('leads');
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [filterTemp, setFilterTemp] = useState('Todos');
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Jornada states
    const [jornada, setJornada] = useState([]);
    const [jornadaLoading, setJornadaLoading] = useState(false);
    const [jornadaSearch, setJornadaSearch] = useState('');
    const [jornadaFilter, setJornadaFilter] = useState('todos');
    const [editingLead, setEditingLead] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newLead, setNewLead] = useState({ nome: '', email: '', whatsapp: '' });

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [leads, filterStatus, filterTemp]);

    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Erro ao buscar leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...leads];
        if (filterStatus !== 'Todos') {
            result = result.filter(lead => lead.status === filterStatus);
        }
        if (filterTemp !== 'Todos') {
            result = result.filter(lead => lead.temperatura === filterTemp);
        }
        setFilteredLeads(result);
    };

    // ── Jornada functions ──
    const fetchJornada = async () => {
        setJornadaLoading(true);
        try {
            const { data, error } = await supabase
                .from('jornada_lead')
                .select('*')
                .order('data_entrada', { ascending: false });
            if (error) throw error;
            setJornada(data || []);
        } catch (error) {
            console.error('Erro ao buscar jornada:', error);
        } finally {
            setJornadaLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'jornada' && jornada.length === 0) fetchJornada();
    }, [activeTab]);

    const produtos = [
        { key: 'tem_sala_do_mapa', label: 'Sala do Mapa', short: 'SM' },
        { key: 'tem_dna', label: 'DNA', short: 'DNA' },
        { key: 'tem_eixo_1', label: 'Eixo 1', short: 'E1' },
        { key: 'tem_eixo_2', label: 'Eixo 2', short: 'E2' },
        { key: 'tem_eixo_3', label: 'Eixo 3', short: 'E3' },
        { key: 'tem_eixo_4', label: 'Eixo 4', short: 'E4' },
        { key: 'tem_eixo_5', label: 'Eixo 5', short: 'E5' },
        { key: 'tem_comunidade', label: 'Comunidade', short: 'COM' },
        { key: 'tem_shoresh', label: 'Shoresh', short: 'SH' },
        { key: 'tem_tora_viva', label: 'Torá Viva', short: 'TV' },
    ];

    const toggleProduto = async (lead, prodKey) => {
        const newVal = !lead[prodKey];
        const { error } = await supabase
            .from('jornada_lead')
            .update({ [prodKey]: newVal, updated_at: new Date().toISOString() })
            .eq('id', lead.id);
        if (!error) {
            setJornada(prev => prev.map(l => l.id === lead.id ? { ...l, [prodKey]: newVal } : l));
        }
    };

    const addLeadJornada = async () => {
        if (!newLead.nome || !newLead.whatsapp) return;
        const { data, error } = await supabase
            .from('jornada_lead')
            .insert([{ ...newLead, origem: 'manual' }])
            .select();
        if (!error && data) {
            setJornada(prev => [data[0], ...prev]);
            setNewLead({ nome: '', email: '', whatsapp: '' });
            setShowAddForm(false);
        }
    };

    const deleteLeadJornada = async (id) => {
        if (!window.confirm('Remover este contato da jornada?')) return;
        const { error } = await supabase.from('jornada_lead').delete().eq('id', id);
        if (!error) setJornada(prev => prev.filter(l => l.id !== id));
    };

    const filteredJornada = jornada.filter(l => {
        const matchSearch = !jornadaSearch ||
            (l.nome || '').toLowerCase().includes(jornadaSearch.toLowerCase()) ||
            (l.email || '').toLowerCase().includes(jornadaSearch.toLowerCase()) ||
            (l.whatsapp || '').includes(jornadaSearch);
        const matchFilter = jornadaFilter === 'todos' ||
            (jornadaFilter === 'sem_produto' && !produtos.some(p => l[p.key])) ||
            (jornadaFilter !== 'sem_produto' && l[jornadaFilter]);
        return matchSearch && matchFilter;
    });

    const jornadaStats = {
        total: jornada.length,
        sala: jornada.filter(l => l.tem_sala_do_mapa).length,
        dna: jornada.filter(l => l.tem_dna).length,
        eixos: jornada.filter(l => l.tem_eixo_1 || l.tem_eixo_2 || l.tem_eixo_3 || l.tem_eixo_4 || l.tem_eixo_5).length,
        comunidade: jornada.filter(l => l.tem_comunidade).length,
        shoresh: jornada.filter(l => l.tem_shoresh).length,
        tora: jornada.filter(l => l.tem_tora_viva).length,
        sem_nada: jornada.filter(l => !produtos.some(p => l[p.key])).length,
    };

    const exportJornadaCSV = () => {
        const headers = ['Nome', 'Email', 'WhatsApp', ...produtos.map(p => p.label), 'Origem', 'Entrada'];
        const csvContent = [
            headers.join(','),
            ...filteredJornada.map(l => [
                `"${l.nome || ''}"`, l.email || '', l.whatsapp || '',
                ...produtos.map(p => l[p.key] ? 'SIM' : ''),
                l.origem || '', new Date(l.data_entrada).toLocaleDateString('pt-BR')
            ].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `jornada_leads_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        if (onNavigate) onNavigate('#/admin');
    };

    const stats = {
        total: leads.length,
        respondentes: leads.filter(l => l.maior_dificuldade || l.tags?.length > 0).length,
        qualificados: leads.filter(l => l.status === 'Qualificado').length,
        quentes: leads.filter(l => l.temperatura === 'Quente').length
    };

    const funnelData = [
        { label: 'Novo', count: leads.filter(l => l.status === 'Novo').length, color: 'bg-gray-400', hexColor: '#9ca3af' },
        { label: 'Engajado', count: leads.filter(l => l.status === 'Engajado').length, color: 'bg-blue-500', hexColor: '#3b82f6' },
        { label: 'Qualificado', count: leads.filter(l => l.status === 'Qualificado').length, color: 'bg-green-500', hexColor: '#22c55e' },
        { label: 'Interessado', count: leads.filter(l => l.status === 'Interessado').length, color: 'bg-orange-500', hexColor: '#f97316' },
        { label: 'Comprador', count: leads.filter(l => l.status === 'Comprador').length, color: 'bg-yellow-600', hexColor: '#ca8a04' }
    ];

    const tempData = [
        { label: 'Quente', count: leads.filter(l => l.temperatura === 'Quente').length, color: 'bg-red-500', hexColor: '#ef4444' },
        { label: 'Morno', count: leads.filter(l => l.temperatura === 'Morno').length, color: 'bg-orange-500', hexColor: '#f97316' },
        { label: 'Frio', count: leads.filter(l => (l.temperatura === 'Frio' || !l.temperatura)).length, color: 'bg-blue-400', hexColor: '#60a5fa' }
    ];

    const dorData = [
        { label: 'Entender Bíblia', count: leads.filter(l => l.maior_dificuldade === '1').length, color: 'bg-indigo-600', hexColor: '#4f46e5' },
        { label: 'Aplicação Prática', count: leads.filter(l => l.maior_dificuldade === '2').length, color: 'bg-emerald-600', hexColor: '#059669' },
        { label: 'Fé Estagnada', count: leads.filter(l => l.maior_dificuldade === '3').length, color: 'bg-amber-500', hexColor: '#f59e0b' },
        { label: 'Rotina Oração', count: leads.filter(l => l.maior_dificuldade === '4').length, color: 'bg-rose-500', hexColor: '#f43f5e' },
        { label: 'Propósito', count: leads.filter(l => l.maior_dificuldade === '5').length, color: 'bg-primary', hexColor: '#1B3B5F' }
    ];

    const prosperidadeData = [
        { label: 'Sim', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_sim')).length, color: 'bg-secondary', hexColor: '#D4AF37' },
        { label: 'Cautela', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_cautela')).length, color: 'bg-orange-400', hexColor: '#fb923c' },
        { label: 'Não', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_nao')).length, color: 'bg-gray-400', hexColor: '#9ca3af' }
    ];

    const perfilV2Data = [
        { label: 'Aluno', count: leads.filter(l => l.perfil_aluno === 'aluno').length, color: 'bg-blue-600', hexColor: '#2563eb' },
        { label: 'Líder', count: leads.filter(l => l.perfil_aluno === 'lider').length, color: 'bg-indigo-700', hexColor: '#4338ca' },
        { label: 'Empresário', count: leads.filter(l => l.perfil_aluno === 'empresario').length, color: 'bg-primary', hexColor: '#1B3B5F' },
        { label: 'Recomeço', count: leads.filter(l => l.perfil_aluno === 'recomeco').length, color: 'bg-teal-600', hexColor: '#0d9488' }
    ];

    const faseVidaData = [
        { label: '18–24', count: leads.filter(l => l.fase_vida === '18_24').length, color: 'bg-pink-500', hexColor: '#ec4899' },
        { label: '25–34', count: leads.filter(l => l.fase_vida === '25_34').length, color: 'bg-rose-600', hexColor: '#e11d48' },
        { label: '35–44', count: leads.filter(l => l.fase_vida === '35_44').length, color: 'bg-orange-700', hexColor: '#c2410c' },
        { label: '45–54', count: leads.filter(l => l.fase_vida === '45_54').length, color: 'bg-amber-700', hexColor: '#b45309' },
        { label: '55+', count: leads.filter(l => l.fase_vida === '55_plus').length, color: 'bg-yellow-900', hexColor: '#713f12' }
    ];

    const handleResetTable = async () => {
        const confirmed = window.confirm("CUIDADO: Isso apagará TODOS os leads de forma permanente. Tem certeza?");
        if (!confirmed) return;

        const doubleCheck = window.prompt("Para confirmar, digite APAGAR:");
        if (doubleCheck !== 'APAGAR') return;

        try {
            setLoading(true);
            const { error } = await supabase
                .from('leads')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

            if (error) throw error;

            alert('Tabela zerada com sucesso!');
            await fetchLeads();
        } catch (error) {
            console.error('Erro ao limpar tabela:', error);
            alert('Erro ao limpar tabela. Verifique as permissões.');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Data', 'Nome', 'Email', 'WhatsApp', 'Status', 'Temperatura', 'Perfil', 'Prosperidade', 'Dor Principal', 'Fase de Vida', 'Observação'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                new Date(lead.created_at).toLocaleString('pt-BR'),
                `"${lead.name}"`,
                lead.email,
                lead.whatsapp,
                lead.status,
                lead.temperatura,
                `"${lead.perfil_aluno || ''}"`,
                `"${lead.tags?.includes('interesse_prosperidade_sim') ? 'Sim' : lead.tags?.includes('interesse_prosperidade_cautela') ? 'Cautela' : 'Não'}"`,
                `"${lead.maior_dificuldade === '1' ? 'Linguagem Bíblica' : lead.maior_dificuldade === '2' ? 'Aplicação Prática' : lead.maior_dificuldade === '3' ? 'Fé Estagnada' : lead.maior_dificuldade === '4' ? 'Rotina de Oração' : 'Dúvidas sobre Propósito'}"`,
                `"${lead.fase_vida || ''}"`,
                `"${(lead.expectativas || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `crm_mapa_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Modal de Zoom da Capa */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-10 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImage(null)}><X size={40} /></button>
                    <img src={selectedImage} alt="Preview" className="max-w-full max-h-full shadow-2xl rounded-sm border border-white/10" />
                </div>
            )}

            <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-serif text-xl border border-secondary/20 shadow-sm">M</div>
                        <div>
                            <h1 className="text-lg font-serif text-primary font-bold">Mapa do Herdeiro</h1>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-sage font-bold">Central Administrativa</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-neutral-sage hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-wider">
                        <LogOut size={14} /> Sair
                    </button>
                </div>
                {/* Tabs */}
                <div className="max-w-7xl mx-auto flex gap-1 mt-4">
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-[#FDFCFB] text-primary border border-b-0 border-neutral-200' : 'text-neutral-400 hover:text-primary'}`}
                    >
                        <Users size={14} /> Leads & CRM
                    </button>
                    <button
                        onClick={() => setActiveTab('eixos')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'eixos' ? 'bg-[#FDFCFB] text-primary border border-b-0 border-neutral-200' : 'text-neutral-400 hover:text-primary'}`}
                    >
                        <Book size={14} /> Serie Eixos
                    </button>
                    <button
                        onClick={() => setActiveTab('jornada')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'jornada' ? 'bg-[#FDFCFB] text-primary border border-b-0 border-neutral-200' : 'text-neutral-400 hover:text-primary'}`}
                    >
                        <Map size={14} /> Jornada
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">

            {activeTab === 'eixos' && (
                <div className="space-y-8">
                    {/* Info Geral */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Colecao</span>
                            <p className="text-2xl font-serif font-bold text-primary">{colecaoData.colecao}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Autor</span>
                            <p className="text-2xl font-serif font-bold text-primary">{colecaoData.autor}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Eixos</span>
                            <p className="text-2xl font-serif font-bold text-primary">{colecaoData.eixos.length} volumes</p>
                        </div>
                    </div>

                    {/* Grid de Eixos */}
                    <div className="grid gap-6">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-4">Volumes na Prateleira</h2>
                        {colecaoData.eixos.map((eixo) => (
                            <div key={eixo.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-48 bg-neutral-50 p-6 flex flex-col items-center justify-center border-r border-neutral-100 gap-4">
                                        <div className="relative group">
                                            <img src={eixo.capa_v2} alt={eixo.titulo} className="w-32 h-auto shadow-lg rounded-sm" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <button onClick={() => setSelectedImage(eixo.capa_v2)} className="text-white text-[10px] font-bold p-2 border border-white">VER CAPA</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${eixo.ebook_status === 'pronto' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{eixo.ebook_status}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block">Titulo do Volume</label>
                                                <p className="text-lg font-serif font-bold text-primary">{eixo.titulo}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block">ISBN</label>
                                                <p className="text-sm text-primary">{eixo.isbn}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block">Link Checkout (Voomp)</label>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-sm text-primary truncate flex-1">{eixo.voomp_link}</span>
                                                    {eixo.voomp_link !== '#' && <a href={eixo.voomp_link} target="_blank" className="p-2 text-neutral-400 hover:text-primary"><ExternalLink size={16} /></a>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block">Audiobook</label>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${eixo.audio_status === 'concluido' ? 'bg-green-500' : 'bg-neutral-300'}`}></div>
                                                        <span className="text-xs font-bold uppercase">{eixo.audio_status}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-neutral-400 uppercase mb-2 block">Status</label>
                                                    <div className="flex items-center gap-2 text-secondary">
                                                        <Globe size={14} />
                                                        <span className="text-xs font-bold uppercase">{eixo.id === 0 ? 'Gratuito' : 'Pago'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-end gap-3">
                                            {eixo.id > 0 && (
                                                <button onClick={() => onNavigate('#/eixo-' + eixo.id)} className="w-full bg-primary text-white py-2 rounded font-bold text-xs hover:bg-opacity-90 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                                    <Globe size={14} /> Pagina de Vendas
                                                </button>
                                            )}
                                            <button onClick={() => onNavigate('#/leitura?eixo=' + eixo.id)} className="w-full bg-white border border-secondary text-secondary py-2 rounded font-bold text-xs hover:bg-secondary hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                                <Book size={14} /> Acessar Ebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'jornada' && (
                <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total</p>
                            <p className="text-2xl font-serif font-bold text-primary">{jornadaStats.total}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Sala Mapa</p>
                            <p className="text-2xl font-serif font-bold text-blue-600">{jornadaStats.sala}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">DNA</p>
                            <p className="text-2xl font-serif font-bold text-indigo-600">{jornadaStats.dna}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Eixos</p>
                            <p className="text-2xl font-serif font-bold text-emerald-600">{jornadaStats.eixos}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Comunidade</p>
                            <p className="text-2xl font-serif font-bold text-amber-600">{jornadaStats.comunidade}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Shoresh</p>
                            <p className="text-2xl font-serif font-bold text-rose-600">{jornadaStats.shoresh}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Tora Viva</p>
                            <p className="text-2xl font-serif font-bold text-purple-600">{jornadaStats.tora}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Sem Nada</p>
                            <p className="text-2xl font-serif font-bold text-neutral-400">{jornadaStats.sem_nada}</p>
                        </div>
                    </div>

                    {/* Toolbar: Search + Filter + Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex flex-wrap gap-3 items-center flex-1">
                            <div className="relative flex-1 min-w-[200px] max-w-sm">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar nome, email ou WhatsApp..."
                                    value={jornadaSearch}
                                    onChange={(e) => setJornadaSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-primary outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                                />
                            </div>
                            <select
                                value={jornadaFilter}
                                onChange={(e) => setJornadaFilter(e.target.value)}
                                className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-3 py-2 font-bold text-neutral-sage outline-none focus:ring-1 focus:ring-secondary"
                            >
                                <option value="todos">Todos</option>
                                <option value="sem_produto">Sem nenhum produto</option>
                                {produtos.map(p => (
                                    <option key={p.key} value={p.key}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-secondary/90 transition-all shadow-sm">
                                <Plus size={14} /> Adicionar
                            </button>
                            <button onClick={exportJornadaCSV} className="flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all shadow-sm">
                                <Download size={14} /> CSV
                            </button>
                        </div>
                    </div>

                    {/* Add Form */}
                    {showAddForm && (
                        <div className="bg-white p-5 rounded-xl border border-secondary/30 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Novo Contato</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <input
                                    type="text"
                                    placeholder="Nome *"
                                    value={newLead.nome}
                                    onChange={(e) => setNewLead({ ...newLead, nome: e.target.value })}
                                    className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium outline-none focus:ring-1 focus:ring-secondary"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newLead.email}
                                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                    className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium outline-none focus:ring-1 focus:ring-secondary"
                                />
                                <input
                                    type="text"
                                    placeholder="WhatsApp *"
                                    value={newLead.whatsapp}
                                    onChange={(e) => setNewLead({ ...newLead, whatsapp: e.target.value })}
                                    className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium outline-none focus:ring-1 focus:ring-secondary"
                                />
                                <button
                                    onClick={addLeadJornada}
                                    disabled={!newLead.nome || !newLead.whatsapp}
                                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Save size={14} /> Salvar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] text-neutral-sage font-black uppercase tracking-widest">
                                    <th className="p-3">Nome</th>
                                    <th className="p-3">WhatsApp</th>
                                    {produtos.map(p => (
                                        <th key={p.key} className="p-3 text-center" title={p.label}>{p.short}</th>
                                    ))}
                                    <th className="p-3">Origem</th>
                                    <th className="p-3 text-center">Acao</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {jornadaLoading ? (
                                    <tr><td colSpan={produtos.length + 4} className="p-12 text-center text-neutral-sage italic text-sm">Carregando jornada...</td></tr>
                                ) : filteredJornada.length === 0 ? (
                                    <tr><td colSpan={produtos.length + 4} className="p-12 text-center text-neutral-sage text-sm">Nenhum contato encontrado.</td></tr>
                                ) : (
                                    filteredJornada.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors">
                                            <td className="p-3">
                                                <div className="flex flex-col">
                                                    <span className="font-serif text-primary font-bold text-sm">{lead.nome}</span>
                                                    <span className="text-[10px] text-neutral-sage">{lead.email || ''}</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                {lead.whatsapp ? (
                                                    <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-xs text-green-600 font-bold hover:underline">
                                                        {lead.whatsapp}
                                                    </a>
                                                ) : <span className="text-xs text-neutral-300">-</span>}
                                            </td>
                                            {produtos.map(p => (
                                                <td key={p.key} className="p-3 text-center">
                                                    <button
                                                        onClick={() => toggleProduto(lead, p.key)}
                                                        className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all ${lead[p.key] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-neutral-200 text-transparent hover:border-neutral-400'}`}
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                </td>
                                            ))}
                                            <td className="p-3">
                                                <span className="text-[10px] font-bold text-neutral-sage uppercase">{lead.origem || '-'}</span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => deleteLeadJornada(lead.id)}
                                                    className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors rounded"
                                                    title="Remover"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[10px] text-neutral-400 text-center">
                        Mostrando {filteredJornada.length} de {jornada.length} contatos
                    </p>
                </div>
            )}

            {activeTab === 'leads' && (
            <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard icon={<Users size={20} />} label="Total Leads" value={stats.total} color="text-primary" />
                    <MetricCard icon={<MessageSquare size={20} />} label="Respondentes" value={stats.respondentes} color="text-indigo-600" />
                    <MetricCard icon={<Target size={20} />} label="Qualificados" value={stats.qualificados} color="text-green-600" />
                    <MetricCard icon={<Flame size={20} />} label="Leads Quentes" value={stats.quentes} color="text-red-500" />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Section Expanded */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-neutral-100 pb-2 flex items-center gap-2">
                                <Target size={16} /> BI - Inteligência Herdeiro (V2.2)
                            </h3>

                            <div className="space-y-10">
                                {/* Row 1: Status & Temperatura */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Status da Base</h4>
                                        <PieChart data={funnelData} size="w-28 h-28" />
                                        <InsightLine data={funnelData} />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Temperatura</h4>
                                        <PieChart data={tempData} size="w-28 h-28" />
                                        <InsightLine data={tempData} />
                                    </div>
                                </div>

                                {/* Row 2: Dores & Prosperidade */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Dor Principal</h4>
                                        <PieChart data={dorData} size="w-28 h-28" />
                                        <InsightLine data={dorData} />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Prosperidade</h4>
                                        <PieChart data={prosperidadeData} size="w-28 h-28" />
                                        <InsightLine data={prosperidadeData} />
                                    </div>
                                </div>

                                {/* Row 3: Perfil (Full Width Center) */}
                                <div className="space-y-4 border-t border-neutral-50 pt-6">
                                    <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Perfil Estratégico</h4>
                                    <PieChart data={perfilV2Data} size="w-32 h-32" />
                                    <InsightLine data={perfilV2Data} />
                                </div>
                                <div className="space-y-4 border-t border-neutral-50 pt-6">
                                    <h4 className="text-[10px] font-black text-center text-neutral-sage uppercase tracking-widest leading-none">Fase de Vida</h4>
                                    <PieChart data={faseVidaData} size="w-32 h-32" />
                                    <InsightLine data={faseVidaData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex flex-wrap gap-2 items-center">
                                <Filter size={16} className="text-neutral-sage mr-2" />
                                <select
                                    className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-3 py-1.5 focus:ring-secondary focus:border-secondary outline-none font-bold text-neutral-sage"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option>Todos Status</option>
                                    <option>Novo</option>
                                    <option>Engajado</option>
                                    <option>Qualificado</option>
                                    <option>Interessado</option>
                                    <option>Comprador</option>
                                </select>
                                <select
                                    className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-3 py-1.5 focus:ring-secondary focus:border-secondary outline-none font-bold text-neutral-sage"
                                    value={filterTemp}
                                    onChange={(e) => setFilterTemp(e.target.value)}
                                >
                                    <option>Todas Temps</option>
                                    <option>Quente</option>
                                    <option>Morno</option>
                                    <option>Frio</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1IFZRabG_pNyoDmshFmQ-3YbTXyb0C-hfXaNLmKss4cU/edit#gid=0"
                                    target="_blank"
                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition-all shadow-sm"
                                >
                                    <MessageSquare size={14} /> ABRIR PLANILHA
                                </a>
                                <button onClick={exportToCSV} className="flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all shadow-sm">
                                    <Download size={14} /> EXPORTAR CSV
                                </button>
                                <button onClick={handleResetTable} className="flex items-center gap-2 bg-white text-red-600 border border-red-100 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-all shadow-sm">
                                    ZERAR LEADS
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] text-neutral-sage font-black uppercase tracking-widest">
                                        <th className="p-4">Herdeiro</th>
                                        <th className="p-4">Status / Temp</th>
                                        <th className="p-4">Nó Central</th>
                                        <th className="p-4">Papel</th>
                                        <th className="p-4">Interesse</th>
                                        <th className="p-4">Fase</th>
                                        <th className="p-4">Relato</th>
                                        <th className="p-4 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {loading ? (
                                        <tr><td colSpan="6" className="p-12 text-center text-neutral-sage italic text-sm">Escaneando pergaminhos...</td></tr>
                                    ) : filteredLeads.length === 0 ? (
                                        <tr><td colSpan="6" className="p-12 text-center text-neutral-sage text-sm">Nenhum herdeiro encontrado com esses filtros.</td></tr>
                                    ) : (
                                        filteredLeads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-serif text-primary font-bold group-hover:text-secondary transition-colors">{lead.name}</span>
                                                        <span className="text-[10px] text-neutral-sage font-medium">{lead.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border ${getStatusStyle(lead.status)}`}>
                                                            {lead.status || 'Novo'}
                                                        </span>
                                                        <span className={`text-[12px] ${lead.temperatura === 'Quente' ? 'text-red-500' : lead.temperatura === 'Frio' ? 'text-blue-500' : 'text-orange-500'}`}>
                                                            {lead.temperatura === 'Quente' ? '🔥' : lead.temperatura === 'Frio' ? '❄️' : '🟠'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-xs font-bold text-primary">
                                                        {lead.maior_dificuldade === '1' ? 'Linguagem Bíblica' :
                                                            lead.maior_dificuldade === '2' ? 'Aplicação Prática' :
                                                                lead.maior_dificuldade === '3' ? 'Fé Estagnada' :
                                                                    lead.maior_dificuldade === '4' ? 'Rotina de Oração' :
                                                                        lead.maior_dificuldade === '5' ? 'Propósito' : lead.maior_dificuldade || '-'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-xs font-bold text-primary">
                                                        {lead.perfil_aluno === 'aluno' ? 'Aluno' :
                                                            lead.perfil_aluno === 'lider' ? 'Líder' :
                                                                lead.perfil_aluno === 'empresario' ? 'Empresário' :
                                                                    lead.perfil_aluno === 'recomeco' ? 'Recomeço' :
                                                                        lead.perfil_aluno === 'oculto' ? 'Oculto' : lead.perfil_aluno || '-'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {lead.tags?.includes('interesse_prosperidade_sim') ? (
                                                        <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-secondary/10 text-secondary-dark border border-secondary/20">Sim</span>
                                                    ) : lead.tags?.includes('interesse_prosperidade_cautela') ? (
                                                        <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">Cautela</span>
                                                    ) : lead.tags?.includes('interesse_prosperidade_nao') ? (
                                                        <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200">Não</span>
                                                    ) : <span className="text-xs text-neutral-200">-</span>}
                                                </td>
                                                <td className="p-4 text-xs font-bold text-primary">
                                                    {lead.fase_vida?.replace('_', '–').replace('plus', '+') || '-'}
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-xs text-neutral-sage italic max-w-xs truncate" title={lead.expectativas}>
                                                        {lead.expectativas ? `"${lead.expectativas}"` : '-'}
                                                    </p>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center gap-2">
                                                        <a
                                                            href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors border border-transparent hover:border-green-100"
                                                            title="WhatsApp"
                                                        >
                                                            <MessageSquare size={16} />
                                                        </a>
                                                        <button
                                                            onClick={() => setSelectedLead(lead)}
                                                            className="p-2 hover:bg-neutral-100 text-primary rounded-lg transition-colors border border-transparent hover:border-neutral-200"
                                                            title="Ver Detalhes"
                                                        >
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
            )}
            </main>

            {selectedLead && (
                <LeadDetailModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                    onUpdate={fetchLeads}
                />
            )}
        </div>
    );
};

// Helper Components
const MetricCard = ({ icon, label, value, color, border }) => (
    <div className={`bg-white p-5 rounded-xl border ${border ? 'border-secondary/20 shadow-secondary/5' : 'border-neutral-200'} shadow-sm flex items-center gap-4`}>
        <div className={`w-12 h-12 rounded-lg bg-neutral-50 flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-sage">{label}</p>
            <p className="text-2xl font-serif text-primary font-bold leading-none mt-1">{value || 0}</p>
        </div>
    </div>
);

const InsightLine = ({ data }) => {
    const active = data.filter(d => d.count > 0);
    if (active.length === 0) return null;
    const top = [...active].sort((a, b) => b.count - a.count)[0];
    return (
        <div className="text-center px-4">
            <p className="text-[8px] text-neutral-500 font-medium leading-tight">
                💡 <span className="font-bold text-primary">Maior fatia:</span> {top.label}
            </p>
        </div>
    );
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Comprador': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Interessado': return 'bg-orange-50 text-orange-700 border-orange-200';
        case 'Qualificado': return 'bg-green-50 text-green-700 border-green-200';
        case 'Engajado': return 'bg-blue-50 text-blue-700 border-blue-200';
        default: return 'bg-neutral-50 text-neutral-500 border-neutral-200';
    }
};

const PieChart = ({ data, size = "w-48 h-48" }) => {
    // Calculamos o total de leads que possuem alguma das fatias (não o total absoluto de leads)
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }

    if (total === 0) return (
        <div className={`flex items-center justify-center ${size} mx-auto bg-neutral-50 rounded-full text-[8px] text-neutral-sage font-bold uppercase tracking-widest italic`}>
            Sem Dados
        </div>
    );

    return (
        <div className={`relative ${size} mx-auto`}>
            <svg viewBox="-1.2 -1.2 2.4 2.4" className="transform -rotate-90 w-full h-full">
                {data.map((item, index) => {
                    const percent = item.count / total;
                    if (percent === 0) return null;
                    if (percent === 1) return <circle key={index} cx="0" cy="0" r="1" fill={item.hexColor} />;

                    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                    cumulativePercent += percent;
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    const largeArcFlag = percent > 0.5 ? 1 : 0;
                    const pathData = [
                        `M ${startX} ${startY}`,
                        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                        `L 0 0`,
                    ].join(' ');

                    return <path key={index} d={pathData} fill={item.hexColor} className="hover:opacity-80 transition-opacity cursor-help" title={`${item.label}: ${item.count}`} />;
                })}
                <circle cx="0" cy="0" r="0.65" fill="white" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-serif font-bold text-primary leading-none">{total}</span>
            </div>
        </div>
    );
};

export default AdminDashboard;
