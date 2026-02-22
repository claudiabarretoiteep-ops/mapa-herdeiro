import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-primary text-white relative overflow-hidden">
            {/* Decorative texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('/paper-texture.png')] mix-blend-overlay"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Photo Section */}
                    <div className="w-full md:w-1/3">
                        <div className="aspect-[3/4] bg-neutral-800 rounded-lg overflow-hidden border-4 border-secondary/50 shadow-2xl relative">
                            {/* Image Real */}
                            <img
                                src="/rabino_v2.png"
                                alt="Rabino Marcos Barreto"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-neutral-900 text-white/50 font-serif italic p-4 text-center">Salve a foto como "public/rabino_v2.png"</div>';
                                }}
                            />

                            {/* Name Tag */}
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                                <p className="font-serif text-xl text-white">Rabino Marcos Barreto</p>
                                <p className="text-xs text-secondary tracking-widest uppercase">Rabino e Mentor Espiritual</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-2/3 space-y-6">
                        <h2 className="text-3xl md:text-4xl text-secondary font-serif">Quem te guia nesta jornada?</h2>

                        <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                            <p>
                                <strong>Rabino Marcos Barreto</strong> é Professor, Teólogo (reconhecido pelo MEC), capelão, psicanalista e educador bíblico há mais de 20 anos, dedicado a ensinar as Escrituras com clareza e profundidade.
                            </p>

                            <p>
                                Sua missão é reconectar pessoas aos fundamentos da fé cristã, trazendo luz dos originais hebraicos e uma vida prática alinhada com o Eterno.
                            </p>

                            <p>
                                Criou o <strong>Mapa do Herdeiro</strong> para transformar “fé confusa” em direção — ajudando o aluno a governar mente, emoções e decisões sob princípios bíblicos.
                            </p>

                            <div className="bg-white/5 p-6 rounded border-l-2 border-secondary/30 my-6">
                                <h4 className="text-secondary font-serif mb-2">Promessa Ética</h4>
                                <p className="italic text-white/80 text-base">
                                    "Ensino com verdade e responsabilidade — sem manipulação emocional, sem pressão e sem 'gatilhos'; só clareza, maturidade e passos aplicáveis."
                                </p>
                            </div>

                            <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-white/90">
                                "Mais do que seguidores, eu quero formar herdeiros: gente que aprende a governar a própria história com maturidade."
                            </blockquote>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
