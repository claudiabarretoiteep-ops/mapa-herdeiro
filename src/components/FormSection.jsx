import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const FormSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        lgpd: false
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        whatsapp: formData.whatsapp,
                        lgpd_consent: formData.lgpd,
                        source: 'landing_page'
                    }
                ]);

            if (error) throw error;

            // Enviar para Google Sheets (em background)
            const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
            if (webhookUrl) {
                fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        whatsapp: formData.whatsapp,
                        source: 'landing_page'
                    })
                }).catch(err => console.error('Erro Webhook Google:', err));
            }

            setStatus('success');
            console.log('Lead salvo com sucesso!');

            // Redirecionar para página de obrigado via Hash
            setTimeout(() => {
                window.location.hash = '#/obrigado';
            }, 1000);

        } catch (error) {
            console.error('Erro ao salvar:', error);
            setStatus('error');
            // MOSTRA O ERRO REAL NA TELA
            setErrorMessage(`Erro técnico: ${error.message || JSON.stringify(error)}`);
        }
    };

    if (status === 'success') {
        return (
            <section id="baixar" className="py-20 bg-neutral-parchment relative">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="bg-white p-12 rounded-lg shadow-xl border-t-4 border-secondary">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                        <h3 className="text-3xl font-serif text-primary mb-4">Presente Enviado!</h3>
                        <p className="text-lg text-neutral-sage mb-8">
                            Verifique sua caixa de entrada (e spam). O guia "Você Não Está Perdido. Está Desalinhado" já está a caminho.
                        </p>
                        <a href="https://l.instagram.com/?u=https%3A%2F%2Fbit.ly%2F496Zk_SaladoMapaGrupoSecreto%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1aV3l-cy1Y7XXdCp5WAQXt_TLjKPQ_P-ZvJEK8Smw0xa1IHzE00dIROGiEc_aem_2mC6U8UJROuFWz0q0cWkmQ&e=AT4XbQqkD-n2xvFMPgUX6aibMCNdkDu5ofID_fOLBfT28pWigFMa61EOee54cxblZaTjY5IrT6wncUQWeohtPiINqZzuKwJ5gb10kY-vvQ" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                            Entrar para a Sala do Mapa (WhatsApp)
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="baixar" className="py-20 bg-primary relative">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Lado Esquerdo - Info */}
                    <div className="md:w-1/2 bg-neutral-parchment p-10 flex flex-col justify-center border-r border-gray-100">
                        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-6">
                            Comece seu realinhamento agora.
                        </h3>
                        <p className="text-neutral-sage mb-8 leading-relaxed font-medium italic">
                            “Este não é um ebook gratuito. É um presente de honra para quem permaneceu aguardando.”
                        </p>
                        <ul className="space-y-4 text-sm text-primary/80">
                            <li className="flex gap-2">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                                <span>Download imediato em PDF</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                                <span>Acesso à Sala do Mapa</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                                <span>Conteúdos semanais exclusivos</span>
                            </li>
                        </ul>
                    </div>

                    {/* Lado Direito - Form */}
                    <div className="md:w-1/2 p-10 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status === 'error' && (
                                <div className="bg-red-50 text-red-600 p-4 rounded flex items-start gap-2 text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-bold text-neutral-sage uppercase tracking-wider mb-2">Nome Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Seu nome completo"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-sage uppercase tracking-wider mb-2">Melhor E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-sage uppercase tracking-wider mb-2">WhatsApp</label>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    required
                                    placeholder="(XX) 9XXXX-XXXX"
                                    className="input-field"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    name="lgpd"
                                    id="lgpd"
                                    required
                                    className="mt-1 w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                                    checked={formData.lgpd}
                                    onChange={handleChange}
                                />
                                <label htmlFor="lgpd" className="text-xs text-gray-500 leading-snug cursor-pointer">
                                    Concordo em receber o material e comunicações da Mapa do Herdeiro. Você pode cancelar a qualquer momento.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full btn-primary flex justify-center items-center gap-2 group disabled:opacity-70"
                            >
                                {status === 'loading' ? 'Enviando...' : 'QUERO RECEBER O EBOOK'}
                                {status !== 'loading' && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FormSection;
