import React, { useState, useEffect, Suspense, lazy } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';

// Lazy loading das páginas secundárias para reduzir bundle inicial
const ThankYou = lazy(() => import('./pages/ThankYou'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminEixos = lazy(() => import('./pages/Admin/AdminEixos'));
const Qualificacao = lazy(() => import('./pages/Qualificacao'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Reader = lazy(() => import('./pages/Reader'));
const EixoSales = lazy(() => import('./pages/EixoSales'));
const RevelacaoSales = lazy(() => import('./pages/RevelacaoSales'));
const SistemaEixosSales = lazy(() => import('./pages/SistemaEixosSales'));
import EixoPlayer from './pages/EixoPlayer';
import eixoData from './data/eixo.json';

// Componente de Erro Global para Segurança Máxima
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'serif', color: '#1B3B5F', backgroundColor: '#FDFCF7', minHeight: '100vh' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Ocorreu um desalinhamento técnico.</h2>
                    <pre style={{ fontSize: '12px', color: 'red' }}>{this.state.error?.toString()}</pre>
                    <button
                        onClick={() => {
                            window.location.hash = '#/';
                            window.location.reload();
                        }}
                        style={{ padding: '12px 24px', backgroundColor: '#1B3B5F', color: '#D4AF37', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        RECOMEÇAR
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
    const [session, setSession] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash || '#/';
            const oldPath = currentPath;
            setCurrentPath(newHash);

            // Só sobe para o topo se mudar de "página" (ex: #/ -> #/diagnostico)
            // Se for apenas um âncora interna (ex: #baixar), deixa o navegador rolar naturalmente
            const isInternalAnchor = newHash.startsWith('#') && !newHash.includes('/');
            if (newHash !== oldPath && !isInternalAnchor) {
                window.scrollTo(0, 0);
            }
        };
        window.addEventListener('hashchange', handleHashChange);

        // Session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setAuthLoading(false);

            // Redirecionamento Automático Seguro (Proteção de Rota)
            const path = window.location.hash || '#/';
            if (session && path === '#/admin') {
                window.location.hash = '#/admin/dashboard';
            } else if (!session && (path === '#/admin/dashboard' || path === '#/admin/eixos')) {
                window.location.hash = '#/admin';
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            // Redirecionamento no login/logout
            const path = window.location.hash || '#/';
            if (session && path === '#/admin') {
                window.location.hash = '#/admin/dashboard';
            } else if (!session && (path === '#/admin/dashboard' || path === '#/admin/eixos')) {
                window.location.hash = '#/admin';
            }
        });

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            subscription.unsubscribe();
        };
    }, [session]); // Adicionei session como dep para refletir mudanças

    const navigate = (path) => {
        window.location.hash = path;
    };

    const renderContent = () => {
        if (authLoading && currentPath.startsWith('#/admin')) {
            return <div className="min-h-screen flex items-center justify-center text-primary font-serif italic">Preparando acesso...</div>;
        }

        // Lógica de Lacre do Diagnóstico (Troque para FALSE para liberar o acesso)
        const isDiagnosticoLocked = false;

        const [basePath] = currentPath.split('?');

        switch (basePath) {
            case '#/diagnostico':
            case '#/pesquisa':
                return isDiagnosticoLocked ?
                    <ComingSoon /> :
                    <Qualificacao onBack={() => navigate('#/')} />;
            case '#/obrigado':
                return <ThankYou />;
            case '#/admin':
                return <AdminLogin onNavigate={navigate} />;
            case '#/admin/dashboard':
                return session ? <AdminDashboard onNavigate={navigate} /> : <AdminLogin onNavigate={navigate} />;
            case '#/admin/eixos':
                return session ? <AdminEixos onNavigate={navigate} /> : <AdminLogin onNavigate={navigate} />;
            case '#/revelacao':
            case '#/revelacao-do-herdeiro':
                return <RevelacaoSales onNavigate={navigate} />;
            case '#/sistema':
            case '#/sistema-eixos':
            case '#/eixos-completo':
                return <SistemaEixosSales onNavigate={navigate} />;
            case '#/ler-online':
            case '#/leitura':
                return <Reader onNavigate={navigate} />;
            case '#/termos':
                return <TermsOfUse />;
            default:
                // Suporte para rotas dinâmicas como #/eixo/slug
                const eixoMatch = currentPath.match(/#\/eixo\/([^/?]+)/);
                if (eixoMatch) {
                    const slug = eixoMatch[1];
                    return <EixoPlayer slug={slug} onNavigate={navigate} />;
                }

                // Suporte para páginas de vendas dinâmicas #/eixo-X ou #/comprar-eixo-X
                const salesMatch = basePath.match(/#\/(?:comprar-)?eixo-(\d+)/);
                if (salesMatch) {
                    const eixoId = parseInt(salesMatch[1]);
                    return <EixoSales eixoId={eixoId} onNavigate={navigate} />;
                }
                // Se acessar apenas #/eixo, redireciona para o áudio mais recente
                if (currentPath === '#/eixo' || currentPath === '#/eixo/') {
                    const latestSession = eixoData.sessions[eixoData.sessions.length - 1];
                    if (latestSession) {
                        return <EixoPlayer slug={latestSession.slug} onNavigate={navigate} />;
                    }
                }
                return <LandingPage onNavigate={navigate} />;
        }
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-white">
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-serif italic">Carregando...</div>}>
                    {renderContent()}
                </Suspense>
            </div>
        </ErrorBoundary>
    );
}

export default App;
