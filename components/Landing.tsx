
import React from 'react';
import { TestConfig, TestType } from '../types';
import { UserAvatar } from './Icons';
import SeoContent from './SeoContent';

interface LandingProps {
  config: TestConfig;
  onStart: () => void;
  isLoading?: boolean;
}

const SEO_BLOCK_BY_TEST: Record<
  TestType,
  {
    summary: string;
    content: string[];
    faqs: Array<{ q: string; a: string }>;
  }
> = {
  personalidade: {
    summary: 'Descubra seu perfil de personalidade e veja como suas escolhas revelam padrões de comportamento e comunicação.',
    content: [
      'O Teste de Personalidade do Perfily ajuda você a identificar tendências do seu comportamento: como reage a desafios, toma decisões e se relaciona no dia a dia.',
      'Para que serve: aumentar o autoconhecimento, reconhecer padrões que afetam produtividade e relações e encontrar pontos práticos de melhoria sem complicação.',
      'Como funciona: você responde perguntas objetivas e o sistema organiza suas escolhas em um perfil principal, com interpretações claras e recomendações aplicáveis.',
      'Para quem é indicado: para quem quer entender melhor suas reações, melhorar a comunicação e tomar decisões com mais segurança em trabalho e vida pessoal.'
    ],
    faqs: [
      { q: 'Quanto tempo leva para concluir?', a: 'Em geral, poucos minutos. O teste é direto e feito para você responder sem “pensar demais”.' },
      { q: 'O resultado muda com o tempo?', a: 'Pode mudar. O perfil reflete o seu momento e suas escolhas; refazer depois pode mostrar novas tendências.' },
      { q: 'O que vem no relatório completo?', a: 'Pontos fortes, pontos de atenção, leitura do perfil e recomendações práticas para aplicar no dia a dia.' },
      { q: 'Isso substitui avaliação profissional?', a: 'Não. É uma ferramenta de autoconhecimento e direcionamento, não um diagnóstico clínico.' }
    ]
  },
  carreira: {
    summary: 'Entenda seu perfil profissional e receba direcionamentos práticos para evoluir, ganhar mais e se posicionar melhor.',
    content: [
      'O Teste de Carreira do Perfily mapeia seu estilo de trabalho, motivadores e o tipo de ambiente em que você tende a ter mais performance e reconhecimento.',
      'Para que serve: ajudar a escolher trilhas mais coerentes, identificar competências para fortalecer e enxergar caminhos reais para crescer na carreira.',
      'Como funciona: você responde perguntas rápidas e recebe um perfil com leitura objetiva do seu modo de agir no trabalho e recomendações de evolução.',
      'Para quem é indicado: para quem busca promoção, quer mudar de área, está em transição ou quer alinhar rotina, talento e resultados.'
    ],
    faqs: [
      { q: 'O teste escolhe uma profissão para mim?', a: 'Ele não aponta uma profissão única. Ele sugere trilhas e ambientes mais aderentes ao seu perfil.' },
      { q: 'Isso ajuda em promoção?', a: 'Sim. O relatório foca em direcionamentos e competências que aumentam performance e percepção de valor.' },
      { q: 'Serve para quem está perdido(a) na carreira?', a: 'Serve. Ele organiza prioridades e mostra pontos de desenvolvimento com ações claras.' },
      { q: 'O que eu recebo no relatório completo?', a: 'Leitura do seu perfil, pontos fortes, alertas e orientações práticas para acelerar sua evolução.' }
    ]
  },
  relacionamento: {
    summary: 'Descubra seu estilo de amar e entenda quais dinâmicas aumentam compatibilidade e reduzem conflitos no dia a dia.',
    content: [
      'O Teste de Relacionamento do Perfily revela seu estilo afetivo: como você demonstra amor, o que te dá segurança e quais padrões podem gerar atritos.',
      'Para que serve: melhorar a convivência, comunicar necessidades com mais clareza e fazer escolhas mais conscientes sobre compatibilidade e limites.',
      'Como funciona: você responde perguntas sobre preferências e comportamento e recebe um perfil com orientações práticas para fortalecer vínculos.',
      'Para quem é indicado: para solteiros(as) e casais que querem mais leveza, entendimento emocional e decisões melhores na vida a dois.'
    ],
    faqs: [
      { q: 'Esse teste é para solteiros ou casais?', a: 'Para os dois. Ele ajuda a entender seu estilo e a melhorar a dinâmica, independente do momento.' },
      { q: 'O resultado define “alma gêmea”?', a: 'Não é previsão. Ele indica compatibilidades e pontos de atenção para você se relacionar melhor.' },
      { q: 'O relatório traz dicas práticas?', a: 'Sim. Você recebe orientações de comunicação, limites e hábitos que fortalecem a relação.' },
      { q: 'Quanto tempo leva?', a: 'Poucos minutos. As perguntas são objetivas e fáceis de responder.' }
    ]
  },
  qi: {
    summary: 'Descubra seu estilo cognitivo e veja estratégias para aprender melhor e ter mais performance em estudos e trabalho.',
    content: [
      'O Teste de QI Cognitivo do Perfily avalia seu estilo de raciocínio: como você aprende, reconhece padrões e resolve problemas sob pressão.',
      'Para que serve: entender seus pontos fortes mentais e aplicar estratégias de estudo e execução mais eficientes no dia a dia.',
      'Como funciona: você responde desafios objetivos e recebe um perfil com leitura do seu estilo cognitivo e recomendações práticas de melhoria.',
      'Para quem é indicado: para quem quer estudar com mais eficiência, melhorar foco e memória e usar o próprio estilo mental para gerar mais resultado.'
    ],
    faqs: [
      { q: 'Vou receber um número de QI?', a: 'O foco é mapear seu estilo cognitivo e pontos fortes de raciocínio, não emitir um laudo clínico.' },
      { q: 'Isso ajuda a estudar melhor?', a: 'Sim. O relatório sugere estratégias compatíveis com seu estilo para melhorar retenção e desempenho.' },
      { q: 'O teste é difícil?', a: 'Ele é objetivo e progressivo. A ideia é entender seu padrão, não “pegar você” em erro.' },
      { q: 'O que vem no relatório completo?', a: 'Leitura do estilo cognitivo, pontos fortes, pontos de atenção e recomendações práticas para evolução.' }
    ]
  }
};

const Landing: React.FC<LandingProps> = ({ config, onStart, isLoading = false }) => {
  const seoBlock = SEO_BLOCK_BY_TEST[config.slug] ?? SEO_BLOCK_BY_TEST.personalidade;

  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-in">
      <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 bg-${config.color}-50 text-${config.color}-700 rounded-full text-sm font-semibold border border-${config.color}-100`}>
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${config.color}-400 opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${config.color}-500`}></span>
        </span>
        {config.title}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
        {config.slug === 'personalidade' && <>Descubra sua <span className="text-indigo-600 underline decoration-indigo-200">verdadeira essência</span></>}
        {config.slug === 'carreira' && <>Destrave sua <span className="text-emerald-600 underline decoration-emerald-200">evolução profissional</span></>}
        {config.slug === 'relacionamento' && <>Encontre o <span className="text-rose-600 underline decoration-rose-200">seu match ideal</span></>}
        {config.slug === 'qi' && <>Avalie seu <span className="text-amber-600 underline decoration-amber-200">raciocínio lógico</span></>}
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
        {config.description} Receba um relatório completo e acionável em menos de 2 minutos.
      </p>

      <button
        onClick={onStart}
        disabled={isLoading}
        className={`w-full sm:w-auto bg-${config.color}-600 hover:bg-${config.color}-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-${config.color}-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]`}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          "Começar mapeamento"
        )}
      </button>

      <div className="w-full max-w-2xl mb-8">
        <SeoContent title="Sobre este teste" summary={seoBlock.summary} content={seoBlock.content} faqs={seoBlock.faqs} />
      </div>

      <div className="flex flex-col items-center gap-4 opacity-75">
        <div className="flex -space-x-3 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <UserAvatar key={i} index={i} />
          ))}
        </div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
          +12.000 diagnósticos realizados este mês
        </p>
      </div>
    </div>
  );
};

export default Landing;
