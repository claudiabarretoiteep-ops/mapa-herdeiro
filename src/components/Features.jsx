import { Search, Headphones, Sprout, Settings2, CheckCircle2, BookOpen } from 'lucide-react';
import innerVisual from '../assets/saladomapa_lp2-COIddP1G-DRyFnT4h.webp';

const Features = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">

                {/* Parte 1: Por que este material? */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl mb-6 text-primary">Uma Experiência de Sabedoria Digital</h2>
                    <p className="text-lg text-neutral-sage">
                        Muito mais que um livro digital, você está acessando um portal de realinhamento projetado para sua jornada de herdeiro.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    <FeatureCard
                        icon={<BookOpen className="w-8 h-8 text-secondary" />}
                        title="Leitura Premium"
                        description="Acesse o conteúdo em um leitor digital estilo Kindle, otimizado para qualquer tela."
                    />
                    <FeatureCard
                        icon={<Settings2 className="w-8 h-8 text-secondary" />}
                        title="Conforto Visual"
                        description="Ajuste o tamanho da letra e escolha temas (Claro, Sépia ou Noite) para sua leitura."
                    />
                    <FeatureCard
                        icon={<Headphones className="w-8 h-8 text-secondary" />}
                        title="Leitura Imersiva"
                        description="Ouça o conteúdo completo do livro enquanto lê, potencializando o aprendizado."
                    />
                    <FeatureCard
                        icon={<Sprout className="w-8 h-8 text-secondary" />}
                        title="Eixo de Alinhamento"
                        description="Reflexões guiadas em áudio pelo Rabino exclusivas para cada etapa da jornada."
                    />
                </div>

                {/* Parte 2: O que você vai descobrir */}
                <div className="bg-neutral-parchment rounded-lg p-6 md:p-10 shadow-inner border border-secondary/20 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl md:text-[1.75rem] mb-6 text-primary leading-tight">Nesta experiência, você vai descobrir:</h3>
                            <ul className="space-y-3">
                                <CheckItem text="Os 7 sinais de desalinhamento (e como identificar cada um)" />
                                <CheckItem text="O conceito de herança na perspectiva hebraica original" />
                                <CheckItem text="Primeiros passos práticos para o realinhamento imediato" />
                                <CheckItem text="Como as raízes hebraicas mudam sua leitura da Bíblia" />
                                <CheckItem text="Acesso prioritário à abertura da Sala do Mapa | Turma Fundadora." />
                            </ul>
                        </div>

                        {/* Visual Horizontal do Ebook */}
                        <div className="hidden md:flex justify-center items-center">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-secondary/20">
                                <img
                                    src={innerVisual}
                                    alt="Visualização das páginas internas do Leitor Digital"
                                    width="800"
                                    height="450"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                                />
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
