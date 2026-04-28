import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfUse = () => {
    return (
        <div className="min-h-screen bg-background-light">
            <Header />
            <main className="container mx-auto px-4 py-20 max-w-4xl">
                <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-sage/10">
                    <h1 className="text-4xl font-serif text-primary mb-8 border-b pb-4">Termos de Uso — Mapa do Herdeiro</h1>
                    <p className="text-sm text-gray-500 mb-8 italic">Última atualização: 24/02/2026</p>

                    <section className="space-y-6 text-neutral-sage leading-relaxed">
                        <p>Bem-vindo(a) ao <strong>Mapa do Herdeiro</strong> (“Plataforma”). Ao acessar ou usar este site, páginas, área de membros, materiais, aplicativos, conteúdos, produtos e serviços vinculados ao domínio <strong>mapadoherdeiro.com.br</strong>, você concorda com estes <strong>Termos de Uso</strong>.</p>
                        <p>Se você não concordar, não utilize a Plataforma.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">1) Quem somos</h2>
                        <p>A Plataforma é operada por <strong>MARCOS ANTONIO BARRETO CHAGAS</strong>, inscrito no <strong>CNPJ 37.703.034/0001-52</strong>, com endereço em Rua Jose Marciano Queiroz, s/n, Matinha, Pará de Minas/MG, CEP 35.661-636 (“Nós”, “Mapa do Herdeiro”).</p>
                        <p><strong>Contato oficial:</strong><br />
                            E-mail: contato@mapadoherdeiro.com.br<br />
                            Telefone/WhatsApp: +55 37 99149-4464</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">2) Para quem é a Plataforma</h2>
                        <p>A Plataforma é destinada a pessoas com <strong>18 anos ou mais</strong>, ou menores devidamente representados/assistidos por responsável legal, quando aplicável.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">3) O que oferecemos</h2>
                        <p>O Mapa do Herdeiro oferece conteúdos digitais, acesso a área de membros, comunidades e materiais de apoio voltados ao realinhamento espiritual e raízes hebraicas.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">4) Regras de uso</h2>
                        <p>Você se compromete a usar a plataforma de forma legal, ética e conforme as normas de propriedade intelectual.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">5) Propriedade Intelectual</h2>
                        <p>Todo o conteúdo (marca, textos, vídeos, métodos) é protegido por direitos autorais. O acesso é para uso pessoal e intransferível.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">6) Cancelamento e Reembolso</h2>
                        <p>Respeitamos o CDC: o direito de arrependimento pode ser exercido em até 7 dias corridos após a compra via contato oficial.</p>

                        <h2 className="text-2xl font-serif text-primary mt-12 mb-4">7) Lei e Foro</h2>
                        <p>Estes termos são regidos pelas leis brasileiras, sendo eleito o foro de Pará de Minas/MG.</p>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfUse;
