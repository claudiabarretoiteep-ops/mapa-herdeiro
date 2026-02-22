import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Qualificacao from './pages/Qualificacao';

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
            setCurrentPath(window.location.hash || '#/');
            window.scrollTo(0, 0);
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
            } else if (!session && path === '#/admin/dashboard') {
                window.location.hash = '#/admin';
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            // Redirecionamento no login/logout
            const path = window.location.hash || '#/';
            if (session && path === '#/admin') {
                window.location.hash = '#/admin/dashboard';
            } else if (!session && path === '#/admin/dashboard') {
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

        switch (currentPath) {
            case '#/diagnostico':
            case '#/pesquisa':
                return <Qualificacao onBack={() => navigate('#/')} />;
            case '#/obrigado':
                return <ThankYou />;
            case '#/admin':
                return <AdminLogin onNavigate={navigate} />;
            case '#/admin/dashboard':
                return <AdminDashboard onNavigate={navigate} />;
            default:
                return <LandingPage onNavigate={navigate} />;
        }
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-white">
                {renderContent()}
            </div>
        </ErrorBoundary>
    );
}

export default App;
