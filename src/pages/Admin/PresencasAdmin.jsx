import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LogOut, Users, Calendar, Send, Copy, Check, RefreshCw, ExternalLink } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FUNIL_LABELS = {
    top: 'Topo',
    meio: 'Meio',
    fundo: 'Fundo',
    cliente: 'Cliente',
};

export default function PresencasAdmin({ onNavigate }) {
    const [presencas, setPresencas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const [dataFiltro, setDataFiltro] = useState('');
    const [funilFiltro, setFunilFiltro] = useState('todos');
    const [linkCopiado, setLinkCopiado] = useState(false);
    const [disparando, setDisparando] = useState(false);
    const [disparoResult, setDisparoResult] = useState(null);
    const [linkResumo, setLinkResumo] = useState('');
    const [preview, setPreview] = useState(true);

    useEffect(() => {
        fetchDatas();
    }, []);

    useEffect(() => {
        if (dataFiltro) fetchPresencas();
    }, [dataFiltro, funilFiltro]);

    const fetchDatas = async () => {
        const { data } = await supabase
            .from('shiur_presenca')
            .select('shiur_data')
            .order('shiur_data', { ascending: false });

        if (data) {
            const unicas = [...new Set(data.map(r => r.shiur_data))];
            setDatas(unicas);
            if (unicas.length > 0) setDataFiltro(unicas[0]);
        }
        setLoading(false);
    };

    const fetchPresencas = async () => {
        setLoading(true);
        let query = supabase
            .from('shiur_presenca')
            .select('*')
            .eq('shiur_data', dataFiltro)
            .order('created_at', { ascending: false });

        if (funilFiltro !== 'todos') {
            query = query.eq('funil', funilFiltro);
        }

        const { data } = await query;
        setPresencas(data || []);
        setLoading(false);
    };

    const linkPresenca = dataFiltro
        ? `https://mapadoherdeiro.com.br/presenca?data=${dataFiltro}`
        : 'https://mapadoherdeiro.com.br/presenca';

    const copiarLink = () => {
        navigator.clipboard.writeText(linkPresenca);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    };

    const dispararResumo = async () => {
        setDisparando(true);
        setDisparoResult(null);
        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/send-shiur-resumo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'apikey': SUPABASE_ANON_KEY,
                },
                body: JSON.stringify({
                    shiur_data: dataFiltro,
                    preview,
                    ...(linkResumo ? { link_resumo: linkResumo } : {}),
                }),
            });
            const json = await res.json();
            setDisparoResult(json);
        } catch (e) {
            setDisparoResult({ erro: e.message });
        } finally {
            setDisparando(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        onNavigate('#/admin');
    };

    const naoEnviados = presencas.filter(p => !p.resumo_enviado).length;

    return (
        <div className="min-h-screen bg-[#F9F8F5] font-sans">
            <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-serif text-xl border border-secondary/20 shadow-sm">M</div>
                        <div>
                            <h1 className="text-lg font-serif text-primary font-bold">Presenças Shiur</h1>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">CRM Espiritual · Sala do Mapa</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => onNavigate('#/admin/dashboard')} className="text-xs text-neutral-400 hover:text-primary transition-colors">← Voltar ao Admin</button>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-neutral-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-wider">
                            <LogOut size={14} /> Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6 space-y-6">

                {/* Filtros */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Data do Shiur</label>
                        <select
                            value={dataFiltro}
                            onChange={e => setDataFiltro(e.target.value)}
                            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {datas.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Funil</label>
                        <select
                            value={funilFiltro}
                            onChange={e => setFunilFiltro(e.target.value)}
                            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="todos">Todos</option>
                            {Object.entries(FUNIL_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    </div>
                    <button onClick={fetchPresencas} className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-400 hover:text-primary transition-colors">
                        <RefreshCw size={13} /> Atualizar
                    </button>
                    <div className="ml-auto flex items-center gap-2 text-sm text-neutral-500">
                        <Users size={14} />
                        <span className="font-bold text-primary">{presencas.length}</span> presença(s)
                        {naoEnviados > 0 && <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">{naoEnviados} sem resumo</span>}
                    </div>
                </div>

                {/* Link parametrizado */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Link de Presença (parametrizado)</p>
                    <div className="flex items-center gap-3">
                        <code className="flex-1 text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-primary truncate">{linkPresenca}</code>
                        <button onClick={copiarLink} className="flex items-center gap-2 px-4 py-2 bg-primary text-secondary rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
                            {linkCopiado ? <><Check size={13} /> Copiado!</> : <><Copy size={13} /> Copiar</>}
                        </button>
                        <a href={linkPresenca} target="_blank" rel="noreferrer" className="p-2 border border-neutral-200 rounded-lg text-neutral-400 hover:text-primary transition-colors">
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>

                {/* Disparo de resumo */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Disparo de Resumo (WhatsApp via Z-API)</p>
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Link do PDF/Slides (opcional)</label>
                            <input
                                type="url"
                                placeholder="https://drive.google.com/..."
                                value={linkResumo}
                                onChange={e => setLinkResumo(e.target.value)}
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="preview"
                                checked={preview}
                                onChange={e => setPreview(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="preview" className="text-xs text-neutral-500">Preview (envia só pra Cláudia)</label>
                        </div>
                        <button
                            onClick={dispararResumo}
                            disabled={disparando || !dataFiltro}
                            className="flex items-center gap-2 px-5 py-2 bg-primary text-secondary rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {disparando ? <><RefreshCw size={13} className="animate-spin" /> Disparando...</> : <><Send size={13} /> Disparar Resumo</>}
                        </button>
                    </div>
                    {disparoResult && (
                        <div className={`text-xs rounded-lg px-4 py-3 ${disparoResult.erro ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            <pre className="whitespace-pre-wrap">{JSON.stringify(disparoResult, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* Tabela */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-neutral-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                            <Calendar size={13} /> Participantes — {dataFiltro || '—'}
                        </p>
                    </div>
                    {loading ? (
                        <div className="p-10 text-center text-sm text-neutral-400">Carregando...</div>
                    ) : presencas.length === 0 ? (
                        <div className="p-10 text-center text-sm text-neutral-400">Nenhuma presença registrada para esta data.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Nome</th>
                                        <th className="px-4 py-3 text-left">WhatsApp</th>
                                        <th className="px-4 py-3 text-left">Funil</th>
                                        <th className="px-4 py-3 text-left">Score</th>
                                        <th className="px-4 py-3 text-left">Produto</th>
                                        <th className="px-4 py-3 text-left">Resumo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {presencas.map(p => (
                                        <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-primary">{p.nome}</td>
                                            <td className="px-4 py-3 text-neutral-500">{p.whatsapp || '—'}</td>
                                            <td className="px-4 py-3">
                                                {p.funil ? (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                                                        {FUNIL_LABELS[p.funil] || p.funil}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-neutral-500">{p.score ?? '—'}</td>
                                            <td className="px-4 py-3 text-neutral-500 text-xs">{p.produto_sugerido || '—'}</td>
                                            <td className="px-4 py-3">
                                                {p.resumo_enviado
                                                    ? <span className="text-green-600 text-xs font-bold">✓ Enviado</span>
                                                    : <span className="text-amber-500 text-xs">Pendente</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
