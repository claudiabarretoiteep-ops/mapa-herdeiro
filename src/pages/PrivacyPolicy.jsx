import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background-light">
            <Header />
            <main className="container mx-auto px-4 py-20 max-w-4xl">
                <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-sage/10">
                    <h1 className="text-4xl font-serif text-primary mb-8 border-b pb-4">Política de Privacidade — Mapa do Herdeiro</h1>
                    <p className="text-sm text-gray-500 mb-8 italic">Última atualização: 24/02/2026</p>

                    <section className="space-y-6 text-neutral-sage leading-relaxed">
                        <p>Esta Política explica como o <strong>Mapa do Herdeiro</strong> coleta e protege seus dados pessoais conforme a LGPD.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">1) Quem é o controlador</h2>
                        <p><strong>MARCOS ANTONIO BARRETO CHAGAS</strong>, CNPJ 37.703.034/0001-52, com contato em contato@mapadoherdeiro.com.br.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">2) Dados Coletados</h2>
                        <p>Coletamos dados fornecidos por você (nome, email, WhatsApp) e identificadores automáticos para melhorar sua experiência.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">3) Finalidade</h2>
                        <p>Seus dados são usados para entrega do produto, suporte e, mediante consentimento, comunicações sobre o ecossistema.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">4) Seus Direitos</h2>
                        <p>Conforme a LGPD, você tem direito ao acesso, correção, eliminação e revogação do consentimento a qualquer momento via nosso e-mail oficial.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">5) Segurança</h2>
                        <p>Adotamos medidas técnicas adequadas para proteger suas informações contra acessos não autorizados.</p>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
