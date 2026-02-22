import React from 'react';
import { Search, BookOpen, Sprout, Scale, CheckCircle2 } from 'lucide-react';

const Features = () => {
    return (
        <section id="sobre" className="py-20 bg-white">
            <div className="container mx-auto px-4">

                {/* Parte 1: Por que este material? */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl mb-6 text-primary">Você é herdeiro. Mas vive como órfão?</h2>
                    <p className="text-lg text-neutral-sage">
                        Muitos buscam, mas poucos encontram o alinhamento real. Identifique se você está vivendo abaixo do que foi desenhado para você.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    <FeatureCard
                        icon={<Search className="w-8 h-8 text-secondary" />}
                        title="Sente falta de algo"
                        description="Você ama a D'us, mas sente que poderia estar vivendo uma realidade espiritual mais profunda."
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-8 h-8 text-secondary" />}
                        title="Estudo sem encaixe"
                        description="Lê a Bíblia há anos, mas parece que as peças do quebra-cabeça ainda não se uniram totalmente."
                    />
                    <FeatureCard
                        icon={<Sprout className="w-8 h-8 text-secondary" />}
                        title="Raízes Hebraicas"
                        description="Quer entender sua identidade original de herdeiro através da perspectiva judaica de Jesus."
                    />
                    <FeatureCard
                        icon={<Scale className="w-8 h-8 text-secondary" />}
                        title="Alinhamento Total"
                        description="Busca coerência entre sua vida espiritual, emocional e sua realidade financeira."
                    />
                </div>

                {/* Parte 2: O que você vai descobrir */}
                <div className="bg-neutral-parchment rounded-lg p-8 md:p-12 shadow-inner border border-secondary/20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl mb-6 text-primary">Neste presente, você vai descobrir:</h3>
                            <ul className="space-y-4">
                                <CheckItem text="Os 7 sinais de desalinhamento (e como identificar cada um)" />
                                <CheckItem text="O conceito de herança na perspectiva hebraica original" />
                                <CheckItem text="Primeiros passos práticos para o realinhamento imediato" />
                                <CheckItem text="Como as raízes hebraicas mudam sua leitura da Bíblia" />
                                <CheckItem text="Acesso exclusivo à Sala do Mapa (comunidade no WhatsApp)" />
                            </ul>
                        </div>

                        {/* Visual placeholder for inside the book */}
                        <div className="hidden md:block relative h-64 bg-white rounded shadow-md border-l-4 border-secondary p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="h-full flex flex-col justify-center items-center text-center opacity-50">
                                <BookOpen className="w-16 h-16 text-primary mb-4" />
                                <span className="font-serif italic">Preview do Conteúdo</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 bg-neutral-offwhite rounded border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition-all group">
        <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h4 className="text-xl font-serif font-bold text-primary mb-3">{title}</h4>
        <p className="text-sm text-neutral-sage leading-relaxed">{description}</p>
    </div>
);

const CheckItem = ({ text }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <span className="text-primary/80">{text}</span>
    </li>
);

export default Features;
