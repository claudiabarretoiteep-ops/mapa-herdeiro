import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Download, LogOut, Users, Target, ShoppingBag, Flame, Filter, ChevronRight, MessageSquare } from 'lucide-react';
import LeadDetailModal from '../../components/Admin/LeadDetailModal';

const AdminDashboard = ({ onNavigate }) => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [filterTemp, setFilterTemp] = useState('Todos');
    const [selectedLead, setSelectedLead] = useState(null);

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        if (onNavigate) onNavigate('#/admin');
    };

    const stats = {
        total: leads.length,
        compradores: leads.filter(l => l.status === 'Comprador').length,
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
        { label: 'Entender Bíblia', count: leads.filter(l => l.tags?.includes('dor_linguagem_biblica')).length, color: 'bg-indigo-500', hexColor: '#6366f1' },
        { label: 'Aplicar Ensino', count: leads.filter(l => l.tags?.includes('dor_aplicacao_pratica')).length, color: 'bg-emerald-500', hexColor: '#10b981' },
        { label: 'Fé Estagnada', count: leads.filter(l => l.tags?.includes('dor_fe_estagnada')).length, color: 'bg-amber-500', hexColor: '#f59e0b' },
        { label: 'Rotina Oração', count: leads.filter(l => l.tags?.includes('dor_rotina_oracao_estudo')).length, color: 'bg-red-400', hexColor: '#f87171' },
        { label: 'Propósito', count: leads.filter(l => l.tags?.includes('dor_proposito')).length, color: 'bg-purple-500', hexColor: '#a855f7' }
    ];

    const prosperidadeData = [
        { label: 'Sim', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_sim')).length, color: 'bg-green-600', hexColor: '#16a34a' },
        { label: 'Cautela', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_cautela')).length, color: 'bg-orange-400', hexColor: '#fb923c' },
        { label: 'Não', count: leads.filter(l => l.tags?.includes('interesse_prosperidade_nao')).length, color: 'bg-gray-400', hexColor: '#9ca3af' }
    ];

    const perfilV2Data = [
        { label: 'Aluno', count: leads.filter(l => l.tags?.includes('perfil_aluno')).length, color: 'bg-blue-500', hexColor: '#3b82f6' },
        { label: 'Líder', count: leads.filter(l => l.tags?.includes('perfil_lider')).length, color: 'bg-indigo-600', hexColor: '#4f46e5' },
        { label: 'Empresário', count: leads.filter(l => l.tags?.includes('perfil_empresario')).length, color: 'bg-secondary', hexColor: '#D4AF37' },
        { label: 'Recomeço', count: leads.filter(l => l.tags?.includes('perfil_recomeco')).length, color: 'bg-teal-500', hexColor: '#14b8a6' }
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
        const headers = ['Data', 'Nome', 'Email', 'WhatsApp', 'Status', 'Temperatura', 'Perfil', 'Liderança', 'Dificuldade', 'Expectativas'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                new Date(lead.created_at).toLocaleString('pt-BR'),
                `"${lead.name}"`,
                lead.email,
                lead.whatsapp,
                lead.status,
                lead.temperatura,
                `"${lead.perfil_aluno === '1' ? 'Iniciante' : lead.perfil_aluno === '2' ? 'Líder' : lead.perfil_aluno === '3' ? 'Desalinhado' : lead.perfil_aluno === '4' ? 'Investidor' : lead.perfil_aluno || ''}"`,
                `"${lead.perfil_lideranca || ''}"`,
                `"${(lead.maior_dificuldade || '').replace(/"/g, '""')}"`,
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
            <header className="bg-white border-b border-neutral-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-serif text-xl border border-secondary/20 shadow-sm">M</div>
                        <div>
                            <h1 className="text-lg font-serif text-primary font-bold">Mapa do Herdeiro</h1>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-sage font-bold">Painel de Controle (V2 - Atualizado)</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-neutral-sage hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-wider">
                        <LogOut size={14} /> Sair
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard icon={<Users size={20} />} label="Total Leads" value={stats.total} color="text-primary" />
                    <MetricCard icon={<Flame size={20} />} label="Leads Quentes" value={stats.quentes} color="text-red-500" />
                    <MetricCard icon={<Target size={20} />} label="Qualificados" value={stats.qualificados} color="text-green-600" />
                    <MetricCard icon={<ShoppingBag size={20} />} label="Compradores" value={stats.compradores} color="text-secondary" border />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Section Expanded */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-neutral-100 pb-2 flex items-center gap-2">
                                <Target size={16} /> BI - Inteligência Herdeiro (V2.1)
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
                                        <th className="p-4">Lead</th>
                                        <th className="p-4">Status & Temp</th>
                                        <th className="p-4">Posicionamento</th>
                                        <th className="p-4">Liderança</th>
                                        <th className="p-4">Dificuldade</th>
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
                                                        {lead.perfil_aluno === '1' ? 'Iniciante' :
                                                            lead.perfil_aluno === '2' ? 'Líder' :
                                                                lead.perfil_aluno === '3' ? 'Desalinhado' :
                                                                    lead.perfil_aluno === '4' ? 'Investidor' : lead.perfil_aluno || '-'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-xs text-neutral-sage font-bold uppercase">{lead.perfil_lideranca || '-'}</span>
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-xs text-neutral-sage italic max-w-xs truncate" title={lead.maior_dificuldade}>
                                                        {lead.maior_dificuldade ? `"${lead.maior_dificuldade}"` : '-'}
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
