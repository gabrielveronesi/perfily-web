
import React, { useEffect, useState } from 'react';
import { TEST_CONFIGS } from '../data';
import SeoContent from './SeoContent';

interface HomeProps {
  onSelect: (path: string) => void;
  isLoading?: boolean;
}

const Home: React.FC<HomeProps> = ({ onSelect, isLoading = false }) => {
  const [startingSlug, setStartingSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) setStartingSlug(null);
  }, [isLoading]);

  return (
    <div className="py-12 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Bem-vindo ao <span className="text-indigo-600">Perfily</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
          Mapeie quem você é, sua carreira e seus relacionamentos com diagnósticos de alta precisão.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(TEST_CONFIGS).map((test) => {
          const isStartingThis = isLoading && startingSlug === test.slug;

          return (
          <button
            key={test.slug}
            // Passa o caminho limpo. O router decide se vira /slug ou #/slug
            onClick={() => {
              setStartingSlug(test.slug);
              onSelect(`/${test.slug}`);
            }}
            disabled={isLoading}
            className={`group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-${test.color}-300 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden flex flex-col h-full disabled:opacity-70 disabled:cursor-wait`}
          >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-${test.color}-50 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-500 opacity-60`}></div>
            
            <div className="relative z-10 flex-1">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {test.icon}
              </div>
              <h2 className={`text-2xl font-black text-${test.color}-600 mb-3 group-hover:text-${test.color}-700 transition-colors`}>
                {test.title}
              </h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                {test.description}
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className={`inline-flex items-center gap-3 font-extrabold text-xs uppercase tracking-[0.15em] text-${test.color}-600 bg-${test.color}-50 px-6 py-3 rounded-2xl group-hover:bg-${test.color}-600 group-hover:text-white transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start`}>
                {isStartingThis ? 'Iniciando...' : (test.ctaLabel || 'Mapear agora')}
                {!isStartingThis && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
                {isStartingThis && (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2"></div>
                )}
              </div>
            </div>
          </button>
          );
        })}
      </div>

      <div className="mt-10">
        <SeoContent
          title="Sobre este teste"
          summary="Entenda como funcionam os testes do Perfily e o que você recebe no relatório completo."
          content={[
            'O Perfily reúne testes online de personalidade, carreira, relacionamento e estilo cognitivo para ajudar você a entender padrões de comportamento e tomar decisões com mais clareza.',
            'Para que serve: ganhar autoconhecimento, identificar pontos fortes e pontos de atenção, e transformar isso em ações práticas para o dia a dia.',
            'Como funciona: você responde perguntas objetivas e recebe um preview imediato. Ao desbloquear, você acessa o relatório completo com interpretações e recomendações.',
            'Para quem é indicado: para quem quer se conhecer melhor, evoluir na vida profissional, melhorar a comunicação nos relacionamentos e estudar de forma mais eficiente.'
          ]}
          faqs={[
            { q: 'Quanto tempo leva?', a: 'Os testes são rápidos e feitos para serem concluídos em poucos minutos, com resultado gerado logo em seguida.' },
            { q: 'Preciso fazer todos os testes?', a: 'Não. Você pode começar pelo tema que faz mais sentido agora e fazer os outros quando quiser.' },
            { q: 'O resultado é imediato?', a: 'Você vê um preview na hora. O relatório completo fica disponível após o desbloqueio.' },
            { q: 'Posso refazer o teste?', a: 'Sim. Você pode refazer quando quiser para comparar resultados e acompanhar sua evolução.' }
          ]}
        />
      </div>
      
      <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 3.45L19.15 19H4.85L12 5.45z"/>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold">Perfily Insights</h3>
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            Nossa tecnologia conecta seus resultados para identificar padrões invisíveis, transformando dados isolados em uma estratégia de vida integrada e de alto impacto.
          </p>
          <div className="inline-block px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-300 backdrop-blur-sm">
            Inteligência Comportamental
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
